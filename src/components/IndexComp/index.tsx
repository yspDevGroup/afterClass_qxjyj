/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-01 08:49:11
 * @LastEditTime: 2021-09-02 17:02:28
 * @LastEditors: Sissle Lynn
 */
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { useModel } from 'umi';
import { RightOutlined } from '@ant-design/icons';
import Topbar from './Topbar';
import List from './List';
import ColumnChart from './ColumnChart';
import noAnnoce from '@/assets/noAnnoce.png';
import noCourse from '@/assets/noCourse.png';

import styles from './index.less';
import { homePage } from '@/services/after-class-qxjyj/jyjgsj';
import PieChart from './PieChart';
import LineChart from './LineChart';


const Index = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [homeData, setHomeData] = useState<any>();
  const [xxkcData, setXxkcData] = useState<any>([]);
  const [kclxData, setKclxData] = useState<any>();
  const [xxbmData, setXxbmData] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await homePage({
        JYJGSJId: currentUser?.jyjId
      });
      if (res.status === 'ok') {
        const { xxbm, xxkc, kclx, ...rest } = res.data;
        // 配置头部统计栏目数据
        setHomeData({ ...rest });
        // 配置各校开课数量数据
        if (xxkc?.length) {
          const newXxkc = [].map.call(xxkc, (item: any) => {
            return {
              type: item.XXMC,
              value: item.KHKCSJs.length + item.KHKCSQs.length
            }
          });
          setXxkcData(newXxkc);
        }
        // 配置课程类型占比数据
        if (kclx?.length) {
          const newKclx = [].map.call(kclx, (item: any) => {
            return {
              type: item.KCTAG,
              value: item.count
            }
          });
          setKclxData(newKclx);
        }
        // 配置各校报名情况数据
        if (xxbm?.length) {
          const newXxbm = [].map.call(xxbm, (item: any) => {
            return {
              category: "报名人数",
              type: item.XXMC,
              value: item.count
            }
          });
          setXxbmData(newXxbm);
        }
      };
    };
    fetchData();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Topbar data={homeData} />
      <Row gutter={[24, 24]} className={styles.chartWrapper}>
        <Col span={12}>
          <Card title="各校开课数量" bordered={false}>
            <ColumnChart data={xxkcData} color='#6186EE' />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="课程类型占比" bordered={false}>
            <PieChart data={kclxData} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]} className={styles.chartWrapper}>
        <Col span={24}>
          <Card title="各校报名情况" bordered={false}>
            <LineChart data={xxbmData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Index;
