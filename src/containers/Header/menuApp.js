export const adminMenu = [
    {
        name: 'menu.admin.admin',
        menus: [
            {
                name: 'menu.admin.admin', link: '/system/admin'
            }
        ]
    },
    { //Quản lý người dùng
        name: 'menu.admin.user', 
        menus: [
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            // { //Quản lý Schedule
            //     name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'    
            // },
        ]
    },
    { //Quản lý phòng khám
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },
    { //Quản lý chuyên khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    { //Quản lý tin tức
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.doctor.manage-schedule', 
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            },
            {
                name: 'menu.user.person-information', link: '/user/person-information'
            },
        ]    
    }
    
];

export const userMenu = [
    {
        name: 'menu.user.manage-user', 
        menus: [
            {
                name: 'menu.user.medical-history', link: '/user/medical-history'
            },
            {
                name: 'menu.user.medical-examination-schedule', link: '/user/medical-examination-schedule'
            },
            {
                name: 'menu.user.person-information', link: '/user/person-information'
            },
        ]    
    }
    
];
