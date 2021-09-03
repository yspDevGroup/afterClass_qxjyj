/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 17:21:12
 * @LastEditTime: 2021-09-02 08:47:15
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
        path: '/announcements/announcementsList',
        routes: [
          {
            name: '编辑文章',
            path: '/announcements/announcementsList/editArticle',
            hideInMenu: 'true'
          },
          {
            name: '公告详情',
            path: '/announcements/announcementsList/articleDetails',
            hideInMenu: 'true'
          }
        ]
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
        path: '/policyIssued/policyIssuedList',
        routes: [
          {
            name: '编辑文章',
            path: '/policyIssued/policyIssuedList/editArticle',
            hideInMenu: 'true'
          },
          {
            name: '政策详情',
            path: '/policyIssued/policyIssuedList/articleDetails',
            hideInMenu: 'true'
          }
        ]
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
  },
  {
    name: '课程详情',
    path: '/schoolManagement/courseInfo',
    hideInMenu: 'true'
  },
  {
    path: '/courseManagement',
    name: '课程管理'
  },
  {
    path: '/courseInfo',
    name: '课程详情',
    hideInMenu: 'true'
  },
  {
    path: '/classInfo',
    name: '班级详情',
    hideInMenu: 'true'
  }
];
