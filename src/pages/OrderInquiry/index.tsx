/*
 * @description:
 * @author: gxh
 * @Date: 2021-09-22 11:54:38
 * @LastEditTime: 2021-11-23 09:26:31
 * @LastEditors: Sissle Lynn
 */

import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useEffect, useRef, useState } from 'react';
import { Select, Space, Tag } from 'antd';
import { Link, useModel } from 'umi';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';
import { getTableWidth } from '@/utils';
import EllipsisHint from '@/components/EllipsisHint';
import SchoolSelect from '@/components/Search/SchoolSelect';
import SearchLayout from '@/components/Search/Layout';

// 点击查询按钮
const OrderInquiry = () => {
  const SubmitTable = () => { };
  const columns: ProColumns<any>[] | undefined = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'index',
      valueType: 'index',
      fixed: 'left',
      width: 50,
    },
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      width: 160,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '所属学段',
      key: 'XD',
      dataIndex: 'XD',
      align: 'center',
      width: 130,
      search: false,
      render: (_: any, record: any) => {
        const data = record?.XD?.split(/,/g);
        return (
          <EllipsisHint
            width="100%"
            text={
              data?.length &&
              data?.map((item: any) => {
                return <Tag key={item}>{item}</Tag>;
              })
            }
          />
        );
      }
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
      width: 120,
      search: false
    },
    {
      title: '开设课程数量',
      key: 'KHKCSQs',
      dataIndex: 'KHKCSQs',
      align: 'center',
      width: 130,
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
      width: 160,
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space>
            <Link
              to={{
                pathname: '/OrderInquiry/tabs',
                state: {
                  index: '1',
                  id: record.id,
                  xzqhm: currentUser?.XZQHM,
                  xxmc: record.XXMC
                }
              }}
            >
              课程订单
            </Link>
            <Link
              to={{
                pathname: '/OrderInquiry/tabs',
                state: {
                  index: '2',
                  id: record.id,
                  xzqhm: currentUser?.XZQHM,
                  xxmc: record.XXMC
                }
              }}
            >
              服务订单
            </Link>
          </Space>
        );
      }
    }
  ];
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // 列表对象引用，可主动执行刷新等操作
  const actionRef = useRef<ActionType>();
  const [curSchool, setCurSchool] = useState<string>();
  const [dataSource, setDataSourse] = useState<any>();

  const getData = async () => {
    const res = await getAllSchools({
      XZQHM: currentUser?.XZQHM,
      XXMC: curSchool || "",
      page: 0,
      pageSize: 0
    });
    if (res.status === 'ok') {
      setDataSourse(res.data?.rows);
    }
  };

  const schoolChange = (val: string) => {
    setCurSchool(val);
  }

  useEffect(()=>{
    getData();
  },[curSchool])

  return (
    <>
      <ProTable
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onSubmit={SubmitTable}
        columns={columns}
        dataSource={dataSource}
        actionRef={actionRef}
        search={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1,
        }}
        scroll={{ x: getTableWidth(columns) }}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
        headerTitle={
          <SearchLayout>
            <SchoolSelect onChange={schoolChange} />
          </SearchLayout>
        }
      />
    </>
  );
};
OrderInquiry.wrappers = ['@/wrappers/auth'];
export default OrderInquiry;
