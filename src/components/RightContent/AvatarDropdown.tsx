import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Form, Menu, message, Spin } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAccess, useModel, history } from 'umi';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import HeaderDropdown from '../HeaderDropdown';
import { JYJGSJ, updateJYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { initWXAgentConfig, initWXConfig, showUserName } from '@/wx';
import BasicInfoModal from '@/components/BasicInfoModal'
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

  const handleOk = (cityAdcode: any) => {
    setShowModal(false);
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        form.setFieldsValue(values)
        console.log(values.unitName);
        (async () => {
          if (currentUser?.jyjId) {
            const resUpdateJYJGSJ = await updateJYJGSJ({
              id: currentUser?.jyjId
            }, {
              BMMC: values.unitName,
              BZ: values.introduction,
              XZQH: cityAdcode
            });
            if (resUpdateJYJGSJ.status === 'ok') {
              message.success('操作成功');
            } else {
              message.error('操作失败');
            }
            if (key === 'logout' && initialState) {
              setTimeout(() => {
                setInitialState({ ...initialState, currentUser: null });
                removeOAuthToken();
                history.replace(initialState.buildOptions.authType === 'wechat' ? '/authCallback/overDue' : '/');
                return;
              }, 1000)
            }
          }
        })()
      })
      .catch(info => {
        console.log('校验失败:', info);
      });
  };

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      setShowModal(true);
      setKey(event.key);
    },
    [initialState, setInitialState],
  );

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>

      <Menu.Item key="logout">
        基本信息维护
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
      <BasicInfoModal showModal={showModal} handleOk={handleOk} form={form} />
    </>
  );
};

export default AvatarDropdown;
