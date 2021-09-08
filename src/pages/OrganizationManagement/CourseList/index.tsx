import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TableListItem } from '../data';
import styles from '../index.less';
import CannotAccess from '../components/CannotAccess';
import HaveIntroduced from '../components/HaveIntroduced';
import ToIntroduce from '../components/ToIntroduce';

const { TabPane } = Tabs;
const OrganizationManagement = (props: any) => {
  const { state } = props.history.location;
  const [Keys, setKeys] = useState<string>();
  const callback = (key: any) => {
    setKeys(key);
  };
  return (
    <div className={styles.OrganizationManagement}>
      <Tabs defaultActiveKey="YZR" onChange={callback}>
        {state.type ? (
          <></>
        ) : (
          <TabPane tab="已引入课程" key="YZR">
            <HaveIntroduced Keys={Keys} state={state.record} />
          </TabPane>
        )}
        <TabPane tab="待引入课程" key="WZR">
          <ToIntroduce Keys={Keys} state={state.record} type={state?.type} />
        </TabPane>
      </Tabs>
    </div>
  );
};

OrganizationManagement.wrappers = ['@/wrappers/auth'];
export default OrganizationManagement;
