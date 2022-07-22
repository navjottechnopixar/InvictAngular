import { Component, DebugElement, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-add-edit-master',
  templateUrl: './add-edit-master.component.html',
  styleUrls: ['./add-edit-master.component.css']
})
export class AddEditMasterComponent implements OnInit {

  personalForm: any;
  companyForm: any;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;
  isSubmited: boolean = false;
  passwordNotMatched: boolean = false;
  plans: Array<any> = [];
  createdBy: string = "";
  companyTypes: any = [];
  goals: any = [];
  masterDetails: any;
  masterId: any;
  masterDetailId: any;
  themes: any = [];
  fieldTextType1: boolean = false;
  fieldTextType2: boolean = false;
  sitesLimit: any;
  userLimit: any;
  file: any;
  filePath: any;
  otherGoalCheck: any;
  otherCompanyCheck: any;
  constructor(private formBuilder: FormBuilder,
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private message: MessagingService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.masterId = params.id;
        this.initForm('Update');
        this.getMasterDetails(params.id);
      }
      else {
        this.initForm('Create');
      }
    });

    this.createdBy = this.getLocalData('loginUserId', true);
    this.getPlans();
    this.getThemes();
    this.getCompanyTypeAndGoal();
    // this.initForm();
  }

  initForm(type: string) {
    if (type === 'Create') {
      this.personalForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        planId: ['', Validators.required],
        phone: ['', Validators.required],
        sitesLimit: [''],
        usersLimit: [''],
        password: ['', Validators.required],
        confirm_password: ['', Validators.required],
        themeId: ['', Validators.required],
      });
    }
    else {
      this.personalForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        planId: ['', Validators.required],
        phone: ['', Validators.required],
        sitesLimit: [''],
        usersLimit: [''],
        password: [''],
        confirm_password: [''],
        themeId: ['', Validators.required]
      });
    }

    this.companyForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      mainGoalId: ['', Validators.required],
      isMainGoalOther: [''],
      mainGoalDescription: [''],
      companyTypeId: ['', Validators.required],
      isCompanyTypeOther: [''],
      companyTypeDescription: [''],
    });
  }

  getMasterDetails(id: any) {
    this.http.getData(Api.superAdmin.masterList.getDetail + `?masterId=${id}`, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.masterDetails = response.data;
        this.masterDetailId = this.masterDetails.masterDetailId
        this.patchMasterDetails();
      }
    })
  }

  onFileSelected(event: any) {
    if (event.target.value) {
      const file = event.target.files[0];
      const type = file.type;
      this.changeFile(file).then((base64: any): any => {
        let blobData = new Blob([base64], {
          type: type
        });
        this.file = file;
        this.filePath = file.Path;
      });
    } else alert('Nothing')
  }

  changeFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  patchMasterDetails() {
    this.personalForm.patchValue({
      firstName: this.masterDetails.firstName,
      lastName: this.masterDetails.firstName,
      email: this.masterDetails.email,
      planId: this.masterDetails.planId,
      phone: this.masterDetails.phone,
      sitesLimit: this.masterDetails.sitesLimit,
      usersLimit: this.masterDetails.usersLimit,
      themeId: this.masterDetails.themeId
    })

    this.companyForm.patchValue({
      companyName: this.masterDetails.companyName,
      mainGoalId: this.masterDetails.mainGoalId,
      companyTypeId: this.masterDetails.companyTypeId,
      isMainGoalOther: this.masterDetails.isMainGoalOther,
      mainGoalDescription: this.masterDetails.mainGoalDescription,
      isCompanyTypeOther: this.masterDetails.isCompanyTypeOther,
      companyTypeDescription: this.masterDetails.companyTypeDescription
    })

    this.goalRadioChecked(this.masterDetails.mainGoalId, 1);
    this.companyRadioChecked(this.masterDetails.companyTypeId, 1)
  }

  getLocalData(key: string, json?: boolean) {
    let _data: any;
    try {
      _data = localStorage.getItem(key);
      if (json) {
        _data = JSON.parse(_data);
      }
      return _data;
    } catch (error) {
      return null;
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

  get personal() { return this.personalForm.controls; }
  get adf() { return this.companyForm.controls; }

  next() {
    if (this.step == 1) {
      this.personal_step = true;
      if (this.personalForm.invalid) { return }
      if (!this.masterDetails) {
        if (this.personalForm.value.password !== this.personalForm.value.confirm_password) {
          this.passwordNotMatched = true;
          return
        }
      }
      let p = this.plans.find(i => i.planId == this.personalForm.value.planId);
      this.sitesLimit = p.sitesLimit;
      this.userLimit = p.userLimit;
      let formValue1 = parseInt(this.personalForm.value.sitesLimit, 10);
      let formValue2 = parseInt(this.personalForm.value.usersLimit, 10);
      if (this.sitesLimit < formValue1) {
        return;
      }
      if (this.userLimit < formValue2) {
        return;
      }
      this.step++
    }
    if (this.step == 2) {
      console.log(this.step)
      this.address_step = true;
      if (this.companyForm.invalid) { return }
      this.step++;
    }
  }

  cancel() {
    this.router.navigate(['/superAdmin/master-list']);
  }

  previous() {
    this.step--
    if (this.step == 1) {
      this.personal_step = false;
    }
    if (this.step == 2) {
      this.education_step = false;
    }
  }

  setMaxSiteandUser(arg1: any) {
    let p = this.plans.find(i => i.planId == arg1);
    this.sitesLimit = p.sitesLimit;
    this.userLimit = p.userLimit;
  }

  getPlans() {
    this.http.getData(Api.superAdmin.plans.getList, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.plans = response.data;
        let p = this.plans.filter(pr => pr.planStatus == 1);
        this.plans = p;
      }
    })
  }

  getThemes() {
    this.http.getData(Api.superAdmin.themes.getList, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.themes = response.data;
      }
    })
  }

  getCompanyTypeAndGoal() {
    this.http.getData(Api.superAdmin.masterList.goals, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.goals = response.data;
      }
    })
    this.http.getData(Api.superAdmin.masterList.companyTypes, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.companyTypes = response.data;
        for (let i = 0; i < this.companyTypes.length; i++) {
          const element = this.companyTypes[i];
          element.selected = false;
        }
      }
    })
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.companyForm.invalid) {
      this.isSubmited = false;
      return
    }

    if (this.masterId) {
      let payload = {
        id: this.masterId,
        firstName: this.personalForm.value.firstName,
        lastName: this.personalForm.value.lastName,
        phone: this.personalForm.value.phone,
        planId: this.personalForm.value.planId,
        themeId: this.personalForm.value.themeId,
        status: 1,
        sitesLimit: parseInt(this.personalForm.value.sitesLimit),
        usersLimit: parseInt(this.personalForm.value.usersLimit),
        mainGoalId: parseInt(this.companyForm.value.mainGoalId),
        companyTypeId: parseInt(this.companyForm.value.companyTypeId),
        isMainGoalOther: this.companyForm.value.isMainGoalOther,
        isCompanyTypeOther: this.companyForm.value.isCompanyTypeOther,
        mainGoalDescription: this.companyForm.value.mainGoalDescription,
        companyTypeDescription: this.companyForm.value.companyTypeDescription,
        companyName: this.companyForm.value.companyName,
        masterDetailId: this.masterDetailId
      }

      this.http.postData(Api.superAdmin.masterList.update, payload).subscribe(response => {
        console.log(response);
        var formData = new FormData();
        formData.append("imagefile", this.file, this.file.path);
        formData.append("Id", this.masterId);
        this.http.postData(Api.superAdmin.masterList.uploadImage, formData).subscribe(response => {
          console.log(response);
        })
        this.afterResponse(response)
      })
    }
    else {
      let payload = {
        firstName: this.personalForm.value.firstName,
        lastName: this.personalForm.value.lastName,
        email: this.personalForm.value.email,
        password: this.personalForm.value.password,
        phone: this.personalForm.value.phone,
        planId: this.personalForm.value.planId,
        themeId: 1,
        status: 1,
        sitesLimit: parseInt(this.personalForm.value.sitesLimit),
        usersLimit: parseInt(this.personalForm.value.usersLimit),
        mainGoalId: parseInt(this.companyForm.value.mainGoalId),
        companyTypeId: parseInt(this.companyForm.value.companyTypeId),
        isMainGoalOther: this.companyForm.value.isMainGoalOther,
        isCompanyTypeOther: this.companyForm.value.isCompanyTypeOther,
        mainGoalDescription: this.companyForm.value.mainGoalDescription,
        companyTypeDescription: this.companyForm.value.companyTypeDescription,
        companyName: this.companyForm.value.companyName,
        createdBy: this.createdBy
      }
      this.http.postData(Api.superAdmin.masterList.create, payload).subscribe(response => {
        console.log(response);
        var formData = new FormData();
        formData.append("imagefile", this.file, this.file.path);
        formData.append("Id", response.data);
        this.http.postData(Api.superAdmin.masterList.uploadImage, formData).subscribe(response => {
          console.log(response);
        })
        this.afterResponse(response)
      })
    }
  }

  afterResponse(response: any) {
    if (response && response.status == 200) {
      if (response.success) {
        this.personalForm.reset();
        this.companyForm.reset();
        this.message.toast('success', `Master list created successfully`);
        this.router.navigate(['/superAdmin/master-list']);
      }
      else {
        this.previous();
        this.message.toast('error', response.message);
      }
    }
  }

  companyRadioChecked(id: any, i: number) {
    this.companyTypes.forEach((item: any) => {
      if (item.companyTypeId !== id) {
        item.selected = false;
      } else {
        item.selected = true;
        this.otherCompanyCheck = false;
        this.companyForm.patchValue({
          companyTypeId: item.companyTypeId,
          isCompanyTypeOther: false,
          companyTypeDescription: ""
        })
      }
      var dom = document.getElementById('companyTypeInput');
      if (dom != undefined) {
        dom.style.display = 'none';
      }
    })
  }

  goalRadioChecked(id: any, i: number) {
    this.goals.forEach((item: any) => {
      if (item.mainGoalId !== id) {
        item.selected = false;
      } else {
        item.selected = true;
        this.otherGoalCheck = false;
        this.companyForm.patchValue({
          mainGoalId: item.mainGoalId,
          isMainGoalOther: false,
          mainGoalDescription: ''
        })
      }
      var dom = document.getElementById('mainGoalInput');
      if (dom != undefined) {
        dom.style.display = 'none';
      }
    })
  }

  goalOtherRadioChecked() {
    this.goals.forEach((item: any) => {
      item.selected = false;
    })
    this.otherGoalCheck = true;
    this.companyForm.patchValue({
      mainGoalId: 0,
      isMainGoalOther: true
    })
    var dom = document.getElementById('mainGoalInput');
    if (dom != undefined) {
      dom.style.display = 'block';
    }
  }


  companyTypeRadioChecked() {
    this.companyTypes.forEach((item: any) => {
      item.selected = false;
    })
    this.otherCompanyCheck = true;
    this.companyForm.patchValue({
      companyTypeId: 0,
      isCompanyTypeOther: true
    })
    var dom = document.getElementById('companyTypeInput');
    if (dom != undefined) {
      dom.style.display = 'block';
    }
  }

  onTypeOtherCompany() { 
    this.companyForm.patchValue({
      companyTypeDescription: this.companyForm.controls.companyTypeDescription.value
    })
  }
  onTypeOtherGoal() {
    this.companyForm.patchValue({
      mainGoalDescription: this.companyForm.controls.mainGoalDescription.value
    })
   }
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

}
