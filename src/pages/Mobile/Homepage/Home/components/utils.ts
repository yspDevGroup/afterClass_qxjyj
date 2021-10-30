import joinSchool from '@/assets/icons/Join-school.png'
import openOrganization from '@/assets/icons/open-organization.png'
import courseSum from '@/assets/icons/course-sum.png'
import joinStudent from '@/assets/icons/join-student.png'
import joinTeacher from '@/assets/icons/join-teacher.png'
import totalSum from '@/assets/icons/total-sum.png'
import refundSum from '@/assets/icons/refund-sum.png'
import organizationCourse from '@/assets/icons/organization-course.png'
import schoolCourse from '@/assets/icons/school-course.png'

export const topNum = [
  {
    title: '参与学校',
    type: 'xxNum',
    bgImg: joinSchool,
  },
  {
    title: '开设机构',
    type: 'jgNum',
    bgImg: openOrganization,
  },
  {
    title: '课程总数',
    type: 'kcNum',
    bgImg: courseSum,

  },
  {
    title: '学校课程',
    type: 'xxkc_count',
    bgImg: schoolCourse,
  },
  {
    title: '机构课程',
    type: 'jgkc_count',
    bgImg: organizationCourse,
  },
  {
    title: '参与学生数',
    type: 'xsNum',
    bgImg: joinStudent,
  },
  {
    title: '参与教师数',
    type: 'js_count',
    bgImg: joinTeacher,
  },
  {
    title: '收费总额(元)',
    type: 'amount',
    bgImg: totalSum,
  },
  {
    title: '退费总额(元)',
    type: 'tk_amount',
    bgImg: refundSum,
  }
];
