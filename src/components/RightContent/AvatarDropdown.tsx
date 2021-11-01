import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Menu, message, Spin } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAccess, useModel, history } from 'umi';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import HeaderDropdown from '../HeaderDropdown';
import { JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { initWXAgentConfig, initWXConfig, showUserName } from '@/wx';
import styles from './index.less';
import { removeOAuthToken } from '@/utils';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { isAdmin } = useAccess();
  const { initialState, setInitialState } = useModel('@@initialState');
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

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'logout' && initialState) {
        setInitialState({ ...initialState, currentUser: null });
        removeOAuthToken();
        history.replace(initialState.buildOptions.authType === 'wechat' ? '/authCallback/overDue' : '/');
        return;
      }
    },
    [initialState, setInitialState],
  );

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
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
        </span>
      </HeaderDropdown>
    </>
  );
};

export default AvatarDropdown;
