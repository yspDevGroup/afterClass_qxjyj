import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useAccess, useModel } from 'umi';
import styles from './index.less';
import { JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { isAdmin } = useAccess();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [jyjData, setJyjData] = useState<any>();
  useEffect(() => {
    async function fetchData(jyjId: string) {
      const res = await JYJGSJ({
        id: jyjId
      })
      if (res.status === 'ok') {
        setJyjData(res.data);
      }
    }
    if (currentUser?.jyjId) {
      fetchData(currentUser?.jyjId);
    }
  }, [currentUser]);
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </span>
  );
  if (!initialState) {
    return loading;
  }
  return (
    <>
      <span className={`${styles.action}`}>
        {jyjData ? <span style={{paddingRight:'40px'}}>
          {jyjData?.BMMC}
        </span> : ''}
        <span className={`${styles.name} anticon`}>
          {currentUser?.username}
          {isAdmin ? '' : '老师'}
        </span>
      </span>
    </>
  );
};

export default AvatarDropdown;
