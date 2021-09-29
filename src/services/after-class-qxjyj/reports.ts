// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取课后服务课程统计报表 POST /reports/getCourses */
export async function getCourses(
  body: {
    /** 课程名称 */
    KCMC?: string;
    /** 课程类型 */
    KCLX?: string;
    /** 课程来源 */
    KCLY?: string;
    /** 学校ID */
    XXJBSJId?: string;
    /** 机构ID */
    KHJYJGId?: string;
    /** 学年学期ID */
    XNXQId?: string;
    /** 课后课程ID */
    KHKCSJId?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    status?: 'ok' | 'error';
    data?: { count?: number; rows?: API.KHKCTJSJ[] };
    message?: string;
  }>('/reports/getCourses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取课后服务班级统计报表 POST /reports/getClasses */
export async function getClasses(
  body: {
    /** 班级名称 */
    BJMC?: string;
    /** 招生方式 */
    ZSFS?: string;
    /** 课后班级ID */
    KHBJSJId?: string;
    /** 学年学期ID */
    XNXQId?: string;
    /** 课后课程ID */
    KHKCSJId?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    status?: 'ok' | 'error';
    data?: { count?: number; rows?: API.KHBJTJSJ[] };
    message?: string;
  }>('/reports/getClasses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取课后服务教师考勤统计报表 POST /reports/getTeachers */
export async function getTeachers(
  body: {
    /** 姓名 */
    XM?: string;
    /** 学年学期ID */
    XNXQId?: string;
    /** 教师ID */
    KHJSSJId?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    status?: 'ok' | 'error';
    data?: { count?: number; rows?: API.KHJSKQSJ[] };
    message?: string;
  }>('/reports/getTeachers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取课后服务学生考勤统计报表 POST /reports/getStudents */
export async function getStudents(
  body: {
    /** 姓名 */
    XM?: string;
    /** 学年学期ID */
    XNXQId?: string;
    /** 学生ID */
    XSId?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    status?: 'ok' | 'error';
    data?: { count?: number; rows?: API.KHXSKQSJ[] };
    message?: string;
  }>('/reports/getStudents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取课后服务班级报表详情 POST /reports/getClassDetail */
export async function getClassDetail(
  body: {
    /** 班级ID */
    KHBJSJId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    status?: 'ok' | 'error';
    data?: { XSId?: string; XSXM?: string; ZFZT?: string; TKZT?: string; BJMC?: string };
    message?: string;
  }>('/reports/getClassDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取课后服务教师考勤报表详情 POST /reports/getTeacherDetail */
export async function getTeacherDetail(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 教师ID */
    KHJSSJId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    status?: 'ok' | 'error';
    data?: {
      id?: string;
      BJMC?: string;
      cq_count?: string;
      qq_count?: string;
      KHKCSJ?: { KCMC?: string };
    };
    message?: string;
  }>('/reports/getTeacherDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取课后服务学生考勤报表详情 POST /reports/getStudentDetail */
export async function getStudentDetail(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 学生ID */
    XSId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    status?: 'ok' | 'error';
    data?: {
      id?: string;
      BJMC?: string;
      cq_count?: string;
      qq_count?: string;
      KHKCSJ?: { KCMC?: string };
    };
    message?: string;
  }>('/reports/getStudentDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}