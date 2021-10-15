import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Pie, Bar } from '@ant-design/charts';

import { getTerm, pieConfig, barConfig, proportionConfig} from '../utils';
import { getScreenInfo, homePage } from '@/services/after-class-qxjyj/jyjgsj';

import noData from '@/assets/noData.png';

import styles from '../index.less';
import ModuleTitle from '../components/ModuleTitle';
import NumberCollect from '../components/NumberCollect';
import { Empty } from 'antd';



const course = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [currentData, setCurrentData] = useState<any>();

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
      proportionNum: []
    };
    const resProportion = await homePage({
      JYJGSJId: currentUser?.jyjId
    });
    if (resProportion.status === 'ok') {
      const { xxkc_count, jgkc_count} = resProportion.data;
      const sum = xxkc_count + jgkc_count;
      defaultData.proportionNum.push({
        type: '学校课程',
        value: xxkc_count / sum * 100,
      });
      defaultData.proportionNum.push({
        type: '机构课程',
        value: jgkc_count / sum * 100,
      });
      proportionConfig.data = defaultData.proportionNum;
    };
    const result = await getScreenInfo({
      ...res,
      XZQHM: currentUser?.XZQHM
    });
    if (result.status === 'ok') {
      const { data } = result;
      if (data) {
        data.kclx?.length && data.kclx.forEach((item: { KCTAG: any; count: any; }) => {
          if (item.count !== 0) {
            defaultData.courseCollect.push({
              type: item.KCTAG,
              value: item.count
            })
          }
        });
        pieConfig.data = defaultData.courseCollect;
        data.xxkc?.length && data.xxkc.forEach((item: { xxkc_count: any; jgkc_count: any; XXMC: any; count: any; }) => {
          if (item.count !== 0) {
            defaultData.courseNum.push({
              label: item.XXMC,
              type: '学校课程',
              value: item.xxkc_count,
            },)
            defaultData.courseNum.push({
              label: item.XXMC,
              type: '机构课程',
              value: item.jgkc_count,
            },)
          }
        });

        barConfig.data = defaultData.courseNum;

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
    <div className={styles.container} style={{height: '282px'}}>
      <ModuleTitle data='课程类型分布'/>
      <div className={styles.chartsContainer}>
      {
          (pieConfig.data && pieConfig.data?.length!==0) ? <Pie {...pieConfig} /> : <Empty
          image={noData}
          imageStyle={{
            height: 80,
          }}
          description={'暂无信息'} />
        }
      </div>
    </div>
    <div className={styles.container} style={{height: '355px'}}>
      <ModuleTitle data='学校、机构课程对比'/>
      <div className={styles.chartsContainer}>
      {
          (proportionConfig.data && proportionConfig.data?.length!==0) ? <Pie {...proportionConfig} /> : <Empty
          image={noData}
          imageStyle={{
            height: 80,
          }}
          description={'暂无信息'} />
        }
      </div>
    </div>
    <div className={styles.container} style={{height: '413px'}}>
      <ModuleTitle data='各校课程数' showRight={false}/>
      <div className={styles.chartsContainer}>
        {
          (barConfig.data && barConfig.data?.length!==0) ? <Bar {...barConfig} /> : <Empty
          image={noData}
          imageStyle={{
            height: 80,
          }}
          description={'暂无信息'} />
        }
      </div>
    </div>
  </div>)
}

export default course;
