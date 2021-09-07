/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-09 17:41:43
 * @LastEditTime: 2021-09-07 09:04:32
 * @LastEditors: wsl
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
      title: '标题',
      dataIndex: 'BT',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '发布时间',
      dataIndex: 'RQ',
      valueType: 'dateTime',
      hideInForm: true,
      search: false,
      align: 'center'
    },
    {
      title: '发布状态',
      dataIndex: 'ZT',
      width: '7em',
      valueEnum: {
        草稿: { text: '草稿', status: 'Default' },
        已发布: { text: '已发布', status: 'Success' },
        已删除: { text: '已删除', status: 'Error' }
      },
      filters: false,
      search: false
    },
    {
      title: '头条',
      dataIndex: 'SFTT',
      defaultSortOrder: 'descend',
      search: false,
      align: 'center',
      width: '7em',
      render: (text, record) => {
        return <Switch defaultChecked={!!text} size="small" disabled={true} />;
      }
    },
    {
      title: '推荐',
      dataIndex: 'SFTJ',
      search: false,
      align: 'center',
      width: '5em',
      render: (text, record) => {
        return <Switch defaultChecked={!!text} size="small" disabled={true} />;
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: '15em',
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
