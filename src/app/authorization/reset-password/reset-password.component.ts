import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';
import { MessagingService } from 'src/app/services/messaging.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: any;
  emailPattern: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  submitted: boolean = false;
  passwordNotMatched: boolean = false;
  fieldTextType1: boolean = false;
  fieldTextType2: boolean = false;
  email: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private router: Router,
    private admin: AdminService,
    private message: MessagingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let resetCode = this.admin.getLocalData('resetCode', true);
    if(resetCode){
      this.route.queryParams.subscribe((params: any) => {
        if (params.code && (params.code === resetCode)) {
          this.email = params.email;
          this.initForm();
        }
        else{
          this.redirectToLogin();
        }
      });
    }
    else{
      this.redirectToLogin();
    }
  }

  get fc() { return this.resetForm.controls; }

  initForm() {
    this.resetForm = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });

  }

  onSubmit(){
    this.submitted = true;
    if(this.resetForm.invalid){
      return
    }
    if(this.resetForm.value.password !== this.resetForm.value.confirmPassword){
      this.passwordNotMatched = true;
      return
    }

    let payload = {
      email: this.resetForm.value.email,
      password: this.resetForm.value.password
    }
    this.http.postData(Api.resetPassword, payload).subscribe(response => {
      if (response && response.status == 200) {
        if(response.success){
          this.message.toast('success', response.message);
          localStorage.removeItem('resetCode');
          this.redirectToLogin();
        }
        else{
          this.message.toast('error', response.message);
        }
      }
    })
  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

}
