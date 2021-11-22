/* eslint-disable @typescript-eslint/no-duplicate-imports */
/* eslint-disable max-params */

import React, { useEffect, useRef, useState } from 'react';
import { history } from 'umi';
import { Button, Input, message, Popconfirm, Space, Tag } from 'antd';
import { useModel } from 'umi';
import EllipsisHint from '@/components/EllipsisHint';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { toIntroduceCourses } from '@/services/after-class-qxjyj/jyjgsj';
import { updateKHKCSJ } from '@/services/after-class-qxjyj/khkcsj';
import { getTableWidth } from '@/utils';
import SearchLayout from '@/components/Search/Layout';

/**
 * 待引入课程
 * @returns
 */
const { Search } = Input;
const CoursesIntroduced = (props: { JYYData: any; reload: boolean }) => {
  const { JYYData, reload } = props;
  const { initialState } = useModel('@@initialState');
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSourse] = useState<any[]>([]);
  const [KCName, setKCName] = useState<string>();
  if (!reload) {
    actionRef.current?.reload();
  }
  const getData = async () => {
    const res = await toIntroduceCourses({
      KCMC: KCName,
      XZQHM: JYYData?.XZQH,
      page: 0,
      pageSize: 0
    });
    if (res.status === 'ok') {
      setDataSourse(res.data?.rows);
    }
  };
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '课程名称',
      dataIndex: 'KCMC',
      key: 'KCMC',
      fixed: 'left',
      width: 160,
      ellipsis: true,
      align: 'center'
    },
    {
      title: '所属机构',
      dataIndex: 'KHJYJG',
      key: 'KHJYJG',
      align: 'center',
      search: false,
      width: 130,
      ellipsis: true,
      render: (text: any, record: any) => {
        return record?.KHJYJG?.QYMC || '-';
      }
    },
    {
      title: '课程类型',
      dataIndex: 'KHKCLX',
      key: 'KHKCLX',
      align: 'center',
      search: false,
      width: 120,
      ellipsis: true,
      render: (text: any, record: any) => {
        return record?.KHKCLX?.KCTAG || '-';
      }
    },
    {
      title: '适用年级',
      key: 'NJSJs',
      dataIndex: 'NJSJs',
      search: false,
      align: 'center',
      width: 200,
      render: (text: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={
              text !== '-' &&
              text?.map((item: any) => {
                return <Tag key={item.id}>{`${item.XD}${item.NJMC}`}</Tag>;
              })
            }
          />
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      search: false,
      align: 'center',
      fixed: 'right',
      width: 140,
      render: (text: any, record: any, index: any, action: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              history.push({
                pathname: `/courseManagement/courseManagement/courseInfo`,
                state: { ...record }
              });
            }}
          >
            课程详情
          </a>
          <a
            onClick={() => {
              history.push({
                pathname: `/organizationManagement/agencyDetails`,
                state: { value: record.KHJYJG }
              });
            }}
          >
            机构详情
          </a>

          <Popconfirm
            key="zr"
            title="确定引入该课程?"
            onConfirm={async () => {
              const res = await updateKHKCSJ({ id: record?.id }, { KCZT: 2 });
              if (res.status === 'ok') {
                message.success('操作成功');
                action?.reload();
              } else {
                message.error(res.message || '操作失败');
              }
            }}
            okText="确定"
            cancelText="取消"
            placement="topRight"
          >
            <a>引入</a>
          </Popconfirm>
        </Space>
      )
    }
  ];

  useEffect(() => {
    getData();
  }, [KCName])

  return (
    <div>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        dateFormatter="string"
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        search={false}
        scroll={{ x: getTableWidth(columns) }}
        headerTitle={
          <>
            <SearchLayout>
              <div>
                <label htmlFor='kcname'>课程名称：</label>
                <Search placeholder="课程名称" allowClear onSearch={(value: string) => {
                  setKCName(value);
                }} />
              </div>
            </SearchLayout>
          </>
        }
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
      />
    </div>
  );
};

CoursesIntroduced.wrappers = ['@/wrappers/auth'];
export default CoursesIntroduced;
