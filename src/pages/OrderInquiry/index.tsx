/*
 * @description:
 * @author: gxh
 * @Date: 2021-09-22 11:54:38
 * @LastEditTime: 2021-09-23 16:25:43
 * @LastEditors: gxh
 */

import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useEffect, useRef, useState } from 'react';
import { Select, Space } from 'antd';
import { Link, useModel } from 'umi';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';
const { Option } = Select;
import styles from './index.less';
// 点击查询按钮
const OrderInquiry = () => {
  const SubmitTable = () => {};
  const columns: ProColumns<API.KHXSDD>[] | undefined = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'index',
      valueType: 'index'
    },
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      align: 'center'
    },

    {
      title: '所属学段',
      key: 'XD',
      dataIndex: 'XD',
      align: 'center',
      search: false
    },
    {
      title: '联系人',
      key: 'LXR',
      dataIndex: 'LXR',
      align: 'center',
      width: 110,
      search: false
    },
    {
      title: '联系电话',
      key: 'LXDH',
      dataIndex: 'LXDH',
      align: 'center',
      width: 180,
      search: false
    },
    {
      title: '课程数量',
      key: 'KHKCSQs',
      dataIndex: 'KHKCSQs',
      align: 'center',
      width: 90,
      search: false,
      render: (_, record) => {
        const num1 = record.KHKCSQs?.length;
        const num2 = record.KHKCSJs?.length;
        const num = num1! + num2!;
        return <div>{num}</div>;
      }
    },
    {
      title: '操作',
      align: 'center',
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <Link
              to={{
                pathname: '/orderinquiry/detatil',
                state: record
              }}
            >
              课程订单详情
            </Link>
            <Link
              to={{
                pathname: '/orderinquiry/detatil/aa',
                state: record
              }}
            >
              服务订单详情
            </Link>
          </Space>
        );
      }
    }
  ];
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);
  const [SchoolList, setSchoolList] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const res2 = await getAllSchools({
        XZQHM: currentUser.XZQHM,
        page: 0,
        pageSize: 0
      });
      setDataSource(res2.data.rows);
      if (res2.data.rows.length > 1) {
        setSchoolList(res2.data.rows);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log('数据发生变化');
    })();
  }, [SchoolList]);

  return (
    <>
      <div className={styles.searchs}>
        <span>
          学校名称：
          <Select
            style={{ width: 200 }}
            onChange={(value: string) => {
              setSchoolList(value);
            }}
          >
            {SchoolList.map((item: any) => {
              return (
                <Option value={item.XXMC} key={item.XXMC}>
                  {item.XXMC}
                </Option>
              );
            })}
          </Select>
        </span>
      </div>

      <ProTable
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onSubmit={SubmitTable}
        columns={columns}
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
        // request 获取 dataSource 的方法
        dataSource={dataSource}
      />
    </>
  );
};
export default OrderInquiry;
