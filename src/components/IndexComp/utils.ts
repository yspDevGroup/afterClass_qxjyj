/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 19:59:45
 * @LastEditTime: 2021-09-09 11:48:52
 * @LastEditors: Sissle Lynn
 */
export const bgColor = [
  {
    begin: '#FFA178',
    end: '#FF6756',
  },
  {
    begin: '#36D1DC',
    end: '#85ABFF',
  },
  {
    begin: '#FFE466',
    end: '#FF9B1E',
  },
  {
    begin: '#6FEE7C',
    end: '#4DC6B7',
  },
  {
    begin: '#86A8E7',
    end: '#7F7FD5',
  },
  {
    begin: '#4BF3D5',
    end: '#1CC6C6',
  },
];
export const topNum = [
  {
    title: '开设课后服务学校',
    type: 'xxNum'
  },
  {
    title: '已准入机构',
    type: 'jgNum',
  },
  {
    title: '开设课程',
    type: 'kcNum'
  },
  {
    title: '开设课程班',
    type: 'bjNum'
  },
  {
    title: '参加学生',
    type: 'xsNum'
  },
  {
    title: '收费金额',
    type: 'amount'
  }
];
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
  grid:{
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
  legend: {
    layout: 'horizontal',
    position: 'top',
  },
  data: [],
  angleField: 'value',
  colorField: 'type',
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  radius: 0.8,
  innerRadius: 0.6,
  pieStyle:{
    stroke:'#fff',
    lineWidth:0,
    strokeOpacity:0,
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
export const lineConfig: any = {
  appendPadding: 20,
  data: [],
  xField: 'type',
  yField: 'value',
  seriesField: 'category',
  legend: false,
  yAxis: {},
  grid:{
    containLabel: true,
    bottom: 40
  },
  color: ['#1979C9', '#D62A0D', '#FAA219'],
};
