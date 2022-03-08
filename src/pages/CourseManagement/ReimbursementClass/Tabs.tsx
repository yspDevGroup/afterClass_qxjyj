import React from 'react';
import { Button, Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import SchoolReimbursement from './SchoolReimbursement';
import ServiceUnsubscribe from './ServiceUnsubscribe';
import AfterClassReimbursement from './AfterClassReimbursement';

const { TabPane } = Tabs;
/**
 * 请假管理
 * @returns
 */
const LeaveManagement = (props: any) => {
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
      <Tabs>
        <TabPane tab="课后服务退订" key="1">
          <AfterClassReimbursement state={state} />
        </TabPane>
        <TabPane tab="课程退订" key="2">
          <SchoolReimbursement state={state} />
        </TabPane>
        <TabPane tab="增值服务退订" key="3">
          <ServiceUnsubscribe state={state} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default LeaveManagement;
