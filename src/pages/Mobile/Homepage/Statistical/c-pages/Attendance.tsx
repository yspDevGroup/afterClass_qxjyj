import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { ConfigProvider, DatePicker, Space } from 'antd';
import { Line } from '@ant-design/charts';
import locale from 'antd/lib/locale/zh_CN';

import { getTerm, lineConfig } from '../utils';
import { getScreenInfo } from '@/services/after-class-qxjyj/jyjgsj';

import should from '@/assets/should.png';
import real from '@/assets/real.png';
import leave from '@/assets/leave.png';

import styles from '../index.less';
import ModuleTitle from '../components/ModuleTitle';
import NumberCollect from '../components/NumberCollect';


const attendance = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [currentData, setCurrentData] = useState<any>();
  const { RangePicker } = DatePicker;

  const data = [
    {
      num: '1234',
      title: '今日应出勤学生'
    },{
      num: '1200',
      title: '实际出勤学生'
    },{
      num: '123',
      title: '今日应出勤教师'
    },{
      num: '111',
      title: '实际出勤教师'
    }
  ]

  lineConfig.data = [
    { "date": "实际出勤人数", "month": "一月", "yuan": 150 }, { "date": "实际出勤人数", "month": "二月", "yuan": 160 }, { "date": "实际出勤人数", "month": "三月", "yuan": 140 },
   { "date": "请假人数" , "month": "一月", "yuan": 50}, {  "date": "请假人数", "month": "二月" ,"yuan": 30}, {  "date": "请假人数" ,"month": "三月", "yuan": 10}
  ]

  const getData = async (res: any) => {

    const defaultData: any = {
      serviceNum: [],
      courseCollect: [],
      checkOut: [],
      numCollect: [],
      schoolNum: [],
      courseNum: [],
      enrollNum: [],
      agentNum: []
    };
    const result = await getScreenInfo({
      ...res,
      XZQHM: currentUser?.XZQHM
    });
    if (result.status === 'ok') {
      const { data } = result;
      if (data) {
        defaultData.serviceNum = [{
          title: '教师总数',
          num: (data?.jgjs_count || 0) + (data?.xxjs_count || 0)
        },
        {
          title: '学生总数',
          num: data?.xs_count || 0
        },
        {
          title: '收款总额',
          num: data?.sk_count || 0
        },
        {
          title: '退款总额',
          num: data?.tk_count || 0
        }];
        defaultData.checkOut = [{
          title: '今日应出勤学生',
          num: data.ydxs_count
        }, {
          title: '实际出勤学生',
          num: data.sdxs_count
        }, {
          title: '今日应出勤教师',
          num: data.ydjs_count
        }, {
          title: '实际出勤教师',
          num: data.sdjs_count
        }];
        defaultData.numCollect = [{
          title: '学校总数',
          num: data.xx_count
        }, {
          title: '机构总数',
          num: data.jg_count
        }, {
          title: '课程总数',
          num: data.kc_count
        }, {
          title: '课程班总数',
          num: data.bj_count
        }, {
          title: '学校教师总数',
          num: data.xxjs_count,
        }, {
          title: '机构教师总数',
          num: data.jgjs_count
        }];
        data.kclx?.length && data.kclx.forEach((item: { KCTAG: any; count: any; }) => {
          if (item.count !== 0) {
            defaultData.courseCollect.push({
              type: item.KCTAG,
              value: item.count
            })
          }
        });
        defaultData.schoolNum = data.xxs?.length ? [].map.call(data.xxs, (item: any) => {
          return item.XXMC;
        }) : [];
        defaultData.agentNum = data.jgs?.length ? [].map.call(data.jgs, (item: any) => {
          return item.QYMC;
        }) : [];
        data.xxkc?.length && data.xxkc.forEach((item: any) => {
          defaultData.courseNum.push({
            type: '校内课程',
            school: item.XXMC,
            value: item.xxkc_count,
          });
          defaultData.courseNum.push({
            type: '机构课程',
            school: item.XXMC,
            value: item.jgkc_count,
          })
        });
        defaultData.enrollNum = data.xxbm?.length ? [].map.call(data.xxbm, (item: any) => {
          return {
            school: item.XXMC,
            value: item.bj_count,
          };
        }) : [];
      }
    }
    setCurrentData(defaultData);
  };

  useEffect(() => {
    const res = getTerm();
    getData(res);
  }, []);

  return (
  <div className={styles.toll}>
    <div className={styles.container} style={{height: '216px'}}>
      <ModuleTitle data='考勤统计'/>
      <NumberCollect data={currentData?.checkOut} col={currentData?.checkOut.length > 3 ? 2 : currentData?.checkOut.length}/>
    </div>
    <div className={styles.container} style={{height: '756px'}}>
      <ModuleTitle data='考勤趋势'/>
      <Space direction="vertical" style={{marginTop: '20px'}} size={12}>
          <ConfigProvider locale={locale}>
            <DatePicker placeholder='请选择开始日期'/>  -  <DatePicker placeholder='请选择结束日期'/>
          </ConfigProvider>
      </Space>
      <div style = {{height:'50%', marginTop: '20px'}}>
        学生考勤
        <div className={styles.chartsContainer} style={{marginTop: '-20px', paddingBottom: 0}}>
          <Line {...lineConfig}></Line>
        </div>
      </div>
      <div style = {{height:'50%'}}>
        教师考勤
        <div className={styles.chartsContainer} >
          <Line {...lineConfig}></Line>
        </div>
      </div>
    </div>
  </div>)
}

export default attendance;
