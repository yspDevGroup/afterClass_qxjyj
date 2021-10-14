import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { ConfigProvider, DatePicker, Empty, Space } from 'antd';
import { Line } from '@ant-design/charts';
import locale from 'antd/lib/locale/zh_CN';

import { getTerm, teacherConfig, studentConfig } from '../utils';
import { getAttendanceTrend, getScreenInfo } from '@/services/after-class-qxjyj/jyjgsj';

import noData from '@/assets/noData.png';

import styles from '../index.less';
import ModuleTitle from '../components/ModuleTitle';
import NumberCollect from '../components/NumberCollect';
import moment from 'moment';


const attendance = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [currentData, setCurrentData] = useState<any>();
  const [startTime, setStartTime] = useState<any>("2021-10-01");
  const [endTime, setEndTime] = useState<any>("2021-10-01");
  const [xskqConfig, setXskqConfig] = useState<any>({...studentConfig});
  const [jskqConfig, setJskqConfig] = useState<any>({...teacherConfig});

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

  const handleStartTime = (date: any) => {
    setStartTime(moment(date).format('YYYY-MM-DD'));
  }
  const handleEndTime = (date: any) => {
    setEndTime(moment(date).format('YYYY-MM-DD'));
  }

    useEffect(()=>{
      getCQData();
    },[endTime])

  const getCQData = async () => {
    const attenRes = await getAttendanceTrend({
      XZQHM: currentUser?.XZQHM,
      startDate: startTime,
      endDate: endTime
    });
    if(attenRes.status === 'ok'){
        console.log('attenRes: ', attenRes);
        let newData: { date: string; time: any; count: any; }[] = [];

        attenRes.data.jscq.forEach((item: any)=>{
          newData.push(
            { date: "实际出勤人数", time: item.CQRQ, count: item.normal},
            { date: "请假人数", time: item.CQRQ, count: item.abnormal},
          );
        })
        setJskqConfig({...jskqConfig, data: [...newData]});
        console.log('teacherConfig.data: ', teacherConfig.data);
        newData = [];
        attenRes.data.xscq.forEach((item: any)=>{
          newData.push(
            { date: "实际出勤人数", time: item.CQRQ, count: item.normal},
            { date: "请假人数", time: item.CQRQ, count: item.abnormal},
          );
        })
        setXskqConfig({...xskqConfig, data: [...newData]});
    }

  }

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
            <DatePicker placeholder='请选择开始日期' onChange={handleStartTime}/>  -  <DatePicker placeholder='请选择结束日期' onChange={handleEndTime}/>
          </ConfigProvider>
      </Space>
      <div style = {{height:'48%', marginTop: '20px'}}>
        学生考勤
        <div className={styles.chartsContainer} style={{marginTop: '-20px', paddingBottom: 0}}>
          {
            xskqConfig.data?.length ? <Line {...xskqConfig}></Line> : <Empty
            image={noData}
            imageStyle={{
              height: 80,
            }}
            description={'暂无信息'} />
          }
        </div>
      </div>
      <div style = {{height:'48%', marginBottom: '20px'}}>
        教师考勤
        <div className={styles.chartsContainer} >
          {
            jskqConfig.data?.length ? <Line {...jskqConfig}></Line> : <Empty
            image={noData}
            imageStyle={{
              height: 80,
            }}
            description={'暂无信息'} />
          }
        </div>
      </div>
    </div>
  </div>)
}

export default attendance;
