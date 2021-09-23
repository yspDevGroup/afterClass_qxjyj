// tab 表格切换状态
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Select, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getOrders } from '@/services/after-class-qxjyj/jyjgsj';
import { queryXNXQList } from '@/services/after-class-qxjyj/xnxq';
import { getAllKHKCSJ } from '@/services/after-class-qxjyj/khkcsj';

import { useModel } from 'umi';
import styles from './index.less';

const { Option } = Select;

const StateTab = (props: any) => {
  const { DDZT, id } = props.TabState;
  const columns: ProColumns<API.KHXSDD>[] | undefined = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 60,
      search: false
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      search: false
    },
    {
      title: '班级',
      dataIndex: 'BJMC',
      key: 'BJMC',
      align: 'center',
      search: false,
      render: (_text: any, record: any) => {
        return <div>{record?.KHBJSJ?.BJMC}</div>;
      }
    },
    {
      title: '课程名称',
      dataIndex: 'KCMC',
      key: 'KCMC',
      align: 'center',
      search: false,
      render: (_text: any, record: any) => {
        return <div>{record?.KHBJSJ?.KHKCSJ?.KCMC}</div>;
      }
    },
    {
      title: '下单时间',
      dataIndex: 'XDSJ',
      key: 'XDSJ',
      align: 'center',
      search: false
    },
    {
      title: '付款时间',
      dataIndex: 'ZFSJ',
      key: 'ZFSJ',
      align: 'center',
      search: false
    },
    {
      title: '订单费用(元)',
      dataIndex: 'DDFY',
      key: 'DDFY',
      align: 'center',
      search: false
    },
    {
      title: '订单状态',
      dataIndex: 'DDZT',
      key: 'DDZT',
      align: 'center',
      search: false
    }
  ];
  const [curXNXQId, setCurXNXQId] = useState<any>();
  //  学年学期列表
  const [termList, setTermList] = useState<any>();
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (async () => {
      const res = await getOrders({ XZQHM: currentUser?.XZQHM, DDZT, XXJBSJId: id });
      setDataSource(res.data.rows);
    })();
  }, []);
  // useEffect(()=>{
  //   (async()=>{

  //   })()

  // })

  return (
    <>
      <div>
        <div className={styles.searchs}>
          <span>
            所属学年学期：
            <Select
              value={curXNXQId}
              style={{ width: 200 }}
              onChange={(value: string) => {
                setCurXNXQId(value);
              }}
            >
              {termList?.map((item: any) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.text}
                  </Option>
                );
              })}
            </Select>
          </span>
          <span>
            课程名称:
            <Select
              value={curXNXQId}
              style={{ width: 200 }}
              onChange={(value: string) => {
                setCurXNXQId(value);
              }}
            >
              {termList?.map((item: any) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.text}
                  </Option>
                );
              })}
            </Select>
          </span>
          <span>
            班级名称:
            <Select
              value={curXNXQId}
              style={{ width: 200 }}
              onChange={(value: string) => {
                setCurXNXQId(value);
              }}
            >
              {termList?.map((item: any) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.text}
                  </Option>
                );
              })}
            </Select>
          </span>
        </div>
        <ProTable
          columns={columns}
          dataSource={dataSource}
          options={{
            setting: false,
            fullScreen: false,
            density: false,
            reload: false
          }}
          search={false}
        />
      </div>
    </>

    // <div>
    //   {props.TabState}
    // </div>
  );
};
export default StateTab;
