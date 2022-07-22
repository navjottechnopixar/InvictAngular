export const Routes = [
  {
    name: "Dashboard", value: "MANAGE_DASHBOARD", icon: "assets/images/dashboard.png", isEnabled: false, routerLink: "dashboard", acl: 'dashboard'
  },
  {
    name: "Master List", isEnabled: false,  value: "MANAGE_MASTER_TAB", icon: "assets/images/masterlist.png", routerLink: "master-list", acl: 'posts'
  },
  {
    name: "Plans", isEnabled: false,  value: "MANAGE_PLANS_TAB", icon: "assets/images/plans.png", routerLink: "plans", acl: 'posts'
  },
  {
    name: "Sites", isEnabled: false,  value: "MANAGE_SITES_TAB", icon: "assets/images/sites.png", routerLink: "sites", acl: 'posts'
  }
]


export const RoleRoutes = {
  superAdmin: [
    {
      name: "Dashboard", value: "MANAGE_DASHBOARD", icon: "assets/images/dashboard.png", inactive_icon: "assets/images/dashboard1.png", isEnabled: false, routerLink: "superAdmin/dashboard", acl: 'dashboard'
    },
    {
      name: "Master List", isEnabled: false,  value: "MANAGE_MASTER_TAB", icon: "assets/images/masterlist1.png", inactive_icon: "assets/images/masterlist.png", routerLink: "superAdmin/master-list", acl: 'posts'
    },
    {
      name: "Plans", isEnabled: false,  value: "MANAGE_PLANS_TAB", icon: "assets/images/plans1.png", inactive_icon: "assets/images/plans.png", routerLink: "superAdmin/plans", acl: 'posts'
    },
    {
      name: "Sites", isEnabled: false,  value: "MANAGE_SITES_TAB", icon: "assets/images/sites1.png", inactive_icon: "assets/images/sites.png", routerLink: "superAdmin/sites", acl: 'posts'
    },
    {
      name: "Themes", value: "MANAGE_ReI", icon: "assets/images/themes1.png", inactive_icon: "assets/images/themes.png", isEnabled: false, routerLink: "#", acl: 'dashboard'
    },
    {
      name: "Settings", value: "MANAGE_ReI", icon: "assets/images/settings1.png", inactive_icon: "assets/images/settings.png", isEnabled: false, routerLink: "#", acl: 'dashboard'
    }
  ],
  auditor: [
    {
      name: "Dashboard", value: "MANAGE_DASHBOARD", icon: "assets/images/dashboard.png", inactive_icon: "assets/images/dashboard1.png", isEnabled: false, routerLink: "auditor/dashboard", acl: 'dashboard'
    },
    {
      name: "Users", value: "MANAGE_USERS", icon: "assets/images/users1.png",  inactive_icon: 'assets/images/users.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    },
    {
      name: "Inspection", value: "MANAGE_INSPECTION", icon: "assets/images/inspection1.png", inactive_icon: 'assets/images/inspection.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    },
    {
      name: "Record Inspection", value: "MANAGE_RI", icon: "assets/images/recordinspection1.png", inactive_icon: 'assets/images/recordinspection.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    },
    {
      name: "Review Inspection", value: "MANAGE_ReI", icon: "assets/images/reviewinspection1.png", inactive_icon: 'assets/images/reviewinspection.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    }
  ],
  master: [
    {
      name: "Dashboard", value: "MANAGE_DASHBOARD", icon: "assets/images/dashboard.png", inactive_icon: 'assets/images/dashboard1.png', isEnabled: false, routerLink: "master/dashboard", acl: 'dashboard'
    },
    {
      name: "Template", value: "MANAGE_ReI", icon: "assets/images/templates1.png", inactive_icon: 'assets/images/templates.png', isEnabled: false, routerLink: "master/template-list", acl: 'dashboard'
    },
    {
      name: "Users", value: "MANAGE_ReI", icon: "assets/images/users1.png", inactive_icon: 'assets/images/users.png', isEnabled: false, routerLink: "master/user-list", acl: 'dashboard'
    },
    {
      name: "Sites", value: "MANAGE_ReI", icon: "assets/images/sites1.png", inactive_icon: 'assets/images/sites.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    },
    {
      name: "Review Inspections", value: "MANAGE_ReI", icon: "assets/images/reviewinspection1.png", inactive_icon: 'assets/images/reviewinspection.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    },
    {
      name: "Settings", value: "MANAGE_ReI", icon: "assets/images/settings1.png", inactive_icon: 'assets/images/settings.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    }
  ],
  supervisor: [
    {
      name: "Dashboard", value: "MANAGE_DASHBOARD", icon: "assets/images/dashboard.png", inactive_icon: 'assets/images/dashboard1.png', isEnabled: false, routerLink: "supervisor/dashboard", acl: 'dashboard'
    },
    {
      name: "Inspection", value: "MANAGE_INSPECTION", icon: "assets/images/inspection1.png", inactive_icon: 'assets/images/inspection.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    },
    {
      name: "Action", value: "MANAGE_INSPECTION", icon: "assets/images/actions1.png", inactive_icon: 'assets/images/actions.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    },
    {
      name: "Users", value: "MANAGE_ReI", icon: "assets/images/users1.png", inactive_icon: 'assets/images/users.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    },
    {
      name: "Record Inspection", value: "MANAGE_ReI", icon: "assets/images/recordinspection1.png", inactive_icon: 'assets/images/recordinspection.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    }
  ],
  viewer: [
    {
      name: "Dashboard", value: "MANAGE_DASHBOARD", icon: "assets/images/dashboard.png", inactive_icon: 'assets/images/dashboard1.png', isEnabled: false, routerLink: "Viewer/dashboard", acl: 'dashboard'
    },
    {
      name: "Inspection", value: "MANAGE_INSPECTION", icon: "assets/images/inspection1.png", inactive_icon: 'assets/images/inspection.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    },
    {
      name: "Share Report", value: "MANAGE_INSPECTION", icon: "assets/images/share1.png", inactive_icon: 'assets/images/share.png', isEnabled: false, routerLink: "#", acl: 'dashboard'
    }
  ],
  sample: [
  ]

}