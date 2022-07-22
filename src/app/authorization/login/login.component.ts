import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  forgetPasswordForm: any;
  otpForm: any;
  submitted: boolean = false;
  emailPattern: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  fgSubmitted: boolean = false;
  otpCode: number = 0;
  otpSubmitted: boolean = false;
  showModel: string = '';
  fieldTextType: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private router: Router,
    private adminService: AdminService,
    private message: MessagingService
  ) { }

  ngOnInit(): void {
    this.createLoginForm()
    this.initForgetForm();
    this.initOtpForm();
  }

  initOtpForm(){
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.required]]
    })
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

  }
  get userForm() { return this.loginForm.controls; }
  get forgetFc() { return this.forgetPasswordForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      setTimeout(() => {
        this.submitted = false;
      }, 10000);
      return;
    }
    const payload = { ...this.loginForm.value };

    this.http.postData(Api.login, payload).subscribe(response => {
      if (response && response.status == 200) {
        if(response.success){
          this.adminService.userSession(response.data)
          // Create service
          let dashboardPath = this.adminService.getDashboardPath();
          this.router.navigate([dashboardPath]);
        }
        else{
          this.message.toast('error', response.message);
        }
      }
    })
  }

  initForgetForm(){
    this.showModel = 'email';
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]]
    });
  }

  onSubmitForget(event: any){
    event.stopPropagation();
    this.fgSubmitted = true;
    if(this.forgetPasswordForm.invalid){
      setTimeout(() => {
        this.fgSubmitted = false;
      }, 10000);
      return
    }
    this.http.postData(`${Api.forgotPassword}?email=${this.forgetPasswordForm.value.email}`, {}).subscribe(response => {
      if (response && response.status == 200) {
        if(response.success && response.data){
          this.otpCode = response.data;
          this.message.toast('success', response.message);
          this.closeForgotForm();
          this.showModel = 'otp';
        }
        else{
          this.message.toast('error', response.message);
        }
      }
    })
  }

  closeForgotForm(){
    this.showModel = '';
  }

  onSubmitOtp(event: any){
    event.stopPropagation();
    this.otpSubmitted = true;
    if(this.otpForm.invalid){
      setTimeout(() => {
        this.fgSubmitted = false;
      }, 10000);
      return
    }
    let userOtp = parseInt(this.otpForm.value.otp);
    if(this.otpCode === userOtp){
      let code = this.makeid(10);
      this.adminService.setLocalData('resetCode', code, true);
      this.message.toast('success', 'Reset your Password');
      // redirect Here
      this.router.navigate(['/reset-password'],
      {
        queryParams: {
          code: code,
          email: this.forgetPasswordForm.value.email
        }
      });
    }
    else{
      this.message.toast('error', "The OTP entered is incorrect.");
    }
  }

  makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
