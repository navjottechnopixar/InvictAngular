import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-add-edit-site',
  templateUrl: './add-edit-site.component.html',
  styleUrls: ['./add-edit-site.component.css']
})
export class AddEditSiteComponent implements OnInit {
  siteForm: any;
  isSubmited:boolean = false;
  siteDetails:any;

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
        this.getSitesData(params.id);
      }
    });
    this.initSitesForm();
  }

  getSitesData(id: string){
    this.http.getData(Api.superAdmin.sites.getDetail + `?siteId=${id}`, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.siteDetails = response.data;
        console.log("====>>> ", this.siteDetails)
        this.siteForm.patchValue({
          siteName: this.siteDetails.siteName,
          members: this.siteDetails.members
        })
      }
    })
  }



  initSitesForm(){
    this.siteForm = this.formBuilder.group({
      siteName: ['', Validators.required],
      members: ['', Validators.required]
    });
  }

  get fc() { return this.siteForm.controls; }

  onSubmit(){
    this.isSubmited = true;
    if(this.siteForm.invalid){
      setTimeout(() => {
        this.isSubmited = false;
      }, 10000);
      return
    }

    let payload = {
      siteName: this.siteForm.value.siteName,
      members: Number(this.siteForm.value.members)
    }
    if(this.siteDetails){
      let payload = {
        siteName: this.siteForm.value.siteName,
        members: Number(this.siteForm.value.members),
        siteId: this.siteDetails.siteId
      }
      this.http.postData(Api.superAdmin.sites.update, payload)
        .subscribe(response => {
          this.afterResponse(response);

        })
    }
    else{
      let payload = {
        siteName: this.siteForm.value.siteName,
        members: Number(this.siteForm.value.members)
      }
      this.http.postData(Api.superAdmin.sites.create, payload).subscribe(response => {
        console.log(response);
        this.afterResponse(response)
      })
    }
  }

  afterResponse(response: any) {
    if (response && response.status == 200) {
      if(response.success){
        this.siteForm.reset();
        this.message.toast('success', response.message);
        this.router.navigate(['/superAdmin/sites']);
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
    this.router.navigate(['/superAdmin/sites']);
  }

}
