import React, { useContext, useEffect, useState } from 'react';
import myContext from '@/utils/MyContext';
import noData from '@/assets/noCourse.png';
import moment from 'moment';
import styles from '../index.less';
import { JYJGSJ, toIntroduceCourses } from '@/services/after-class-qxjyj/jyjgsj';
import { Link, useModel } from 'umi';
import { message, Tabs } from 'antd';
import IconFont from '@/components/CustomIcon';
import ListComp from '../components/ListComponent';
import { getJYJGTZGG } from '@/services/after-class-qxjyj/jyjgtzgg';

const { TabPane } = Tabs;
const Things = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { jyjId } = currentUser!;
  const { yxkc } = useContext(myContext);
  const [dataSource, setDataSource] = useState<any>();
  const [dataTZGG, setTZGGData] = useState<any>();
  const [dataZCGG, setZCGGData] = useState<any>();
  const [allDataSource, setAllDataSource] = useState<any>();

  const getDataList = (data: any) => {
    return [].map.call(data, (item: any) => {
      return {
        id: item.id,
        title: `${item.KHKCSJ.KCMC} - ${item.BJMC}`,
        img: item.KCTP ? item.KCTP : item.KHKCSJ.KCTP,
        link: `/teacher/home/courseIntro?classid=${item.id}`,
        desc: [
          {
            left: [
              `课程时段：${item.KKRQ
                ? moment(item.KKRQ).format('YYYY.MM.DD')
                : moment(item.KHKCSJ.KKRQ).format('YYYY.MM.DD')
              }-${item.JKRQ
                ? moment(item.JKRQ).format('YYYY.MM.DD')
                : moment(item.KHKCSJ.JKRQ).format('YYYY.MM.DD')
              }`,
            ],
          },
          {
            left: [`共${item.KSS}课时`],
          },
        ],
        introduction: item.KHKCSJ.KCMS,
      };
    });
  };
  useEffect(() => {
    async function fetchData() {
      const resJYJGSJ = await JYJGSJ({ id: jyjId! });
      if (resJYJGSJ.status === 'ok') {

        //待准入机构
        const dyrkcDataRes = await toIntroduceCourses({
          page: 1,
          pageSize: 3,
          XZQHM: resJYJGSJ.data.XZQH,
          // KCMC: param.KCMC
        });
        if (dyrkcDataRes.status === 'ok') {
          const newData = {
            type: 'picList',
            cls: 'picList',
            list: dyrkcDataRes.data?.rows.slice(0, 3) || [],
            noDataText: '暂无待办',
            noDataImg: noData,
          };
          setAllDataSource(dyrkcDataRes.data?.rows || []);
          setDataSource(newData);
          // setDyrkc(dyrkcDataRes.data?.rows);
        } else {
          message.error(dyrkcDataRes.message);
          return {};
        }

        //通知公告
        const resgetXXTZGG = await getJYJGTZGG({
          BT: '',
          ZT: ['已发布', '草稿'],
          LX: 0,
          page: 0,
          pageSize: 0
        });
        if (resgetXXTZGG.status === 'ok') {
          console.log('resgetXXTZGG: ', resgetXXTZGG);
          setTZGGData(resgetXXTZGG.data?.rows);
        }

        //政策公告
        const resgetXXZCGG = await getJYJGTZGG({
          BT: '',
          LX: 1,
          ZT: ['已发布', '草稿'],
          page: 0,
          pageSize: 0
        });
        if (resgetXXZCGG.status === 'ok') {
          setZCGGData(resgetXXZCGG.data?.rows);
        }
      }
    }

    fetchData();
  }, []);
  return (
    <div className={styles.things}>
      <Tabs
        centered={false}
        tabBarExtraContent={{
          right: (
            <Link to={{ pathname: '/teacher/home/course', state: { allDataSource } }}>
              查看更多 <IconFont type="icon-gengduo" className={styles.gengduo} />
            </Link>
          ),
        }}
      >
        <TabPane tab="待办事项" key="upcoming">
          <ListComp listData={dataSource} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Things;
