/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 14:37:02
 * @LastEditTime: 2021-10-13 09:46:07
 * @LastEditors: Sissle Lynn
 */
import React, { useRef } from 'react';
import ProTable, { RequestData } from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Link, useModel } from 'umi';

import styles from './index.less';
import { TableListParams } from '@/constant';
import { KHHZXYSJ } from './data';
import { getAllSchools, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';

const SchoolManagement = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // 列表对象引用，可主动执行刷新等操作
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<KHHZXYSJ>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      align: 'center',
      width: 300,
      ellipsis: true
    },
    {
      title: '所属学段',
      key: 'XD',
      dataIndex: 'XD',
      align: 'center',
      valueType: 'select',
      filters: true,
      onFilter: true,
      width: 150
    },
    {
      title: '联系人',
      key: 'LXR',
      dataIndex: 'LXR',
      align: 'center',
      width: 110
    },
    {
      title: '联系电话',
      key: 'LXDH',
      dataIndex: 'LXDH',
      align: 'center',
      width: 180
    },
    {
      title: '课程数量',
      key: 'KHKCSQs',
      dataIndex: 'KHKCSQs',
      align: 'center',
      width: 90,
      render: (_, record) => {
        const num1 = record.KHKCSQs?.length;
        const num2 = record.KHKCSJs?.length;
        const num = num1! + num2!;
        return <div>{num}</div>;
      }
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 200,
      align: 'center',
      render: (_, record) => (
        <div className={styles.operation}>
          <Link
            to={{
              pathname: '/schoolManagement/schoolInfos',
              state: record
            }}
          >
            学校详情
          </Link>
          <Link
            to={{
              pathname: '/schoolManagement/courseList',
              state: record
            }}
          >
            课程列表
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className={styles.SchoolManagement}>
      <ProTable<KHHZXYSJ>
        columns={columns}
        className={styles.schoolTable}
        actionRef={actionRef}
        search={false}
        request={async (
          params: KHHZXYSJ & {
            pageSize?: number;
            current?: number;
            keyword?: string;
          },
          sort,
          filter
        ): Promise<Partial<RequestData<KHHZXYSJ>>> => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const opts: TableListParams = {
            ...params,
            sorter: sort && Object.keys(sort).length ? sort : undefined,
            filter
          };
          const resJYJGSJ = await JYJGSJ({ id: currentUser!.jyjId! });
          const resgetAllSchools = await getAllSchools({
            XZQHM: resJYJGSJ.data.XZQH,
            XXMC: opts.keyword,
            page: 0,
            pageSize: 0
          });
          if (resgetAllSchools.status === 'ok') {
            return {
              data: resgetAllSchools.data?.rows,
              total: resgetAllSchools.data.count,
              success: true
            };
          }
          return {};
        }}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false,
          search: {
            placeholder: '学校名称'
          }
        }}
        rowKey="id"
        dateFormatter="string"
      />
    </div>
  );
};

SchoolManagement.wrappers = ['@/wrappers/auth'];
export default SchoolManagement;
