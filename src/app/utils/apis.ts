export const Api = {
    login: `/Auth/signin`,
    forgotPassword: `/Auth/ForgotPassword`,
    resetPassword: `/Auth/ResetPassword`,
    superAdmin: {
        masterList: {
            getList: `/SuperAdmin/getMasterList`,
            create: `/SuperAdmin/createMaster`,
            getDetail: `/SuperAdmin/masterDetail`,
            goals: `/SuperAdmin/getMainGoalList`,
            companyTypes: `/SuperAdmin/getCompanyTypeList`,
            updateStatus: `/SuperAdmin/updateMasterStatus`,
            update: `/SuperAdmin/updateMaster`,
            getThemes: `/SuperAdmin/getThemeList`,
            uploadImage: `/SuperAdmin/imageUpload`
        },
        plans: {
            getList: `/SuperAdmin/getPlanList`,
            create: `/SuperAdmin/createPlan`,
            update: `/SuperAdmin/updatePlan`,
            updateStatus: `/SuperAdmin/updatePlanStatus`,
            getDetail: `/SuperAdmin/getPlanDetail`
        },
        sites: {
            getList: `/SuperAdmin/getSitesList`,
            create: `/SuperAdmin/createSite`,
            update: `/SuperAdmin/updateSite`,
            getDetail: `/SuperAdmin/getSiteDetail`
        },
        themes: {
            getList: `/SuperAdmin/getThemeList`,
        }
    },
    Master: {
       userList: {
            getList: `/Master/getUserList?userId=`,
            updateStatus: `/Master/updateUserStatus`,
            create: `/Master/createUser`,
            update: `/Master/updateUser`,
            detail: `/Master/userDetail`,
        },
        templateList: {
            getList: `/Master/getTemplate`,
            getDefaultMcqList: `/Master/getMCQ`,
            createTemplate: `/Master/createTemplate`
        }
    }
};
