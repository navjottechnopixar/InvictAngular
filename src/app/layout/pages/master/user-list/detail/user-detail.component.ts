import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { Api } from 'src/app/utils/apis';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: string = '';
  userDetail: any = {};
  constructor(
    private http: HttpService,
    private message: MessagingService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    ) { }
    
    ngOnInit(): void {
      this.route.queryParams.subscribe((params: any) => {
        if (params.id) {
          this.getUserDetail(params.id);
        }
      });
      this.userId = this.adminService.getLocalData('loginUserId', true);
  }

  getUserDetail(id: string){
    this.http.getData(`${Api.Master.userList.detail}?userId=${id}`, {}).subscribe(response => {
      if (response && response.status == 200) {
        if(response.success){
          this.userDetail = response.data;
        }
        else{
          this.message.toast('error', response.message);
          this.userDetail = {
            firstName: '',
            lastName: '',
            email: '',
            mainRole: ''
          }
        }
      }
    })
  }

  GoBack() {
    this.router.navigate(['/master/user-list']);
  }
}
