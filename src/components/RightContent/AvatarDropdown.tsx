import React, { useEffect, useRef, useState } from 'react';
import { message, Spin } from 'antd';
import { useAccess, useModel } from 'umi';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { initWXAgentConfig, initWXConfig, showUserName } from '@/wx';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { isAdmin } = useAccess();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [wechatReded, setWechatReded] = useState(false);
  const [wechatInfo, setWechatInfo] = useState({
    openId: ''
  });
  const [jyjData, setJyjData] = useState<any>();
  const userRef = useRef(null);
  useEffect(() => {
    async function fetchData(jyjId: string) {
      const res = await JYJGSJ({
        id: jyjId
      });
      if (res.status === 'ok') {
        setJyjData(res.data);
      }
    }
    if (currentUser?.jyjId) {
      fetchData(currentUser?.jyjId);
    }
  }, [currentUser]);
  useEffect(() => {
    (async () => {
      if (/MicroMessenger/i.test(navigator.userAgent)) {
        await initWXConfig(['checkJsApi']);
      }
      if (await initWXAgentConfig(['checkJsApi'])) {
        setWechatReded(true);
      } else {
        console.warn('微信登录过期，请重新授权');
        message.warn('微信登录过期，请重新授权');
      }
    })();
  }, [currentUser]);

  useEffect(() => {
    wechatReded &&
      setWechatInfo({
        openId: currentUser?.UserId || ''
      });
  }, [wechatReded]);

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
        {jyjData ? (
          <span style={{ paddingRight: '40px' }}>
            {jyjData?.JYJTB && jyjData?.JYJTB.startsWith('http') ? (
              <img style={{ width: '40px', height: '40px', borderRadius: '40px' }} src={jyjData?.JYJTB} />
            ) : (
              ''
            )}{' '}
            {jyjData?.BMMC}
          </span>
        ) : (
          ''
        )}
        <span className={`${styles.name} anticon`} ref={userRef}>
          <WWOpenDataCom type="userName" openid={wechatInfo.openId} />
          {/* {currentUser?.username} */}
          {isAdmin ? '' : '老师'}
        </span>
      </span>
    </>
  );
};

export default AvatarDropdown;
