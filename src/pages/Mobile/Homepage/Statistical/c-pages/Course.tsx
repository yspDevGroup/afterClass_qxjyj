import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Pie, Bar } from '@ant-design/charts';

import { getTerm, pieConfig, barConfig, proportionConfig } from '../utils';
import { getScreenInfo, homePage } from '@/services/after-class-qxjyj/jyjgsj';

import noData from '@/assets/noData.png';

import styles from '../index.less';
import ModuleTitle from '../components/ModuleTitle';
import NumberCollect from '../components/NumberCollect';
import { Empty } from 'antd';
import moment from 'moment';

const course = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [currentData, setCurrentData] = useState<any>();

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
      courseCollect: [],
      courseNum: [],
      proportionNum: []
    };
    const resProportion = await homePage({
      JYJGSJId: currentUser?.jyjId,
      XN,
      XQ
    });
    if (resProportion.status === 'ok') {
      const { xxkc_count, jgkc_count } = resProportion.data;
      const sum = xxkc_count + jgkc_count;
      defaultData.proportionNum.push({
        type: '学校课程',
        value: parseFloat(((xxkc_count / sum) * 100).toFixed(2))
      });
      defaultData.proportionNum.push({
        type: '机构课程',
        value: parseFloat(((jgkc_count / sum) * 100).toFixed(2))
      });
      proportionConfig.data = defaultData.proportionNum;
    }
    const result = await getScreenInfo({
      ...res,
      XZQHM: currentUser?.XZQHM
    });
    if (result.status === 'ok') {
      const { data } = result;
      if (data) {
        data.kclx?.length &&
          data.kclx.forEach((item: { KCTAG: any; count: any }) => {
            if (item.count !== 0) {
              defaultData.courseCollect.push({
                type: item.KCTAG,
                value: parseFloat(item.count)
              });
            }
          });
        pieConfig.data = defaultData.courseCollect;
        data.xxkc?.length &&
          data.xxkc.forEach((item: { xxkc_count: any; jgkc_count: any; XXMC: any; count: any }) => {
            if (item.count !== 0) {
              defaultData.courseNum.push({
                label: item.XXMC,
                type: '学校课程',
                value: parseFloat(item.xxkc_count)
              });
              defaultData.courseNum.push({
                label: item.XXMC,
                type: '机构课程',
                value: parseFloat(item.jgkc_count)
              });
            }
          });

        barConfig.data = defaultData.courseNum;
      }
    }
    setCurrentData(defaultData);
  };

  useEffect(() => {
    const res = getTerm();
    getData(res);
  }, []);

  return (
    <div className={styles.course}>
      <div className={styles.container} style={{ height: '355px' }}>
        <ModuleTitle data="课程类型分布" />
        <div className={styles.chartsContainer}>
          {pieConfig.data && pieConfig.data?.length !== 0 ? (
            <Pie {...pieConfig} />
          ) : (
            <Empty
              image={noData}
              imageStyle={{
                minHeight: 200
              }}
              style={{ minHeight: 355 }}
              description={'暂无课程类型信息'}
            />
          )}
        </div>
      </div>
      <div className={styles.container} style={{ height: '355px' }}>
        <ModuleTitle data="学校、机构课程对比" />
        <div className={styles.chartsContainer}>
          {proportionConfig.data && proportionConfig.data?.length !== 0 ? (
            <Pie
              {...proportionConfig}
              tooltip={{
                formatter: (datum: any) => {
                  console.log(datum);
                  return { name: datum.type, value: datum.value + '%' };
                }
              }}
            />
          ) : (
            <Empty
              image={noData}
              imageStyle={{
                minHeight: 200
              }}
              style={{ minHeight: 355 }}
              description={'暂无课程对比信息'}
            />
          )}
        </div>
      </div>
      <div className={styles.container} style={{ height: '413px' }}>
        <ModuleTitle data="各校课程数" showRight={false} />
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
              description={'暂无课程数信息'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default course;
