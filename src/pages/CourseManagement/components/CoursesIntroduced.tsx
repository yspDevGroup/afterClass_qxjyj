/* eslint-disable max-params */

import React, { useRef } from 'react'
import { history } from "umi";
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { useModel } from '@/.umi/plugin-model/useModel';
import EllipsisHint from '@/components/EllipsisHint';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { toIntroduceCourses } from '@/services/after-class-qxjyj/jyjgsj';
import { updateKHKCSJ } from '@/services/after-class-qxjyj/khkcsj';


/**
 * 待引入课程
 * @returns
 */
const CoursesIntroduced = (props: {JYYData: any}) => {
  const { JYYData } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const actionRef = useRef<ActionType>();
  const confirm = async (id: any) => {
    // const res = await deleteKHJYJG({ id });
    // if (res.status === 'ok') {
    //   message.success('删除成功');
    //   actionRef.current?.reload();
    // } else {
    //   message.error(res.message);
    // }
  };
  const columns: any[] = [
    {
      title: '课程名称',
      dataIndex: 'KCMC',
      key: 'KCMC',
      align: 'center',
    },
    {
      title: '所属机构',
      dataIndex: 'KHJYJG',
      key: 'KHJYJG',
      align: 'center',
      search: false,
      render: (text: any) => {
        return text?.QYMC || "-"
      }
    },
    {
      title: '课程类型',
      dataIndex: 'KHKCLX',
      key: 'KHKCLX',
      align: 'center',
      search: false,
      render: (text: any) => {
        return text?.KCTAG || "-"
      }
    },
    {
      title: '适用年级',
      key: 'NJSJs',
      dataIndex: 'NJSJs',
      search: false,
      align: 'center',
      render: (text: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={text!=='-'&&text?.map((item: any) => {
              return <Tag key={item.id}>{item.XD === '初中' ? `${item.NJMC}` : `${item.XD}${item.NJMC}`}</Tag>;
            })}
          />
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      search: false,
      align: 'center',
      render: (text: any, record: any, index: any, action: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              history.push({
                pathname: `/courseInfo`,
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
                state: { ...record }
              });
            }}
          >
            机构详情
          </a>
          <a
            onClick={async () => {
              const res = await updateKHKCSJ({ id: record?.id }, { KCZT: 2 });
              if (res.status === 'ok') {
                message.success('操作成功');
                action?.reload();
              } else {
                message.error('操作失败');
              }
            }}
          >
            引入
          </a>

        </Space>
      )
    }
  ];
  return (
    <div >
      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        dateFormatter="string"
        // dataSource={[{},{}]}
        request={async (param = {}, sort, filter) => {
          const params = {
            ...sort,
            ...filter,
            page: param.current,
            pageSize: param.pageSize,
            XZQHM: JYYData.XZQH,
            KCMC: param.keyword
          };
          const res = await toIntroduceCourses(params);
          if (res.status === 'ok') {
            return {
              data: res.data.rows,
              success: true,
              total: res.data.count
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0
            };
          }
        }}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false,
        }}
      />
    </div>
  )
}

export default CoursesIntroduced;
