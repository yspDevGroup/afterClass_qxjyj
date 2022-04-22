import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Form, Menu, message, Spin } from 'antd';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useAccess, useModel, history } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import { JYJGSJ, updateJYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { initWXAgentConfig, initWXConfig } from '@/wx';
import BasicInfoModal from '@/components/BasicInfoModal';
import styles from './index.less';
import { getAuthType, removeOAuthToken } from '@/utils';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { isAdmin } = useAccess();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { loading, refresh } = useModel('@@initialState');
  const [wechatReded, setWechatReded] = useState(false);
  const [wechatInfo, setWechatInfo] = useState({
    openId: ''
  });
  const [jyjData, setJyjData] = useState<any>();
  const [key, setKey] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const userRef = useRef(null);
  const [form] = Form.useForm();
  useEffect(() => {
    async function fetchData(jyjId: string) {
      const res = await JYJGSJ({
        id: jyjId
      });
      if (res.status === 'ok') {
        console.log(res, '---------------');
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

  const loadings = (
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
    return loadings;
  }

  const handleOk = async (cityAdcode: any) => {
    const res = await updateJYJGSJ({ id: currentUser!.jyjId! }, cityAdcode);
    if (res.status === 'ok') {
      message.success('保存成功');
      setShowModal(false);
      await refresh();
    } else {
      message.error('保存失败，请联系管理员或稍后再试');
    }
  };

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      console.log('item', event);
      console.log('item', key);
      if (event.key === 'information') {
        setShowModal(true);
        setKey(event.key);
      }
      if (event.key === 'logout' && initialState) {
        const authType = getAuthType();
        localStorage.removeItem('authType');
        setInitialState({ ...initialState, currentUser: null });
        removeOAuthToken();
        history.replace(authType === 'wechat' ? '/authCallback/overDue' : '/');
        return;
      }
    },
    [initialState, setInitialState]
  );

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="information">
        <SettingOutlined />
        基本信息维护
      </Menu.Item>
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
              {/* <WWOpenDataCom type="userName" openid={wechatInfo.openId} /> */}
              {currentUser?.XM || currentUser?.username}
              {isAdmin ? '' : '老师'}
            </span>
          </span>
        </span>
      </HeaderDropdown>
      <BasicInfoModal showModal={showModal} setShowModal={setShowModal} handleOk={handleOk} form={form} />
    </>
  );
};

export default AvatarDropdown;
