import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-add-edit-plan',
  templateUrl: './add-edit-plan.component.html',
  styleUrls: ['./add-edit-plan.component.css']
})
export class AddEditPlanComponent implements OnInit {
  planForm: any;
  isSubmited:boolean = false;
  planDetails:any;
  constructor(
    private formBuilder: FormBuilder,
    private message: MessagingService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.getPlanDetails(params.id);
      }
    });
    this.initPlanForm();
  }

  getPlanDetails(id: string){
    this.http.getData(Api.superAdmin.plans.getDetail + `?planId=${id}`, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.planDetails = response.data;
        this.planForm.patchValue({
          planName: this.planDetails.planName,
          planAmount: this.planDetails.planAmount,
          description: this.planDetails.description,
          sitesLimit: this.planDetails.sitesLimit,
          userLimit: this.planDetails.userLimit,
        })
      }
    })
  }

  initPlanForm(){
    this.planForm = this.formBuilder.group({
      planName: ['', Validators.required],
      planAmount: ['', Validators.required],
      description: ['', Validators.required],
      sitesLimit: ['', Validators.required],
      userLimit: ['', Validators.required]
    });
  }

  get fc() { return this.planForm.controls; }

  onSubmit(){
    this.isSubmited = true;
    if(this.planForm.invalid){
      setTimeout(() => {
        this.isSubmited = false;
      }, 10000);
      return
    }

    if(this.planDetails){
      let payload = {
        planName: this.planForm.value.planName,
        planAmount: Number(this.planForm.value.planAmount),
        description: this.planForm.value.description,
        sitesLimit: Number(this.planForm.value.sitesLimit),
        userLimit: Number(this.planForm.value.userLimit),
        planId: this.planDetails.planId
      }
      this.http.postData(Api.superAdmin.plans.update, payload)
        .subscribe(response => {
        this.afterResponse(response);
      })

    }
    else{
      let payload = {
        planName: this.planForm.value.planName,
        planAmount: Number(this.planForm.value.planAmount),
        description: this.planForm.value.description,
        sitesLimit: Number(this.planForm.value.sitesLimit),
        userLimit: Number(this.planForm.value.userLimit)
      }
      this.http.postData(Api.superAdmin.plans.create, payload).subscribe(response => {
        console.log(response);
        this.afterResponse(response)
      })
    }
  }

  afterResponse(response: any) {
    if (response && response.status == 200) {
      if(response.success){
        this.planForm.reset();
        this.message.toast('success', response.message);
        this.router.navigate(['/superAdmin/plans']);
      }
      else{
        this.message.toast('error', response.message);
      }
    }
  }

  keyPressNumbersDecimal(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  GoBack() {
    this.router.navigate(['/superAdmin/plans']);
  }

}
