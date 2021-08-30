import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import CoursesIntroduced from './components/CoursesIntroduced';
import LocalCourses from './components/LocalCourses';
import classes from "./index.less";
import { JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { useModel } from '@/.umi/plugin-model/useModel';
const { TabPane } = Tabs;
/**
 * 课程管理
 * @returns
 */
const index = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [JYYData, setXZQH] = useState<any>();
  useEffect(() => {
    (
      async ()=>{
        const res = await JYJGSJ({id: currentUser?.jyjId || ''});
        if(res.status === 'ok'){
          setXZQH(res.data);
        }
      }

    )()
  }, [])
  const callback = (key: any) => {
    console.log(key);
  }
  return (
    <div className={classes.content}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="本区课程" key="1">
          {
            JYYData ?
              <LocalCourses JYYData={JYYData}/>
            :''
          }
        </TabPane>
        <TabPane tab="待引入课程" key="2">
          {
            JYYData ?
              <CoursesIntroduced JYYData={JYYData}/>
            :''
          }
        </TabPane>
      </Tabs>
    </div>
  )
}

export default index;
