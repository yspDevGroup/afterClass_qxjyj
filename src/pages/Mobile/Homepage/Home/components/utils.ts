import joinSchool from '@/assets/icons/join-school.png'
import openOrganization from '@/assets/icons/open-Organization.png'
import courseSum from '@/assets/icons/course-sum.png'
import joinStudent from '@/assets/icons/join-student.png'
import applyNumber from '@/assets/icons/apply-number.png'
import joinTeacher from '@/assets/icons/join-teacher.png'
import totalSum from '@/assets/icons/total-sum.png'
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
    title: '报名人次',
    type: 'xsbj_count',
    bgImg: applyNumber,
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
  }
];
