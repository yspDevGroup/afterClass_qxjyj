/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-09 17:41:43
 * @LastEditTime: 2021-11-23 10:27:22
 * @LastEditors: Sissle Lynn
 */
import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Switch, message, Input, Select } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { history, useModel } from 'umi';
import type { TableListItem } from '../data';
import styles from '../index.module.less';
import moment from 'moment';
import { getJYJGTZGG, updateJYJGTZGG } from '@/services/after-class-qxjyj/jyjgtzgg';
import { getTableWidth } from '@/utils';
import SearchLayout from '@/components/Search/Layout';
import COption from '../components/Option';

const { Search } = Input;
const { Option } = Select;
const TableList = () => {
  const [dataSource, setDataSource] = useState<API.JYJGTZGG[]>();
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [title, setTitle] = useState<string>();
  const [FBZT, setFBZT] = useState<any>();
  const getData = async () => {
    if (title || FBZT) {
      const resgetXXTZGG = await getJYJGTZGG({
        BT: title,
        ZT: FBZT ? [FBZT] : ['已发布', '草稿'],
        XZQHM: currentUser?.XZQHM,
        LX: 1,
        page: 0,
        pageSize: 0
      });
      if (resgetXXTZGG.status === 'ok') {
        setDataSource(resgetXXTZGG.data?.rows);
      }
    } else {
      const resgetXXTZGG = await getJYJGTZGG({
        BT: '',
        XZQHM: currentUser?.XZQHM,
        ZT: ['已发布', '草稿'],
        LX: 1,
        page: 0,
        pageSize: 0
      });
      if (resgetXXTZGG.status === 'ok') {
        setDataSource(resgetXXTZGG.data?.rows);
      }
    }
  };

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
      key: 'BT',
      ellipsis: true,
      align: 'center',
      fixed: 'left',
      width: 180
    },
    {
      title: '作者',
      dataIndex: 'ZZ',
      key: 'ZZ',
      ellipsis: true,
      align: 'center',
      width: 120,
      search: false
    },
    {
      title: '发布时间',
      dataIndex: 'RQ',
      key: 'RQ',
      valueType: 'dateTime',
      hideInForm: true,
      align: 'center',
      width: 160,
      search: false
    },
    {
      title: '发布状态',
      dataIndex: 'ZT',
      key: 'ZT',
      width: 120,
      align: 'center',
      valueEnum: {
        草稿: { text: '草稿', status: 'Default' },
        已发布: { text: '已发布', status: 'Success' }
      }
    },
    {
      title: '头条',
      dataIndex: 'SFTT',
      key: 'SFTT',
      defaultSortOrder: 'descend',
      search: false,
      align: 'center',
      width: 120,
      render: (text, record) => {
        return (
          <Switch
            key="SFTT"
            defaultChecked={!!text}
            size="small"
            onChange={async (checked: boolean) => {
              const data = {
                SFTT: checked === true ? 1 : 0
              };
              try {
                const resUpdateJYJGTZGG = await updateJYJGTZGG({ id: record.id }, data);
                if (resUpdateJYJGTZGG.status === 'ok') {
                  message.success('设置成功');
                  getData?.();
                } else {
                  message.error('设置失败，请联系管理员或稍后再试。');
                }
              } catch (err) {
                message.error('设置失败，请联系管理员或稍后再试。');
              }
            }}
          />
        );
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      key: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <div className={styles.optionCol}>
          <COption
            id={record.id}
            ZT={record.ZT}
            record={record}
            refreshHandler={() => {
              getData?.();
            }}
          />
        </div>
      ),
      align: 'center'
    }
  ];

  useEffect(()=>{
    getData();
  },[title,FBZT])

  return (
    <>
      <ProTable<any>
        actionRef={actionRef}
        columns={columns}
        dataSource={dataSource}
        className={styles.proTableStyles}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        scroll={{ x: getTableWidth(columns) }}
        search={false}
        headerTitle={
          <>
            <SearchLayout>
              <div>
                <label htmlFor='kcname'>标题：</label>
                <Search placeholder="请输入" allowClear onSearch={(value: string) => {
                  setTitle(value);
                }} />
              </div>
              <div>
                <label htmlFor='FBZT'>发布状态：</label>
                <Select
                  allowClear
                  placeholder="请选择"
                  onChange={(value) => {
                    setFBZT(value);
                  }}
                  value={FBZT}
                >
                  <Option value='草稿' key='草稿' >
                    草稿
                  </Option>
                  <Option value='已发布' key='已发布'>
                    已发布
                  </Option>
                </Select>
              </div>
            </SearchLayout>
          </>
        }
        toolBarRender={(_action) => [
          <Button
            key="xinjian"
            type="primary"
            onClick={() => {
              history.push('/policyIssued/policyIssuedList/editArticle');
            }}
          >
            <PlusOutlined /> 新建
          </Button>
        ]}
      />
    </>
  );
};

TableList.wrappers = ['@/wrappers/auth'];
export default TableList;
