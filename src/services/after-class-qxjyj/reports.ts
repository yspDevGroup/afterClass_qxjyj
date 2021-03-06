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
  options?: { [key: string]: any }
) {
  return request<{
    status?: 'ok' | 'error';
    data?: { count?: number; rows?: API.KHKCTJSJ[] };
    message?: string;
  }>('/reports/getCourses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 获取课后服务班级统计报表 POST /reports/getClasses */
export async function getClasses(
  body: {
    /** 学年学期 */
    XNXQ?: string;
    /** 班级名称 */
    BJMC?: string;
    /** 招生方式 */
    ZSFS?: string;
    /** 课后班级ID */
    KHBJSJId?: string;
    /** 学年学期ID */
    XNXQId?: string;
    isFW?: number;
    /** 课后课程ID */
    KHKCSJId?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/getClasses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 获取服务课程班级统计报表 POST /reports/getFWClasses */
export async function getFWClasses(
  body: {
    /** 课后班级ID */
    KHBJSJId?: string;
    /** 学年学期ID */
    XNXQId?: string;
    /** 班级名称 */
    BJMC?: string;
    /** 课程类型 */
    KCTAG?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/getFWClasses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 通过行政班来统计服务数据 POST /reports/getFWTJByXZB */
export async function getFWTJByXZB(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 校区ID */
    XQSJId?: string;
    /** 年级id */
    NJSJId?: string;
    /** 班级数据id */
    BJSJId?: string;
    /** 课后服务时间配置id */
    KHFWSJPZId?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/getFWTJByXZB', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
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
    JZGJBSJId?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<{
    status?: 'ok' | 'error';
    data?: { count?: number; rows?: API.KHJSKQSJ[] };
    message?: string;
  }>('/reports/getTeachers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
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
    XSJBSJId?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<{
    status?: 'ok' | 'error';
    data?: { count?: number; rows?: API.KHXSKQSJ[] };
    message?: string;
  }>('/reports/getStudents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 获取课后服务班级报表详情 POST /reports/getClassDetail */
export async function getClassDetail(
  body: {
    /** 班级ID */
    KHBJSJId?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    status?: 'ok' | 'error';
    data?: { XSId?: string; XSXM?: string; ZFZT?: string; TKZT?: string; BJMC?: string }[];
    message?: string;
  }>('/reports/getClassDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 获取课后服务教师考勤报表详情 POST /reports/getTeacherDetail */
export async function getTeacherDetail(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 教师ID */
    JZGJBSJId?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    status?: 'ok' | 'error';
    data?: {
      id?: string;
      BJMC?: string;
      KSS?: number;
      cq_count?: string;
      qq_count?: string;
      KSSC?: number;
      KHKCSJ?: { KCMC?: string };
    }[];
    message?: string;
  }>('/reports/getTeacherDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 获取课后服务学生考勤报表详情 POST /reports/getStudentDetail */
export async function getStudentDetail(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 学生ID */
    XSJBSJId?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    status?: 'ok' | 'error';
    data?: {
      id?: string;
      BJMC?: string;
      KSS?: number;
      cq_count?: string;
      qq_count?: string;
      KSSC?: number;
      KHKCSJ?: { KCMC?: string };
    }[];
    message?: string;
  }>('/reports/getStudentDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 获取课后服务学校课程评价信息 POST /reports/getCourseEvaluation */
export async function getCourseEvaluation(
  body: {
    /** 学校ID */
    XXJBSJId?: string;
    /** 课程名称 */
    KCMC?: string;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/getCourseEvaluation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 统计学校课程报表基本信息 POST /reports/statisCourses */
export async function statisCourses(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 学年学期ID */
    XXJBSJId?: string;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/statisCourses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 统计学校班级报表基本信息 POST /reports/statisClasses */
export async function statisClasses(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 学校ID */
    XXJBSJId?: string;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/statisClasses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 统计学校课后服务报表基本信息 POST /reports/statisticalKHFWBJ */
export async function statisticalKHFWBJ(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 学校ID */
    XXJBSJId?: string;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/statisticalKHFWBJ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 统计学校课后服务报表基本信息 POST /reports/statisticalKHFWXZB */
export async function statisticalKHFWXZB(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 学校ID */
    XXJBSJId?: string;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/statisticalKHFWXZB', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 服务班统计数据 POST /reports/summaryFWBTJ */
export async function summaryFWBTJ(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 校区ID */
    XQSJId?: string;
    /** 年级id */
    NJSJId?: string;
    /** 班级数据id */
    BJSJId?: string;
    /** 课后服务时间配置id */
    KHFWSJPZId?: string;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/summaryFWBTJ', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 导出课后服务教师考勤统计报表 POST /reports/exportTeachers */
export async function exportTeachers(
  body: {
    /** 姓名 */
    XM?: string;
    /** 学年学期ID */
    XNXQId?: string;
    /** 学校ID */
    XXJBSJId?: string;
    /** 机构ID */
    KHJYJGId?: string;
    /** 教师ID */
    JZGJBSJId?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/exportTeachers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 获取课后服务教师考勤统计报表 POST /reports/getTeachersAttendanceByDate */
export async function getTeachersAttendanceByDate(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 学校ID */
    XXJBSJId?: string;
    /** 机构ID */
    KHJYJGId?: string;
    /** 教师姓名 */
    JSXM?: string;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/getTeachersAttendanceByDate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 导出课后服务教师考勤统计报表 POST /reports/exportTeachersAttendanceByDate */
export async function exportTeachersAttendanceByDate(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 学校ID */
    XXJBSJId?: string;
    /** 机构ID */
    KHJYJGId?: string;
    /** 教师姓名 */
    JSXM?: string;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/exportTeachersAttendanceByDate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 获取课后服务教师考勤统计详情 POST /reports/getTeacherAttendanceDetailByDate */
export async function getTeacherAttendanceDetailByDate(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 教师ID */
    JZGJBSJId?: string;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/getTeacherAttendanceDetailByDate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 导出课后服务教师考勤统计详情 POST /reports/exportTeacherAttendanceDetailByDate */
export async function exportTeacherAttendanceDetailByDate(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 教师ID */
    JZGJBSJId?: string;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/exportTeacherAttendanceDetailByDate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 获取课后服务学生考勤统计报表 POST /reports/getStudentsAttendanceByDate */
export async function getStudentsAttendanceByDate(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 开始日期 */
    startDate?: string;
    /** 学生姓名 */
    XSXM?: string;
    /** 结束日期 */
    endDate?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/getStudentsAttendanceByDate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 导出课后服务学生考勤统计报表 POST /reports/exportStudentsAttendanceByDate */
export async function exportStudentsAttendanceByDate(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 开始日期 */
    startDate?: string;
    /** 学生姓名 */
    XSXM?: string;
    /** 结束日期 */
    endDate?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/exportStudentsAttendanceByDate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 获取课后服务学生考勤统计详情 POST /reports/getStudentAttendanceDetailByDate */
export async function getStudentAttendanceDetailByDate(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 学生ID */
    XSJBSJId?: string;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/getStudentAttendanceDetailByDate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 导出课后服务学生考勤统计详情 POST /reports/exportStudentAttendanceDetailByDate */
export async function exportStudentAttendanceDetailByDate(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 学生ID */
    XSJBSJId?: string;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 页数 */
    page?: number;
    /** 每页记录数 */
    pageSize?: number;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/exportStudentAttendanceDetailByDate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 重新统计课程报表基本信息 POST /reports/recalculateKCTJInfo */
export async function recalculateKCTJInfo(options?: { [key: string]: any }) {
  return request<any>('/reports/recalculateKCTJInfo', {
    method: 'POST',
    ...(options || {})
  });
}

/** 重新统计班级报表基本信息 POST /reports/recalculateBJTJInfo */
export async function recalculateBJTJInfo(options?: { [key: string]: any }) {
  return request<any>('/reports/recalculateBJTJInfo', {
    method: 'POST',
    ...(options || {})
  });
}

/** 导出学生报名总览表 POST /reports/exportStudentEnroll */
export async function exportStudentEnroll(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/exportStudentEnroll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 导出班级学生课后服务报名表 POST /reports/exportServiceEnroll */
export async function exportServiceEnroll(
  body: {
    /** 学年学期ID */
    XNXQId?: string;
    /** 班级ID */
    BJSJId?: string;
    /** 导出时段 */
    KHFWSJPZIds?: string[];
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/exportServiceEnroll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 区县教育局获取全部课程的统计报表 POST /reports/exportEducationCoursesInfo */
export async function exportEducationCoursesInfo(
  body: {
    XZQHM?: string;
    SXZQHM?: string;
    /** 课程名称 */
    KCMC?: string;
    /** 课程类型 */
    KCLX?: string;
    /** 学校名称 */
    XXMC?: string;
    /** 课程来源 */
    KCLY?: string;
    /** 学年学期 */
    XNXQ?: string;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/exportEducationCoursesInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** 局端信息统计 POST /reports/statisEducation */
export async function statisEducation(
  body: {
    XZQHM?: string;
    SXZQHM?: string;
    /** 学年 */
    XN?: string;
    /** 学期 */
    XQ?: string;
  },
  options?: { [key: string]: any }
) {
  return request<any>('/reports/statisEducation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}
