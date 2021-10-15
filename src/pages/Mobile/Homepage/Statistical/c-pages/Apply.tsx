import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Bar } from '@ant-design/charts';

import { getTerm, barConfig } from '../utils';
import { getScreenInfo, homePage } from '@/services/after-class-qxjyj/jyjgsj';

import should from '@/assets/should.png';
import real from '@/assets/real.png';
import leave from '@/assets/leave.png';

import styles from '../index.less';
import ModuleTitle from '../components/ModuleTitle';
import NumberCollect from '../components/NumberCollect';



const apply = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [currentData, setCurrentData] = useState<any>({applyNum:[{
    num: '--',
    title: '报名人次'
  }, {
    num: '--',
    title: '参与学生'
  }]});

  const data = [
    {
      num: '1234567',
      title: '报名人次'
    }, {
      num: '1234',
      title: '参与学生'
    }, {
      num: '12345',
      title: '学生总数'
    }
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
      agentNum: [],
      applyNum: [],
      conditionNum: [],
    };
    const applyRes = await homePage({
      JYJGSJId: currentUser?.jyjId
    });
    if (applyRes.status === 'ok') {
      const { xxbm, xxkc, kclx, xsbj_count, xsNum, ...rest } = applyRes.data;

      defaultData.applyNum = [{
        num: xsbj_count,
        title: '报名人次'
      }, {
        num: xsNum,
        title: '参与学生'
      }];
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

        data.xxbm?.length && data.xxbm.forEach((item: any) => {
          defaultData.conditionNum.push({
            label: item.XXMC,
            type: '报名人次',
            value: item.xsbj_count,
          });
          defaultData.conditionNum.push({
            label: item.XXMC,
            type: '参与学生',
            value: item.xs_count,
          })
        });
      }
      barConfig.data = defaultData.conditionNum;
      setCurrentData(defaultData);
    }
  };

  useEffect(() => {
    const res = getTerm();
    getData(res);
  }, []);

  return (
    <div className={styles.apply}>
      <div className={styles.container} style={{ height: '136px' }}>
        <ModuleTitle data='报名统计' />
        <NumberCollect data={currentData?.applyNum} col={currentData?.applyNum.length} />
      </div>
      <div className={styles.container} style={{ height: '482px' }}>
        <ModuleTitle data='各校报名情况' showRight={true} />
        <div className={styles.chartsContainer}>
          {
            barConfig.data ? <Bar {...barConfig} /> : ''
          }
        </div>
      </div>
    </div>)
}

export default apply;
