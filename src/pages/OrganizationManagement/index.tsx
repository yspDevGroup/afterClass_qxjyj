import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TableListItem } from './data';
import styles from './index.less';
import Blacklist from './components/Blacklist';
import HaveAccess from './components/HaveAccess';
import Historys from './components/Historys';
import CannotAccess from './components/CannotAccess';

const { TabPane } = Tabs;
const OrganizationManagement = () => {
  const [Keys, setKeys] = useState<string>();

  const callback = (key: any) => {
    setKeys(key);
  };
  return (
    <div className={styles.OrganizationManagement}>
      <Tabs defaultActiveKey="YZR" onChange={callback}>
        <TabPane tab="已准入机构" key="YZR">
          <HaveAccess Keys={Keys} />
        </TabPane>
        <TabPane tab="未准入机构" key="WZR">
          <CannotAccess Keys={Keys} />
        </TabPane>
        <TabPane tab="黑名单" key="HMD">
          <Blacklist Keys={Keys} />
        </TabPane>
        <TabPane tab="历史记录" key="LSJL">
          <Historys Keys={Keys} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OrganizationManagement;
