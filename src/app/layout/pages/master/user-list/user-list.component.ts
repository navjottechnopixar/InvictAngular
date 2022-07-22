import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { Api } from 'src/app/utils/apis';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userForm: any;
  userList: any = [];
  userId: any;
  dashBoradData: any;
  siteData: any;
  roleData: any;
  settings: any;
  passwordNotMatched: boolean = false;
  sitesList: any = [];
  selectedRoles: any = [];
  rolesDropSetting: IDropdownSettings = {};
  mainRoles: any = [];
  submitted: boolean = false;
  userDetails: any = {};
  formPaylod: any = {};
  userListId: string = '';
  isPopupShow: boolean = false;
  fieldTextType1: boolean = false;
  fieldTextType2: boolean = false;

  constructor(
    private http: HttpService,
    private message: MessagingService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.mainRoles = ['Master', 'Supervisor', 'Auditor', 'Viewer'];
    this.roleData = [
      { roleId: 1, roleType: 'Master' },
      { roleId: 2, roleType: 'Supervisor' },
      { roleId: 3, roleType: 'Auditor' },
      { roleId: 4, roleType: 'Viewer' }
    ];

    this.rolesDropSetting = {
      singleSelection: false,
      idField: 'roleId',
      textField: 'roleType',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };

    this.userId = this.getLocalData('loginUserId', true);
    this.getUserList();
    this.getSites();

    // this.route.queryParams.subscribe((params: any) => {
    //   if (params.id) {
    //     this.initForm('Update');
    //     // this.getMasterDetails(params.id);
    //   }
    //   else {
    //     this.initForm('Create');
    //   }
    // });

    this.initForm('Create');
  }

  onRoleSelect(item: any) {
    // this.selectedRoles.push(item);
  }
  onSelectAll(items: any) {
    this.selectedRoles = items;
  }

  onDeSelectRolesAll(items: any) {
    this.selectedRoles = [];
  }

  onDeSelectRolesSingle(item: any) {
    console.log(this.selectedRoles);
  }

  getSites() {
    this.http.getData(Api.superAdmin.sites.getList, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.sitesList = (response.data && response.data.length) ? response.data : [];
      }
    })
  }

  initForm(type: string) {
    if (type === 'Create') {
      this.userForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        siteId: ['', Validators.required],
        roles: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        confirm_password: ['', Validators.required],
        status: [1],
        createdBy: [this.userId],
        mainRole: ['', Validators.required]
      });
    }
    else {
      this.userForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        siteId: ['', Validators.required],
        roles: ['', Validators.required],
        phone: ['', Validators.required],
        status: [1],
        createdBy: [this.userId],
        mainRole: ['', Validators.required],
        id: [''],
        userDetailId: ['']
      });
    }
  }

  openEditPopup(item?: any) {
    this.initForm('Edit');
    this.userListId = item.userId;
    this.isPopupShow = true;
    let roles = item.role.split(',');
    let rolesObj: any = [];
    roles.forEach((element: any) => {
      let filteredObj = this.roleData.filter((item: any) => {
        return element === item.roleType
      })
      let roleId = filteredObj[0]?.roleId;
      rolesObj.push({
        roleId: roleId,
        roleType: element
      })
    });
    setTimeout(() => {
      this.userForm.patchValue({
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        siteId: item.siteId,
        phone: item.phone,
        roles: rolesObj,
        mainRole: item.mainRole,
        id: this.userListId,
        userDetailId: item.userDetailId
      })
    }, 500);

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

  getUserList() {
    this.http.getData(Api.Master.userList.getList + this.userId, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.userList = (response.data && response.data.length) ? response.data : [];
        console.log(this.userList);
      }
    })
  }


  editUser(ep: any) {
    this.router.navigate(['/superAdmin/master-list/add-edit'],
      {
        queryParams: {
          id: ep.id
        }
      })
  }

  changeUserStatus(id: any, event: any) {
    this.message.confirm('change status').then(data => {
      if (data.value) {
        // 
        let currentStatus = event.target.checked;
        let status = (currentStatus) ? 1 : 0;
        this.http.postData(`${Api.Master.userList.updateStatus}?userDetailId=` + id + '&status=' + status, {})
          .subscribe(response => {
            if (response && response.status == 200) {
              if (response.success) {
                this.message.toast('success', `Status updated successfully`);
              }
              else {
                this.message.toast('error', response.message);
              }
            }
          })
        // 
      }
      else {
        event.target.checked = !event.target.checked;
      }
    });
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


  getRolesData() {
    let rolesObj: any = [];
    for (let index = 0; index < this.userForm.value.roles.length; index++) {
      const element = this.userForm.value.roles[index];
      rolesObj.push({
        roleType: element.roleType
      })
    }

    this.userForm.patchValue({
      roles: rolesObj
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return
    }
    if (this.userForm.value.password !== this.userForm.value.confirm_password) {
      this.passwordNotMatched = true;
      return
    }

    this.passwordNotMatched = false;
    this.getRolesData();
    this.formPaylod = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone.toString(),
      roles: this.userForm.value.roles,
      mainRole: this.userForm.value.mainRole,
      siteId: parseInt(this.userForm.value.siteId),
      status: 1,
      createdBy: this.userForm.value.createdBy
    }

    if (this.userListId) {
      this.formPaylod.id = this.userListId;
      this.formPaylod.userDetailId = this.userForm.value.userDetailId;
      this.formPaylod.roles = this.formPaylod.roles.map((i: any) => i.roleType).join(",");
      this.http.postData(Api.Master.userList.update, this.formPaylod).subscribe(response => {
        console.log(response);
        this.afterResponse(response)
      })


    }
    else {
      this.formPaylod.password = this.userForm.value.password;
      this.http.postData(Api.Master.userList.create, this.formPaylod).subscribe(response => {
        console.log(response);
        this.afterResponse(response)
      })

    }
    console.log("Password Match Error => ", this.userForm.value);
  }

  afterResponse(response: any) {
    if (response && response.status == 200) {
      if (response.success) {
        this.userForm.reset();
        let msg = (this.userDetails) ? 'Updated' : 'Created';
        this.message.toast('success', `User ${msg} successfully`);
        this.isPopupShow = false;
        this.userForm.reset();
        this.getUserList();
      }
      else {
        this.message.toast('error', response.message);
      }
    }
  }

  addUserPopup() {
    this.isPopupShow = true;
    this.userListId = '';
    this.initForm('Create');
  }

  cancelPopup() {
    this.isPopupShow = false;
    this.userListId = '';
  }

  get userFc() { return this.userForm.controls; }

  goToDetail(item: any) {
    this.router.navigate(['/master/user-list/detail'],
      {
        queryParams: {
          id: item.userId
        }
      })
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
}