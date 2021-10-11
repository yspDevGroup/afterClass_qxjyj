import React, { useContext, useEffect, useState } from 'react';
import myContext from '@/utils/MyContext';
import noData from '@/assets/noCourse.png';
import moment from 'moment';
import styles from '../index.less';
import { Link, useModel } from 'umi';
import { Card, Col, Row, Tabs } from 'antd';
import { topNum } from './utils';
import IconFont from '@/components/CustomIcon';
import ListComp from '../components/ListComponent';
import { homePage } from '@/services/after-class-qxjyj/jyjgsj';

const style = { background: '#0092ff', padding: '8px 0' };

const { TabPane } = Tabs;
const Overview = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { yxkc } = useContext(myContext);
  const [homeData, setHomeData] = useState<any>();
  useEffect(() => {
    async function fetchData() {
      const res = await homePage({
        JYJGSJId: currentUser?.jyjId
      });
      if (res.status === 'ok') {
        console.log('res: ', res);
        const { xxbm, xxkc, kclx, ...rest } = res.data;
        // 配置头部统计栏目数据
        setHomeData({ ...rest });
      };
    }
    fetchData();
  },[])


  const ItemCard = (props: any) => {
    const {title,count,bgImg} = props;
    return (
      <Card className={styles.card} bodyStyle={{paddingTop: 8.8, paddingLeft: 8.8}}>
        <p>{title}</p>
        <p>{count}</p>
        <img className={styles.bgImg} src={bgImg} alt="" />
      </Card>
    )
  }

  return (
    <div className={styles.overview}>
      <Tabs
        centered={false}
      >
        <TabPane tab="本学期概述" key="semester">
          <Row gutter={[8, 8]}>
            {topNum.map((item)=>{
              return <Col className="gutter-row" span={8}>
                      <ItemCard title={item.title} count={homeData?.[item.type]} bgImg={item.bgImg}/>
                    </Col>
            })}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Overview;
