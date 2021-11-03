import React from 'react';
import { Button, Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import StudentsLeave from './SchoolLeave';
import TeacherLeave from './TeacherLeave';

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
        <TabPane tab="教师请假" key="1">
          <TeacherLeave state={state} />
        </TabPane>
        <TabPane tab="学生请假" key="2">
          <StudentsLeave state={state} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default LeaveManagement;
