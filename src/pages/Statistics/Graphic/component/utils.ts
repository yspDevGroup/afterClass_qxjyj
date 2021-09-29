/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 19:59:45
 * @LastEditTime: 2021-09-28 18:25:49
 * @LastEditors: Sissle Lynn
 */

import should from '@/assets/should.png';
import real from '@/assets/real.png';
import leave from '@/assets/leave.png';

export const textColor1 = ['#FF715C', '#60DD95', '#4FC4E7', '#FFA729'];
export const textColor2 = ['#FFA729', '#60DD95', '#FF715C'];

export const columnConfig: any = {
  appendPadding: 20,
  data: [],
  xField: 'type',
  yField: 'value',
  xAxis: {
    label: {
      autoHide: false,
      autoRotate: false
    }
  },
  yAxis: { minInterval: 1 },
  grid: {
    containLabel: true,
    bottom: 40
  },
  columnStyle: {},
  maxColumnWidth: 30,
  meta: {
    type: { alias: '学校名称' },
    value: { alias: '课程数量' },
  }
};
export const pieConfig: any = {
  appendPadding: 20,
  legend: false,
  data: [],
  angleField: 'value',
  colorField: 'type',
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  radius: 0.8,
  innerRadius: 0.6,
  pieStyle: {
    stroke: '#fff',
    lineWidth: 0,
    strokeOpacity: 0,
  },
  label: {
    type: 'spider',
    labelHeight: 28,
    content: '{name}',
  },
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  statistic: {
    title: false,
    content: false,
  },
};
export const mock: any = {
  serviceNum: [{
    title: '家长总数',
    num: '45236'
  },
  {
    title: '学生总数',
    num: '45736'
  },
  {
    title: '收款总额',
    num: '32870789'
  },
  {
    title: '退款总额',
    num: '40455'
  }],
  courseCollect: [{
    type: '艺术类',
    value: 34
  }, {
    type: '人文社科类',
    value: 54
  }, {
    type: '体育类',
    value: 23
  }, {
    type: '自然科学类',
    value: 31
  }, {
    type: '社会实践类',
    value: 13
  }, {
    type: '托管服务',
    value: 37
  }, {
    type: '其他',
    value: 12
  }],
  checkOut: [{
    icon: should,
    title: '应到人数',
    num: 2100
  }, {
    icon: real,
    title: '实到人数',
    num: 1842
  }, {
    icon: leave,
    title: '请假人数',
    num: 258
  }],
  numCollect: [{
    title: '学校总数',
    num: 21
  }, {
    title: '机构总数',
    num: 28
  }, {
    title: '课程总数',
    num: 123
  }, {
    title: '课程班总数',
    num: 234
  }, {
    title: '学校教师总数',
    num: 45
  }, {
    title: '机构教师总数',
    num: 23
  }]
};
