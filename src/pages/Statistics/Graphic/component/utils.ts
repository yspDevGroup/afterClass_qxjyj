/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 19:59:45
 * @LastEditTime: 2021-09-29 19:49:49
 * @LastEditors: Sissle Lynn
 */
export const textColor1 = ['#FF715C', '#60DD95', '#4FC4E7', '#FFA729'];
export const textColor2 = ['#FFA729', '#60DD95', '#FF715C'];

export const columnConfig: any = {
  appendPadding: 20,
  data: [],
  xField: 'school',
  yField: 'value',
  seriesField: 'type',
  isStack: true,
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
      style: {
        fill: 'white',
        fontSize: 14,
      }
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
  },
  label: {
    position: 'middle',
    style: { fill: '#fff' },
  },
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
    style: {
      fill: 'white',
      fontSize: 15,
    }
  },
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  statistic: {
    title: false,
    content: false,
  },
};
export const barConfig: any = {
  yField: 'school',
  xField: 'value',
  yAxis: {
    label: {
      autoRotate: false,
      style: {
        fill: 'white',
        fontSize: 14,
      }
    }
  },
  maxBarWidth: 30,
  scrollbar: { type: 'vertical' },
};
export const defaultData: any = {
  serviceNum: [],
  courseCollect: [],
  checkOut: [],
  numCollect: [],
  schoolNum: [],
  courseNum: [],
  enrollNum: [],
  agentNum: []
};
export const getTerm = () => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  if (month < 8) {
    return {
      XN: `${year - 1}-${year}`,
      XQ: '第二学期'
    }
  } else {
    return {
      XN: `${year}-${year + 1}`,
      XQ: '第一学期'
    }
  }
}
