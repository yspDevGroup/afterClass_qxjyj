/*
 * @description:
 * @author: gxh
 * @Date: 2021-09-22 11:54:38
 * @LastEditTime: 2021-10-18 10:00:36
 * @LastEditors: Sissle Lynn
 */

import ProTable, { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Select, Space } from 'antd';
import { Link, useModel } from 'umi';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';
const { Option } = Select;
import styles from './index.less';
import { TableListParams } from '@/constant';
// 点击查询按钮
const OrderInquiry = () => {
  const SubmitTable = () => { };
  const columns: ProColumns<any>[] | undefined = [
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
      title: '开设课程数量',
      key: 'KHKCSQs',
      dataIndex: 'KHKCSQs',
      align: 'center',
      width: 120,
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
              课程订单
            </Link>
            <Link
              to={{
                pathname: '/orderinquiry/serviceOrder',
                state: record
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
  const [SchoolList, setSchoolList] = useState<any>([]);
  const [curSchool, setCurSchool] = useState<string>();

  useEffect(() => {
    (async () => {
      const res2 = await getAllSchools({
        XZQHM: currentUser?.XZQHM,
        page: 0,
        pageSize: 0
      });
      if (res2.data?.rows?.length) {
        setSchoolList(res2.data.rows);
      }
    })();
  }, []);

  return (
    <>
      <div className={styles.searchs}>
        <span>
          学校名称：
          <Select
            style={{ width: 200 }}
            onChange={(value: string) => {
              setCurSchool(value);
              actionRef.current?.reload();
            }}
            allowClear
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
        actionRef={actionRef}
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
        request={async (
          params: any & {
            pageSize?: number;
            current?: number;
            keyword?: string;
          },
          sort,
          filter,
        ): Promise<Partial<RequestData<any>>> => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const opts: TableListParams = {
            ...params,
            sorter: sort && Object.keys(sort).length ? sort : undefined,
            filter,
          };
          const res = await getAllSchools({
            XZQHM: currentUser?.XZQHM,
            XXMC: curSchool || "",
            page: 0,
            pageSize: 0
          });
          if (res.status === 'ok') {
            return {
              data: res.data?.rows,
              total: res.data?.count,
              success: true,
            };
          }
          return {};
        }}
      />
    </>
  );
};
OrderInquiry.wrappers = ['@/wrappers/auth'];
export default OrderInquiry;
