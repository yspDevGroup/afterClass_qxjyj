/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-09 17:41:43
 * @LastEditTime: 2021-10-18 16:27:54
 * @LastEditors: Sissle Lynn
 */
import React, { useState, useRef, useEffect } from 'react';
import { Switch } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import Option from './components/Option';
import type { TableListItem } from './data';
import styles from './index.module.less';
import { defImg } from './data';
import { getJYJGTZGG, updateJYJGTZGG } from '@/services/after-class-qxjyj/jyjgtzgg';

const TableList = () => {
  const [dataSource, setDataSource] = useState<API.JYJGTZGG[]>();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '标题',
      dataIndex: 'BT',
      ellipsis: true,
      align: 'center',
      fixed:'left',
      width: 180,
    },
    {
      title: '作者',
      dataIndex: 'ZZ',
      ellipsis: true,
      align: 'center',
      search: false,
      width: 120,
    },
    {
      title: '发布时间',
      dataIndex: 'RQ',
      valueType: 'dateTime',
      hideInForm: true,
      search: false,
      align: 'center',
      width: 160,
    },
    {
      title: '发布状态',
      dataIndex: 'ZT',
      width: 120,
      valueEnum: {
        草稿: { text: '草稿', status: 'Default' },
        已发布: { text: '已发布', status: 'Success' },
        已删除: { text: '已删除', status: 'Error' }
      },
      filters: false,
      search: false,
      align: 'center'
    },
    {
      title: '头条',
      dataIndex: 'SFTT',
      defaultSortOrder: 'descend',
      search: false,
      align: 'center',
      width: 120,
      render: (text, record) => {
        return <Switch defaultChecked={!!text} size="small" disabled={true} />;
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <div className={styles.optionCol}>
          <Option
            id={record.id}
            ZT={record.ZT}
            record={record}
            refreshHandler={() => {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          />
        </div>
      ),
      align: 'center'
    }
  ];

  return (
    <ProTable<any>
      headerTitle="回收站"
      actionRef={actionRef}
      className={styles.proTableStyles}
      rowKey="id"
      tableAlertRender={false}
      dataSource={dataSource}
      pagination={{
        showQuickJumper: true,
        pageSize: 10,
        defaultCurrent: 1,
      }}
      scroll={{ x: 1000 }}
      request={async (params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        const resgetXXTZGG = await getJYJGTZGG({
          BT: params.BT,
          LX: 0,
          ZT: ['已删除'],
          page: 0,
          pageSize: 0
        });
        if (resgetXXTZGG.status === 'ok') {
          setDataSource(resgetXXTZGG.data?.rows);
        }
        return '';
      }}
      columns={columns}
    />
  );
};

TableList.wrappers = ['@/wrappers/auth'];
export default TableList;
