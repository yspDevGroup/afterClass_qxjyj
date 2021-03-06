/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-01 08:49:11
 * @LastEditTime: 2021-09-09 11:51:34
 * @LastEditors: Sissle Lynn
 */
import { useEffect, useState } from 'react';
import { Card, Col, message, Row } from 'antd';
import { useModel } from 'umi';
import { RightOutlined } from '@ant-design/icons';
import Topbar from './Topbar';
import List from './List';
import noAnnoce from '@/assets/noAnnoce.png';
import noData from '@/assets/noData.png';
import styles from './index.less';
import { getAllInstitutions, JYJGSJ, toIntroduceCourses, homePage } from '@/services/after-class-qxjyj/jyjgsj';
import { getJYJGTZGG } from '@/services/after-class-qxjyj/jyjgtzgg';
import moment from 'moment';

const Index = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { jyjId } = currentUser!;
  const [homeData, setHomeData] = useState<any>();
  const [dzrjgData, setDzrjgData] = useState<any>([]);
  const [dyrkcData, setDyrkc] = useState<any>([]);
  const [tzggData, setTzggData] = useState<any>([]);
  const [zcggData, setZcggData] = useState<any>([]);

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
        JYJGSJId: currentUser?.jyjId || '',
        XN,
        XQ
      });
      if (res.status === 'ok') {
        const { xxbm, xxkc, kclx, ...rest } = res.data;
        // 配置头部统计栏目数据
        setHomeData({ ...rest });
      }
      const resJYJGSJ = await JYJGSJ({ id: jyjId! });
      if (resJYJGSJ.status === 'ok') {
        //待引入课程
        const dyrkcDataRes = await toIntroduceCourses({
          page: 1,
          pageSize: 3,
          XZQHM: resJYJGSJ.data.XZQH
          // KCMC: param.KCMC
        });
        if (dyrkcDataRes.status === 'ok') {
          setDyrkc(dyrkcDataRes.data?.rows);
        } else {
          message.error(dyrkcDataRes.message);
          return {};
        }

        //待准入机构
        const dzrjgDataRes = await getAllInstitutions({
          ZT: [0],
          LX: 0,
          XZQHM: resJYJGSJ.data.XZQH,
          page: 1,
          pageSize: 3
        });
        if (dzrjgDataRes.status === 'ok') {
          setDzrjgData(dzrjgDataRes.data?.rows);
        } else {
          message.error(dzrjgDataRes.message);
          return {};
        }
      }

      //通知公告
      const tzggDataRes = await getJYJGTZGG({
        BT: '',
        ZT: ['已发布'],
        LX: 0,
        XZQHM: currentUser?.XZQHM,
        page: 1,
        pageSize: 3
      });
      if (tzggDataRes.status === 'ok') {
        setTzggData(tzggDataRes.data?.rows);
      }

      //政策公告
      const zcggRes = await getJYJGTZGG({
        BT: '',
        LX: 1,
        ZT: ['已发布'],
        XZQHM: currentUser?.XZQHM,
        page: 1,
        pageSize: 3
      });
      if (zcggRes.status === 'ok') {
        setZcggData(zcggRes.data?.rows);
      }
    }
    fetchData();
  }, [currentUser]);

  return (
    <div className={styles.pageWrapper}>
      <Topbar data={homeData} />
      <Row className={`${styles.listWrapper} ${styles.rowWrapper}`}>
        <Col span={12}>
          <Card
            title="待准入机构"
            bordered={false}
            extra={
              <a href="/organizationManagement?defaultIndex=WZR">
                更多
                <RightOutlined style={{ fontSize: '12px' }} />
              </a>
            }
          >
            <List
              type="policy"
              data={dzrjgData}
              noDataImg={noAnnoce}
              noDataText="暂无信息"
              detailsPath="/organizationManagement"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="待引入课程"
            bordered={false}
            extra={
              <a href="/courseManagement/courseManagement?defaultIndex=2">
                更多
                <RightOutlined style={{ fontSize: '12px' }} />
              </a>
            }
          >
            <List
              type="policy"
              data={dyrkcData}
              noDataImg={noData}
              noDataText="暂无信息"
              detailsPath="/courseManagement/courseManagement"
            />
          </Card>
        </Col>
      </Row>
      <Row className={`${styles.listWrapper} ${styles.rowWrapper}`}>
        <Col span={12}>
          <Card
            title="通知公告"
            bordered={false}
            extra={
              <a href="/announcements/announcementsList">
                更多
                <RightOutlined style={{ fontSize: '12px' }} />
              </a>
            }
          >
            <List
              type="policy"
              data={tzggData}
              noDataImg={noAnnoce}
              noDataText="暂无信息"
              detailsPath="/announcements/announcementsList/articleDetails"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="政策公告"
            bordered={false}
            extra={
              <a href="/policyIssued/policyIssuedList">
                更多
                <RightOutlined style={{ fontSize: '12px' }} />
              </a>
            }
          >
            <List
              type="policy"
              data={zcggData}
              noDataImg={noData}
              noDataText="暂无信息"
              detailsPath="/policyIssued/policyIssuedList/articleDetails"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Index;
