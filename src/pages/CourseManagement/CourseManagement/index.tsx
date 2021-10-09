import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import CoursesIntroduced from './components/CoursesIntroduced';
import LocalCourses from './components/LocalCourses';
import classes from './index.less';
import { JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { useModel, history } from 'umi';
const { TabPane } = Tabs;
/**
 * 课程管理
 * @returns
 */
const index = (props: any) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { defaultIndex } = props.history.location.query;
  const [JYYData, setXZQH] = useState<any>();
  const [reload, setReload] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const res = await JYJGSJ({ id: currentUser?.jyjId || '' });
      if (res.status === 'ok') {
        setXZQH(res.data);
      }
    })();
  }, []);
  const callback = (key: any) => {
    setReload(key === '1');
  };
  return (
    <div className={classes.content}>
      <Tabs defaultActiveKey={defaultIndex || 1} onChange={callback}>
        <TabPane tab="本区课程" key="1">
          {JYYData ? <LocalCourses JYYData={JYYData} reload={reload} /> : ''}
        </TabPane>
        <TabPane tab="待引入课程" key="2">
          {JYYData ? <CoursesIntroduced JYYData={JYYData} reload={reload} /> : ''}
        </TabPane>
      </Tabs>
    </div>
  );
};

index.wrappers = ['@/wrappers/auth'];
export default index;
