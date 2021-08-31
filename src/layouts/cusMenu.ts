/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 17:21:12
 * @LastEditTime: 2021-08-30 16:20:10
 * @LastEditors: wsl
 */
export default [
  {
    path: '/',
    name: '首页'
  },
  {
    path: '/organizationManagement',
    name: '机构管理'
  },
  {
    path: '/organizationManagement/agencyDetails',
    name: '机构详情',
    hideInMenu: 'true'
  },
  {
    path: '/organizationManagement/courseList',
    name: '课程列表',
    hideInMenu: 'true',
    routes: [
      {
        path: '/organizationManagement/courseList/courseInfo',
        hideInMenu: 'true',
        name: '课程详情'
      }
    ]
  },

  {
    path: '/announcements',
    name: '通知公告',
    routes: [
      {
        name: '通知列表',
        path: '/announcements/list'
      },
      {
        path: '/announcements/recycleBin',
        name: '回收站'
      }
    ]
  },
  {
    path: '/policyIssued',
    name: '政策发布',
    routes: [
      {
        name: '政策列表',
        path: '/policyIssued/list'
      },
      {
        path: '/policyIssued/recycleBin',
        name: '回收站'
      }
    ]
  },
  {
    path: '/schoolManagement',
    name: '学校管理'
  }
];
