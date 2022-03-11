import { useEffect, useState } from 'react';
import styles from '../index.less';
import { useModel } from 'umi';
import { Card, Col, Row, Tabs } from 'antd';
import { topNum } from './utils';
import { homePage } from '@/services/after-class-qxjyj/jyjgsj';
import moment from 'moment';

const { TabPane } = Tabs;
const Overview = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [homeData, setHomeData] = useState<any>();
  useEffect(() => {
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
    async function fetchData() {
      const res = await homePage({
        JYJGSJId: currentUser?.jyjId,
        XN,
        XQ
      });
      if (res.status === 'ok') {
        const { xxbm, xxkc, kclx, ...rest } = res.data;
        // 配置头部统计栏目数据
        setHomeData({ ...rest });
      }
    }
    fetchData();
  }, []);

  const ItemCard = (props: any) => {
    const { title, count, bgImg, zzfw } = props;

    return (
      <Card
        className={styles.card}
        bordered={false}
        bodyStyle={{ paddingTop: 8.8, paddingLeft: 8.8, minHeight: '101.7px' }}
      >
        <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</p>
        <p>
          {title.indexOf('元') !== -1
            ? title.indexOf('收费') !== -1
              ? ((count || 0) + (zzfw || 0)).toFixed(2)
              : parseFloat(count || 0).toFixed(2)
            : count || 0}
        </p>
        <img className={styles.bgImg} src={bgImg} alt="" />
      </Card>
    );
  };

  return (
    <div className={styles.overview}>
      <Tabs centered={false}>
        <TabPane tab="本学期概述" key="semester">
          <Row gutter={[8, 8]}>
            {topNum.map((item) => {
              return (
                <Col className="gutter-row" span={8}>
                  <ItemCard
                    title={item.title}
                    count={
                      item.type === 'xsNum' && Number(homeData?.[item.type]) + Number(homeData?.khfwxs_count)
                        ? Number(homeData?.[item.type]) + Number(homeData?.khfwxs_count)
                        : homeData?.[item.type]
                    }
                    bgImg={item.bgImg}
                    key={item.title}
                    zzfw={homeData?.zzfw_amount ? homeData?.zzfw_amount : 0}
                  />
                </Col>
              );
            })}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Overview;
