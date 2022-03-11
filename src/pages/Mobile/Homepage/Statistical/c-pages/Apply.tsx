import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Bar } from '@ant-design/charts';

import { getTerm, barConfig } from '../utils';
import { getScreenInfo, homePage } from '@/services/after-class-qxjyj/jyjgsj';

import noData from '@/assets/noData.png';

import styles from '../index.less';
import ModuleTitle from '../components/ModuleTitle';
import NumberCollect from '../components/NumberCollect';
import { Empty } from 'antd';
import moment from 'moment';

const apply = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [currentData, setCurrentData] = useState<any>({
    applyNum: [
      {
        num: '--',
        title: '报名人次'
      },
      {
        num: '--',
        title: '参与学生'
      }
    ]
  });

  const data = [
    {
      num: '1234567',
      title: '报名人次'
    },
    {
      num: '1234',
      title: '参与学生'
    },
    {
      num: '12345',
      title: '学生总数'
    }
  ];
  const getData = async (res: any) => {
    let XN = '';
    let XQ = '';
    if (Number(moment(new Date()).format('MM')) > 2 && Number(moment(new Date()).format('MM')) < 9) {
      XQ = '第二学期';
    } else {
      XQ = '第一学期';
    }
    if (Number(moment(new Date()).format('MM')) > 8) {
      XN = `${Number(moment(new Date()).format('YYYY'))}-${Number(moment(new Date()).format('YYYY')) + 1}`;
    } else {
      XN = `${Number(moment(new Date()).format('YYYY')) - 1}-${Number(moment(new Date()).format('YYYY'))}`;
    }
    const defaultData: any = {
      applyNum: [],
      conditionNum: []
    };
    const applyRes = await homePage({
      JYJGSJId: currentUser?.jyjId,
      XN,
      XQ
    });
    if (applyRes.status === 'ok') {
      const { xxbm, xxkc, kclx, xsbj_count, xsNum, ...rest } = applyRes.data;

      defaultData.applyNum = [
        {
          num: xsbj_count,
          title: '报名人次'
        },
        {
          num: xsNum,
          title: '参与学生'
        }
      ];
    }

    const result = await getScreenInfo({
      ...res,
      XZQHM: currentUser?.XZQHM
    });
    if (result.status === 'ok') {
      const { data } = result;
      if (data) {
        data.xxbm?.length &&
          data.xxbm.forEach((item: any) => {
            defaultData.conditionNum.push({
              label: item.XXMC,
              type: '报名人次',
              value: parseInt(item.xsbj_count)
            });
            defaultData.conditionNum.push({
              label: item.XXMC,
              type: '参与学生',
              value: parseInt(item.xs_count)
            });
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
        <ModuleTitle data="报名统计" showRight={false} />
        <NumberCollect data={currentData?.applyNum} col={currentData?.applyNum.length} />
      </div>
      <div className={styles.container} style={{ height: '482px' }}>
        <ModuleTitle data="各校报名情况" showRight={false} />
        <div className={styles.chartsContainer}>
          {barConfig.data && barConfig.data?.length !== 0 ? (
            <Bar {...barConfig} />
          ) : (
            <Empty
              image={noData}
              imageStyle={{
                minHeight: 230
              }}
              style={{ minHeight: 355 }}
              description={'暂无报名信息'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default apply;
