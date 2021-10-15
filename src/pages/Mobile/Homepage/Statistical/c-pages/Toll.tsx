import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Col, ConfigProvider, DatePicker, Empty, Row, Space } from 'antd';
import locale from 'antd/lib/locale/zh_CN';
import { Bar } from '@ant-design/charts';
import moment from 'moment';

import { getTerm, barConfig } from '../utils';
import { getScreenInfo , getTotalCost } from '@/services/after-class-qxjyj/jyjgsj';

import should from '@/assets/should.png';
import real from '@/assets/real.png';
import leave from '@/assets/leave.png';
import noData from '@/assets/noData.png';

import styles from '../index.less';
import ModuleTitle from '../components/ModuleTitle';
import NumberCollect from '../components/NumberCollect';


const Toll = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [currentData, setCurrentData] = useState<any>([
    {
      title: '收款金额（元',
      num: '--'
    },
    {
      title: '退款金额（元）',
      num: '--'
    }]);
  const [startTime, setStartTime] = useState<any>();
  const [intervalData, setIntervalData] = useState<any>([
    {
      num: '--',
      title: '收款金额（元）'
    }, {
      num: '--',
      title: '退款金额（元）'
    }
  ]);

const handleStartTime = (date: any) => {
  setStartTime(moment(date).format('YYYY-MM-DD'));
}
const handleEndTime = async (date: any) => {
  const totalRes = await getTotalCost({
    XZQHM: currentUser?.XZQHM,
    startDate: startTime,
    endDate: moment(date).format('YYYY-MM-DD')
  });
  setIntervalData([
    {
      num: totalRes.data.sk_amount,
      title: '收款金额（元）'
    }, {
      num: totalRes.data.tk_amount,
      title: '退款金额（元）'
    }
  ]);
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
      agentNum: [],
      trendNum: [],
    };


    const result = await getScreenInfo({
      ...res,
      XZQHM: currentUser?.XZQHM
    });
    if (result.status === 'ok') {
      const { data } = result;
      if (data) {
        defaultData.serviceNum = [
        {
          title: '收款金额（元',
          num: data?.sk_count || 0
        },
        {
          title: '退款金额（元）',
          num: data?.tk_amount || 0
        }];
        defaultData.checkOut = [{
          icon: should,
          title: '应到人数',
          num: data.ydxs_count
        }, {
          icon: real,
          title: '实到人数',
          num: data.sdxs_count
        }, {
          icon: leave,
          title: '请假人数',
          num: data.qjxs_count
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
          defaultData.trendNum.push({
            label: item.XXMC,
            type: '收款金额',
            value: item.sk_count,
          })
          defaultData.trendNum.push({
            label: item.XXMC,
            type: '退款金额',
            value: item.tk_count,
          })
        });
        barConfig.data = defaultData.trendNum;
        defaultData.enrollNum = data.xxbm?.length ? [].map.call(data.xxbm, (item: any) => {
          return {
            school: item.XXMC,
            value: item.bj_count,
          };
        }) : [];
      }
    }
    setCurrentData(defaultData.serviceNum);
  };

  useEffect(() => {
    const res = getTerm();
    getData(res);
  }, []);

  return (
    <div className={styles.toll}>
      <div className={styles.container} style={{ height: '136px' }}>
        <ModuleTitle data='本学期收费总计' />
        <NumberCollect data={currentData} col={currentData?.length} />
      </div>
      <div className={styles.container} style={{ height: '374px' }}>
        <ModuleTitle data='收退款趋势' />
        <div className={styles.chartsContainer}>
          {
            barConfig.data?.length ? <Bar {...barConfig} /> : <Empty
            image={noData}
            imageStyle={{
              height: 80,
            }}
            description={'暂无信息'} />
          }
        </div>
      </div>
      <div className={styles.container} style={{ height: '192px' }}>
        <ModuleTitle data='收费统计查询' showRight={true} />
        <Space direction="vertical" style={{marginTop: '20px'}} size={12}>
          <Row>
            <ConfigProvider locale={locale}>
              <Col span={11}>
                <DatePicker placeholder='请选择开始日期' onChange={handleStartTime} format="YYYY-MM-DD"/>
              </Col>
              <Col span={2}>-</Col>
              <Col span={11}>
                <DatePicker placeholder='请选择结束日期' onChange={handleEndTime} format="YYYY-MM-DD"/>
              </Col>
            </ConfigProvider>
          </Row>
        </Space>
        <Row>
          <Col span={24}>
          <NumberCollect data={intervalData} col={intervalData?.length} />
          </Col>
        </Row>
      </div>
    </div>)
}

export default Toll;

