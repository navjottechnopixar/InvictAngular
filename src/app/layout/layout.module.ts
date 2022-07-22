import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchStringPipe } from '../utils/pipes/search-string.pipe';
import { MasterListComponent } from './pages/super-admin/master-list/master-list.component';
import { AddEditMasterComponent } from './pages/super-admin/master-list/add-edit-master/add-edit-master.component';
import { PlanListComponent } from './pages/super-admin/plans/plan-list/plan-list.component';
import { AddEditPlanComponent } from './pages/super-admin/plans/add-edit-plan/add-edit-plan.component';
import { SitesListComponent } from './pages/super-admin/sites/sites-list/sites-list.component';
import { AddEditSiteComponent } from './pages/super-admin/sites/add-edit-site/add-edit-site.component';
import { SuperAdminDashboardComponent } from './pages/super-admin/dashboard/super-admin-dashboard.component';
import { MasterDashboardComponent } from './pages/master/dashboard/master-dashboard.component';
import { AuditorDashboardComponent } from './pages/auditor/dashboard/auditor-dashboard.component';
import { ViewerAccessDashboardComponent } from './pages/viewerAccess/dashboard/viewer-access-dashboard.component';
import { SupervisorDashboardComponent } from './pages/supervisor/dashboard/supervisor-dashboard.component';
import { UserListComponent } from './pages/master/user-list/user-list.component';
import { AddEditUserComponent } from './pages/master/user-list/add-edit-user/add-edit-user.component';
import { UserDetailComponent } from './pages/master/user-list/detail/user-detail.component';
import { TemplateComponent } from './pages/master/template/template.component';
import { AddTemplateComponent } from './pages/master/template/add-template/add-template.component';
import { FormSettingComponent } from './pages/master/template/form-setting/form-setting.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SideNavComponent,
    TopNavComponent,
    DashboardComponent,
    MasterListComponent,
    AddEditMasterComponent,
    PlanListComponent,
    AddEditPlanComponent,
    SitesListComponent,
    AddEditSiteComponent,
    SuperAdminDashboardComponent,
    MasterDashboardComponent,
    AuditorDashboardComponent,
    ViewerAccessDashboardComponent,
    SupervisorDashboardComponent,
    UserListComponent,
    AddEditUserComponent,
    UserDetailComponent,
    TemplateComponent,
    AddTemplateComponent,
    FormSettingComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [ SearchStringPipe,DatePipe ]
})
export class LayoutModule { }
