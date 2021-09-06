/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 17:21:12
 * @LastEditTime: 2021-09-06 17:02:00
 * @LastEditors: wsl
 */
export default [
  {
    path: '/',
    name: '首页'
  },
  {
    path: '/organizationManagement',
    name: '机构管理',
    routes: [
      {
        path: '/organizationManagement/historys',
        hideInMenu: 'true',
        name: '历史记录'
      },
      {
        path: '/organizationManagement/agencyDetails',
        name: '机构详情',
        hideInMenu: 'true'
      }
    ]
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
    path: '/schoolManagement',
    name: '学校管理',
    routes: [
      {
        name: '学校详情',
        path: '/schoolManagement/schoolInfos',
        hideInMenu: 'true'
      },
      {
        name: '课程列表',
        path: '/schoolManagement/courseList',
        hideInMenu: 'true',
        routes: [
          {
            path: '/schoolManagement/courseList/courseInfo',
            hideInMenu: 'true',
            name: '课程详情'
          },
          {
            path: '/schoolManagement/courseList/teacherInfo',
            hideInMenu: 'true',
            name: '老师详情'
          },
          {
            path: '/schoolManagement/courseList/classList',
            hideInMenu: 'true',
            name: '班级列表',
            routes: [
              {
                path: '/schoolManagement/courseList/classList/classInfo',
                hideInMenu: 'true',
                name: '班级详情'
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: '/courseManagement',
    name: '课程管理'
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
