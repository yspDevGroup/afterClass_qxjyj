import { useModel, history } from 'umi';
import { Col, Row, Image, Avatar } from 'antd';
import IconFont from '@/components/CustomIcon';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import styles from './index.less';
import Things from './components/Things';
import Overview from './components/Overview';
import Notice from './components/Notice';
import { defUserImg } from '@/constant';
import { removeOAuthToken } from '@/utils';
import TopBgImg from '@/assets/topInfoBG.png';

const Home = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return (
    <div className={styles.indexPage}>
      <div className={styles.topInfo} style={{ backgroundImage: 'url(' + TopBgImg + ')' }}>
        <Row style={{ height: '74px' }} className={styles.teacherInfo}>
          <Col span={22}>
            <p>
              {currentUser?.XM === '未知' && currentUser.wechatUserId ? (
                <WWOpenDataCom type="userName" openid={currentUser.wechatUserId} />
              ) : (
                currentUser?.XM || currentUser?.username
              )}
              ，您好！
            </p>
            <div>
              <span className={styles.school}> {currentUser?.QYMC || ''}</span>
            </div>
          </Col>
          <Col span={2}>
            <a
              onClick={() => {
                setInitialState({ ...initialState!, currentUser: null });
                removeOAuthToken();
                history.replace(initialState?.buildOptions.authType === 'wechat' ? '/authCallback/overDue' : '/');
              }}
            >
              <IconFont type="icon-tuichu" className={styles.signOut} />
            </a>
          </Col>
        </Row>
      </div>
      <div className={styles.pageContent}>
        <div className={`${styles.noticeArea} ${styles[initialState?.buildOptions.ENV_type || 'dev']}`} />
        <Things />
        <Overview />
        <Notice />
      </div>
    </div>
  );
};

export default Home;
