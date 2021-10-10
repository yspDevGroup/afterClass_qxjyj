import React, { useContext, useEffect, useState } from 'react';
import myContext from '@/utils/MyContext';
import noData from '@/assets/noCourse.png';
import moment from 'moment';
import styles from '../index.less';
import { Link } from 'umi';
import { Tabs } from 'antd';
import IconFont from '@/components/CustomIcon';
import ListComp from '../components/ListComponent';

const { TabPane } = Tabs;
const Things = () => {
  const { yxkc } = useContext(myContext);
  const [dataSource, setDataSource] = useState<any>();
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
              `课程时段：${
                item.KKRQ
                  ? moment(item.KKRQ).format('YYYY.MM.DD')
                  : moment(item.KHKCSJ.KKRQ).format('YYYY.MM.DD')
              }-${
                item.JKRQ
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
    const newData = {
      type: 'picList',
      cls: 'picList',
      list: yxkc ? getDataList(yxkc).slice(0, 3) : [],
      noDataText: '暂无课程',
      noDataImg: noData,
    };
    setAllDataSource(yxkc ? getDataList(yxkc) : []);
    setDataSource({
      "type": "picList",
      "cls": "picList",
      "list": [
          {
              "id": "8ff6cf9a-e39a-400a-8279-617bc21cedc1",
              "title": "测试321 - 测试机构课程",
              "img": "",
              "link": "/teacher/home/courseIntro?classid=8ff6cf9a-e39a-400a-8279-617bc21cedc1",
              "desc": [
                  {
                      "left": [
                          "课程时段：2021.08.01-2021.09.30"
                      ]
                  },
                  {
                      "left": [
                          "共20课时"
                      ]
                  }
              ],
              "introduction": ""
          },
          {
              "id": "56bc8066-5e2c-4b52-be02-38e868dd9cf5",
              "title": "测试321 - 测试班级1",
              "img": "",
              "link": "/teacher/home/courseIntro?classid=56bc8066-5e2c-4b52-be02-38e868dd9cf5",
              "desc": [
                  {
                      "left": [
                          "课程时段：2021.09.01-2021.12.31"
                      ]
                  },
                  {
                      "left": [
                          "共10课时"
                      ]
                  }
              ],
              "introduction": ""
          }
      ],
      "noDataText": "暂无课程",
      "noDataImg": "/static/noCourses1.53a59598.png"
  });
    console.log('newData: ', newData);
  }, [yxkc]);
  return (
    <div>
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
        <TabPane tab="待办事项" key="elective">
          <ListComp listData={dataSource} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Things;
