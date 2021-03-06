/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 14:37:02
 * @LastEditTime: 2021-10-26 15:45:20
 * @LastEditors: Please set LastEditors
 */
import React, { useEffect, useRef, useState } from 'react';
import ProTable, { RequestData } from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Link, useModel } from 'umi';

import styles from './index.less';
import { TableListParams } from '@/constant';
import { KHHZXYSJ } from './data';
import { getTableWidth } from '@/utils';
import { getAllSchools, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import SchoolSelect from '@/components/Search/SchoolSelect';
import SearchLayout from '@/components/Search/Layout';

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
      width: 50,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      align: 'center',
      width: 160,
      fixed: 'left',
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
      width: 120
    },
    {
      title: '课程数量',
      key: 'KHKCSQs',
      dataIndex: 'KHKCSQs',
      align: 'center',
      width: 100,
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
      width: 160,
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
              pathname: '/schoolManagement/administrativeClass',
              state: record
            }}
          >
            行政班列表
          </Link>
        </div>
      )
    }
  ];

  const [curSchool, setCurSchool] = useState<string>();
  const [dataSource, setDataSourse] = useState<any>();

  const getData = async () => {
    const resJYJGSJ = await JYJGSJ({ id: currentUser!.jyjId! });
    const resgetAllSchools = await getAllSchools({
      XZQHM: resJYJGSJ?.data?.XZQH,
      XXMC: curSchool || '',
      page: 0,
      pageSize: 0
    });
    if (resgetAllSchools.status === 'ok') {
      setDataSourse(resgetAllSchools.data?.rows);
    }
  };

  const schoolChange = (val: string) => {
    setCurSchool(val);
  };

  useEffect(() => {
    getData();
  }, [curSchool]);

  return (
    <div className={styles.SchoolManagement}>
      <ProTable<KHHZXYSJ>
        columns={columns}
        dataSource={dataSource}
        className={styles.schoolTable}
        actionRef={actionRef}
        search={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        scroll={{ x: getTableWidth(columns) }}
        headerTitle={
          <SearchLayout>
            <SchoolSelect onChange={schoolChange} />
          </SearchLayout>
        }
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
        rowKey="id"
        dateFormatter="string"
      />
    </div>
  );
};

SchoolManagement.wrappers = ['@/wrappers/auth'];
export default SchoolManagement;
