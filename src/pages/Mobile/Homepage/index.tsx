import React, { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import { Tabs } from 'antd';
import IconFont from '@/components/CustomIcon';
import Home from './Home';
import Statistical from './Statistical';
import styles from './index.less';
import myContext from '@/utils/MyContext';

const { TabPane } = Tabs;
const Homepage = () => {
  const { initialState } = useModel('@@initialState');
  const [activeKey, setActiveKey] = useState<string>('index');
  const homeRef = useRef(null);
  const eduRef = useRef(null);
  const mineRef = useRef(null);

  return (
    <div className={styles.mobilePageHeader}>
      {/* <myContext.Provider value={{ ...dataSource, courseStatus, currentUserInfo: currentUser }}> */}
          <Tabs
            tabPosition="bottom"
            className={styles.menuTab}
            onTabClick={(key: string) => {
              setActiveKey(key);
              if (homeRef.current) ((homeRef.current as unknown) as HTMLElement).scrollTop = 0;
              if (eduRef.current) ((eduRef.current as unknown) as HTMLElement).scrollTop = 0;
              if (mineRef.current) ((mineRef.current as unknown) as HTMLElement).scrollTop = 0;
            }}
            activeKey={activeKey}
          >
            <TabPane
              tab={
                <span>
                  <IconFont
                    style={{ fontSize: '16px' }}
                    type={activeKey === 'index' ? 'icon-zhuyefill' : 'icon-zhuye'}
                  />
                  首页
                </span>
              }
              key="index"
            >
              <div
                className={styles.noScrollBar}
                style={{ height: '100%', overflowY: 'auto' }}
                ref={homeRef}
              >
                <Home />
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <IconFont
                    style={{ fontSize: '16px' }}
                    type={activeKey === 'mine' ? 'icon-wodefill' : 'icon-wode'}
                  />
                  统计
                </span>
              }
              key="mine"
            >
              <div
                className={styles.noScrollBar}
                style={{ height: '100%', overflowY: 'auto' }}
                ref={mineRef}
              >
                <Statistical />
              </div>
            </TabPane>
          </Tabs>
        {/* </myContext.Provider> */}
    </div>
  )
}

export default Homepage;
