import React from 'react';
import { Button, Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import CourseOrder from './CourseOrder';
import ServiceOrder from './ServiceOrder';
import AfterClassOrder from './AfterClassOrder';

const { TabPane } = Tabs;
/**
 * 请假管理
 * @returns
 */
const OrderinquiryTabs = (props: any) => {
  const { state } = props.location;

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          history.go(-1);
        }}
        style={{
          marginBottom: '16px'
        }}
      >
        <LeftOutlined />
        返回上一页
      </Button>
      <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>{state?.xxmc}</p>
      <Tabs defaultActiveKey={state?.index ? state?.index : '1'}>
        <TabPane tab="课后服务订单" key="1">
          <AfterClassOrder state={state} />
        </TabPane>
        <TabPane tab="课程订单" key="2">
          <CourseOrder state={state} />
        </TabPane>
        <TabPane tab="增值服务订单" key="3">
          <ServiceOrder state={state} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default OrderinquiryTabs;
