import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../utils/guards/auth.guard';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoleGuard } from '../utils/guards/role.guard';
import { PermissionGuard } from '../utils/guards/permission.guard';
// Super Admin
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

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumbs: true, text: 'Dashboard', role: 'ROLE_ADMIN' },
        canActivate: [PermissionGuard]
      }
    ]
  },
  {
    path: 'superAdmin', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {
        path: 'dashboard',
        component: SuperAdminDashboardComponent,
        data: { breadcrumbs: true, text: 'Dashboard', role: 'ROLE_SUPER_ADMIN' }
      },
      {
        path: 'master-list',
        data: { breadcrumbs: true, text: 'Master', role: 'ROLE_SUPER_ADMIN' },
        children: [
          { path: '', component: MasterListComponent },
          { path: 'add-edit', component: AddEditMasterComponent }
        ]
      },
      {
        path: 'plans',
        data: { breadcrumbs: true, text: 'Plans' },
        children: [
          { path: '', component: PlanListComponent },
          { path: 'add-edit', component: AddEditPlanComponent }
        ]
      },
      {
        path: 'sites',
        data: { breadcrumbs: true, text: 'Sites' },
        children: [
          { path: '', component: SitesListComponent },
          { path: 'add-edit', component: AddEditSiteComponent }
        ]
      },
    ]
  },
  {
    path: 'master', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {
        path: 'dashboard',
        component: MasterDashboardComponent,
        data: { breadcrumbs: true, text: 'Dashboard', role: 'ROLE_MASTER_ADMIN' }
      },
      {
        path: 'user-list',
        data: { breadcrumbs: true, text: 'User', role: 'ROLE_MASTER_ADMIN' },
        children: [
          { path: '', component: UserListComponent },
          { path: 'add-edit', component: AddEditUserComponent },
          { path: 'detail', component: UserDetailComponent },
        ]
      },
      {
        path: 'template-list',
        data: { breadcrumbs: true, text: 'Templates', role: 'ROLE_MASTER_ADMIN' },
        children: [
          { path: '', component: TemplateComponent },
          { path: 'add-template', component: AddTemplateComponent },
          { path: 'form-setting', component: FormSettingComponent }
        ]
      },
    ]
  }, {
    path: 'auditor', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {
        path: 'dashboard',
        component: AuditorDashboardComponent,
        data: { breadcrumbs: true, text: 'Dashboard', role: 'ROLE_AUDITOR_ADMIN' }
      }
    ]
  },
  {
    path: 'supervisor', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {
        path: 'dashboard',
        component: SupervisorDashboardComponent,
        data: { breadcrumbs: true, text: 'Dashboard', role: 'ROLE_SUPERVISOR_ADMIN' }
      }
    ]
  },
  {
    path: 'Viewer', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {
        path: 'dashboard',
        component: ViewerAccessDashboardComponent,
        data: { breadcrumbs: true, text: 'Dashboard', role: 'ROLE_VIEW_ACCESS_ADMIN' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
