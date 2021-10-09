import React, { useState } from 'react';
import { Button, Tabs } from 'antd';
import styles from './index.less';
import Blacklist from './components/Blacklist';
import HaveAccess from './components/HaveAccess';
import CannotAccess from './components/CannotAccess';
import { history } from 'umi';

const { TabPane } = Tabs;
const OrganizationManagement = (props: any) => {
  const [Keys, setKeys] = useState<string>();
  const { defaultIndex } = props.history.location.query;
  const callback = (key: any) => {
    setKeys(key);
  };
  return (
    <div className={styles.OrganizationManagement}>
      <Tabs defaultActiveKey={defaultIndex || "YZR"} onChange={callback}>
        <TabPane tab="已准入机构" key="YZR">
          <HaveAccess Keys={Keys} />
        </TabPane>
        <TabPane tab="待准入机构" key="WZR">
          <CannotAccess Keys={Keys} />
        </TabPane>
        <TabPane tab="黑名单" key="HMD">
          <Blacklist Keys={Keys} />
        </TabPane>
      </Tabs>
      <span
        className={styles.LSJL}
        onClick={() => {
          history.push('/organizationManagement/historys');
        }}
      >
        历史记录
      </span>
    </div>
  );
};

OrganizationManagement.wrappers = ['@/wrappers/auth'];
export default OrganizationManagement;
