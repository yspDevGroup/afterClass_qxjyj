import React, { useContext, useEffect, useState } from 'react';
import myContext from '@/utils/MyContext';
import noData from '@/assets/noCourse.png';
import moment from 'moment';
import styles from '../index.less';
import { Link } from 'umi';
import { Col, Row, Tabs } from 'antd';
import IconFont from '@/components/CustomIcon';
import ListComp from '../components/ListComponent';

const style = { background: '#0092ff', padding: '8px 0' };

const { TabPane } = Tabs;
const Overview = () => {
  const { yxkc } = useContext(myContext);
  const [dataSource, setDataSource] = useState<any>();
  const [allDataSource, setAllDataSource] = useState<any>();
  // const getDataList = (data: any) => {
  //   return [].map.call(data, (item: any) => {
  //     return {
  //       id: item.id,
  //       title: `${item.KHKCSJ.KCMC} - ${item.BJMC}`,
  //       img: item.KCTP ? item.KCTP : item.KHKCSJ.KCTP,
  //       link: `/teacher/home/courseIntro?classid=${item.id}`,
  //       desc: [
  //         {
  //           left: [
  //             `课程时段：${
  //               item.KKRQ
  //                 ? moment(item.KKRQ).format('YYYY.MM.DD')
  //                 : moment(item.KHKCSJ.KKRQ).format('YYYY.MM.DD')
  //             }-${
  //               item.JKRQ
  //                 ? moment(item.JKRQ).format('YYYY.MM.DD')
  //                 : moment(item.KHKCSJ.JKRQ).format('YYYY.MM.DD')
  //             }`,
  //           ],
  //         },
  //         {
  //           left: [`共${item.KSS}课时`],
  //         },
  //       ],
  //       introduction: item.KHKCSJ.KCMS,
  //     };
  //   });
  // };
  // useEffect(() => {
  //   const newData = {
  //     type: 'picList',
  //     cls: 'picList',
  //     list: yxkc ? getDataList(yxkc).slice(0, 3) : [],
  //     noDataText: '暂无课程',
  //     noDataImg: noData,
  //   };
  //   setAllDataSource(yxkc ? getDataList(yxkc) : []);
  //   // setDataSource();
  //   console.log('newData: ', newData);
  // }, [yxkc]);
  return (
    <div>
      <Tabs
        centered={false}
      >
        <TabPane tab="本学期概述" key="elective">
          <Row gutter={[8, 8]}>
            <Col className="gutter-row" span={8}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div style={style}>col-6</div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Overview;
