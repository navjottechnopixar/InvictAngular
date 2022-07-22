import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  @Output() collapseSideNav = new EventEmitter();
  show: boolean = false;
  roles: any = [];
  mainRole: string = "";

  constructor(
    private admin: AdminService,
    private message: MessagingService
  ) { }

    /********* Toggle side-nav **********/
  sideNav() {
    this.show = !this.show;
    this.collapseSideNav.emit(this.show);
  }

  ngOnInit(): void {
    let roles = this.admin.getLocalData('roles', true);
    if(roles){
      this.roles =  roles.split(',');
      this.mainRole = this.admin.getLocalData('roleType', true);
    }
  }

  onChange(event: any){
    this.mainRole = event;
    this.admin.setLocalData('roleType', this.mainRole, true);
    setTimeout(() => {
      this.admin.toHome();
    }, 500);
  }



  logout() {
    this.message.confirm('logout').then(data => {
      if (data.value) {
        this.admin.logout();
      }
    });
  }
}
