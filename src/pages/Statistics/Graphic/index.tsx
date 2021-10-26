import { useModel } from 'umi';
import { Row, Col } from 'antd';
import NumberCollect from './component/NumberCollect';
import { getTerm, mock, textColor1, textColor2 } from './component/utils';
import PieChart from './component/PieChart';
import List from './component/List';
import ColumnChart from './component/ColumnChart';
import BarChart from './component/BarChart';
import { useEffect, useState } from 'react';
import { getScreenInfo } from '@/services/after-class-qxjyj/jyjgsj';

import bgImg from '@/assets/dispalyBgc.jpg';
import headerImg from '@/assets/headLine.png';
import should from '@/assets/should.png';
import real from '@/assets/real.png';
import leave from '@/assets/leave.png';

import styles from './index.less';

const ChartsPage = (props: any) => {
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
          num: Number((data?.jgjs_count || 0) + (data?.xxjs_count || 0)).toFixed(2)
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
        });
        defaultData.enrollNum = data.xxbm?.length ? [].map.call(data.xxbm, (item: any) => {
          return {
            school: item.XXMC,
            value: item.xs_count,
          };
        }) : [];
      }
    }
    setCurrentData(defaultData);
  };
  useEffect(() => {
    const res = getTerm();
    getData(res);
    // setCurrentData(mock);
  }, []);

  return (
    <div className={styles.diaplayBox} style={{ backgroundImage: `url(${bgImg})` }}>
      {/* 头部 */}
      <div className={styles.diaplayTop} style={{ backgroundImage: `url(${headerImg})` }}>
        课后服务数据大屏
      </div>
      <div className={styles.content} style={{ marginTop: '2vh', padding: '0 1vh', }}>
        <Row className={styles.bodyRow}>
          <Col span={7} className={styles.diaplay1} >
            <div>
              <span className={styles.boxfoot} />
              <header>
                课后服务情况
              </header>
              <div className={styles.container}>
                <NumberCollect data={currentData?.serviceNum} color={textColor1} />
              </div>
            </div>
            <div>
              <span className={styles.boxfoot} />
              <header>
                各类课程开设情况
              </header>
              <div className={styles.container}>
                <PieChart data={currentData?.courseCollect} />
              </div>
            </div>
            <div>
              <span className={styles.boxfoot} />
              <header>
                今日学生出勤情况
              </header>
              <div className={styles.container}>
                <NumberCollect data={currentData?.checkOut} col={3} color={textColor2} />
              </div>
            </div>
          </Col>
          <Col span={10} className={styles.diaplay2} >
            <div>
              <span className={styles.boxfoot} />
              <div className={styles.container}>
                <NumberCollect data={currentData?.numCollect} col={3} reverse={true} />
              </div>
            </div>
            <div>
              <span className={styles.boxfoot} />
              <header>
                开设服务学校
              </header>
              <div className={styles.container}>
                <List col={3} data={currentData?.schoolNum} />
              </div>
            </div>
            <div>
              <span className={styles.boxfoot} />
              <header>
                本学期各校开课情况
              </header>
              <div className={styles.container}>
                <ColumnChart data={currentData?.courseNum} />
              </div>
            </div>
          </Col>
          <Col span={7} className={styles.diaplay3} >
            <div>
              <span className={styles.boxfoot} />
              <header>
                各校报名情况
              </header>
              <div className={styles.container}>
                <BarChart data={currentData?.enrollNum} />
              </div>
            </div>
            <div>
              <span className={styles.boxfoot} />
              <header>
                开设服务机构
              </header>
              <div className={styles.container}>
                <List data={currentData?.agentNum} />
              </div>
            </div>
          </Col>
        </Row>

      </div>

    </div>

  )
}
ChartsPage.wrappers = ['@/wrappers/auth'];
export default ChartsPage
