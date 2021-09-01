/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 14:37:02
 * @LastEditTime: 2021-09-01 18:47:40
 * @LastEditors: wsl
 */
import React, { useRef } from 'react';
import ProTable, { RequestData } from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Link, useModel } from 'umi';

import styles from './index.less';
import { Divider } from 'antd';
import { TableListParams } from '@/constant';
import { cooperateSchool } from '@/services/after-class-qxjyj/khjyjg';
import { KHHZXYSJ } from './data';
import { getAllSchools, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';

const SchoolManagement = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // 列表对象引用，可主动执行刷新等操作
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<KHHZXYSJ>[] = [
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      align: 'center',
      width: 300,
      ellipsis: true
    },
    {
      title: '所属区域',
      dataIndex: 'SSQY',
      key: 'SSQY',
      align: 'center',
      width: 90,
      ellipsis: true
    },
    {
      title: '学段',
      key: 'XD',
      dataIndex: 'XD',
      align: 'center',
      valueType: 'select',
      filters: true,
      onFilter: true,
      // valueEnum: {
      //   全学段: { text: '全学段' },
      //   学前: { text: '学前' },
      //   小学: { text: '小学' },
      //   初中: { text: '初中' },
      //   高中: { text: '高中' }
      // },
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
        return <div>{record.KHKCSQs?.length}</div>;
      }
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 200,
      align: 'center',
      render: (_, record) => (
        <>
          <Link
            to={{
              pathname: '/schoolManagement/courseInfo',
              state: {
                type: 'list',
                data: record
              }
            }}
          >
            课程详情
          </Link>
        </>
      )
    }
  ];

  return (
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
          XXMC: '',
          page: 0,
          pageSize: 0
        });
        console.log(resgetAllSchools, '----------------');
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
  );
};

SchoolManagement.wrappers = ['@/wrappers/auth'];
export default SchoolManagement;
