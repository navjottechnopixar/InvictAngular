import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { HttpService } from 'src/app/services/http.service';
import { Routes, RoleRoutes } from 'src/app/shared/routes';
import { Api } from 'src/app/utils/apis';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() showSideNav: boolean = false;
  routes: Array<any> = [];
  permissions: Array<any> = [];
  user: any;
  classActives: any;
  userRole: string = '';
  constructor(
    private admin: AdminService,
    private http: HttpService,
    private message: MessagingService
    
  ) {}

  ngOnInit(): void {
    
    this.getSubAdminPermissions()
    this.setRouts();
    this.user = this.admin.getLocalData('user')
    this.routes = this.routes.map(item => {
      item['isSelected'] = false
      return item
    })

  }



  setRouts(){
    this.userRole  = this.admin.getLocalData('roleType', true);

    switch (this.userRole) {
      case 'SuperAdmin':
        this.routes = RoleRoutes['superAdmin'];
        break;
      case 'Auditor':
        this.routes = RoleRoutes['auditor'];
        break;
      case 'Master':
        this.routes = RoleRoutes['master'];
        break;
      case 'Supervisor':
        this.routes = RoleRoutes['supervisor'];
        break;
      case 'Viewer':
        this.routes = RoleRoutes['viewer'];
        break;
      default:
        this.routes = RoleRoutes['sample'];
        break;
    }
  }

  private getSubAdminPermissions() {
    this.user = this.admin.getLocalData('user')
  }

  private getPermissionStatus(section: any) {
    console.log(section)
    if (section.sub && section.sub.length) {
      let model = this.permissions.find(item => item.model.resource == section.value)
      console.log(model);
      // return model && model.permissions.find((element: any) => element.action == 'BROWSE') ? true : false
      return model ? true : false
    } else {
      let model = this.permissions.find(item => item.model.resource == section.value)
      // return model && model.permissions.find((element: any) => element.action == 'BROWSE') ? true : false
      return model ? true : false
    }
  }


  public openSection(selectedRoute: any) {
    this.routes = this.routes.map(item => {
      item.name == selectedRoute.name ? item['isSelected'] = !item['isSelected'] : item['isSelected'] = false
      return item
    })
  }

  classActive(data:any){
    this.classActives = data;
   }

   logout() {
    this.message.confirm('logout').then(data => {
      if (data.value) {
        this.admin.logout();
      }
    });
  }
}
