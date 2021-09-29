/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 17:21:12
 * @LastEditTime: 2021-09-29 19:02:29
 * @LastEditors: zpl
 */
// 配置路由
import React from 'react';
import {
  HomeOutlined,
  ApartmentOutlined,
  FlagOutlined,
  AppstoreAddOutlined,
  NotificationOutlined,
  AuditOutlined,
  ProfileOutlined
} from '@ant-design/icons';
export default {
  route: {
    path: '/',
    routes: [
      {
        icon: <HomeOutlined />,
        path: '/',
        name: '首页'
      },
      {
        path: '/organizationManagement',
        name: '机构管理',
        icon: <ApartmentOutlined />,
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
      // 学校
      {
        path: '/schoolManagement',
        name: '学校管理',
        icon: <FlagOutlined />,
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
                  },
                  {
                    path: '/schoolManagement/courseList/classList/studentList',
                    hideInMenu: 'true',
                    name: '学生列表'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        icon: <AppstoreAddOutlined />,
        path: '/courseManagement',
        name: '课程管理',
        routes: [
          {
            name: '课程管理',
            path: '/courseManagement/courseManagement',
            routes: [
              {
                path: '/courseManagement/courseManagement/courseInfo',
                name: '课程详情',
                hideInMenu: 'true',
                routes: [
                  {
                    path: '/courseManagement/courseManagement/courseInfo/TeacherInfo',
                    name: '教师详情',
                    hideInMenu: 'true'
                  }
                ]
              },
              {
                path: '/courseManagement/courseManagement/classInfo',
                name: '班级列表',
                hideInMenu: 'true',
                routes: [
                  {
                    path: '/courseManagement/courseManagement/classInfo/studentList',
                    name: '学生列表',
                    hideInMenu: 'true'
                  }
                ]
              },
              {
                path: '/courseManagement/courseManagement/schoolList',
                name: '学校列表',
                hideInMenu: 'true',
                routes: [
                  {
                    path: '/courseManagement/courseManagement/schoolList/classInfo',
                    name: '班级列表',
                    hideInMenu: 'true',
                    routes: [
                      {
                        path: '/courseManagement/courseManagement/schoolList/classInfo/studentList',
                        name: '学生列表',
                        hideInMenu: 'true'
                      }
                    ]
                  },
                  {
                    path: '/courseManagement/courseManagement/schoolList/schoolInfos',
                    name: '学校详情',
                    hideInMenu: 'true'
                  }
                ]
              }
            ]
          },
          {
            name: '请假管理',
            path: '/courseManagement/leaveManagement'
          },
          {
            name: '退课管理',
            path: '/courseManagement/reimbursementClass'
          }
        ]
      },
      {
        icon: <NotificationOutlined />,
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
        icon: <AuditOutlined />,
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
        path: '/orderinquiry',
        name: '订单详情',
        icon: <NotificationOutlined />,
        routes: [
          {
            path: '/orderinquiry/detatil',
            name: ' 课程订单详情',
            hideInMenu: 'true'
          }
        ]
      },
      {
        path: '/statistics',
        icon: <ProfileOutlined />,
        name: '统计报表',
        routes: [
          {
            path: '/statistics/graphic',
            name: '数据大屏',
          },
          {
            path: '/statistics/afterSchoolCourse',
            name: '课后课程统计',
            routes: [
              {
                path: '/statistics/afterSchoolCourse/detail',
                name: '课后班级统计',
                hideInMenu: 'true'
              }
            ]
          },
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
    ]
  }
};
