import { Tabs } from 'antd';
import IconFont from '@/components/CustomIcon';
import Apply from './c-pages/Apply'
import Attendance from './c-pages/Attendance'
import Course from './c-pages/Course'
import Toll from './c-pages/Toll'

const { TabPane } = Tabs;
import styles from './index.less';
import { useState } from 'react';

const Statistical = () => {
  const [activeKey, setActiveKey] = useState<string>('1');

  return (
  <div className={styles.statisticalPage}>
    <div className={styles.topText}>
      <span>
        2021-2022学年 第一学期
      </span>
      <Tabs className={styles.theTabs} destroyInactiveTabPane={true} onTabClick={(key: string) => {
              setActiveKey(key)}} type="card" centered>
        <TabPane tab={
        <div>
          <IconFont className={styles.iconStyle}
                    type={'icon-baoming'}/>
            <span>报名</span>
        </div>
      } key="1">
          <Apply/>
        </TabPane>
        <TabPane tab={
        <div>
          <IconFont className={styles.iconStyle}
                    type={'icon-shoufei'}/>
          <span>收费</span>
        </div>
      } key="2">
          <Toll/>
        </TabPane>
        <TabPane tab={
        <div>
          <IconFont className={styles.iconStyle}
                    type={'icon-kaoqin'}/>
          <span>考勤</span>
        </div>
      } key="3">
          <Attendance/>
        </TabPane>
        <TabPane tab={
        <div>
          <IconFont className={styles.iconStyle}
                    type={'icon-kecheng'}/>
          <span>课程</span>
        </div>
      } key="4">
          <Course/>
        </TabPane>
      </Tabs>
    </div>
  </div>)
}

export default Statistical;
