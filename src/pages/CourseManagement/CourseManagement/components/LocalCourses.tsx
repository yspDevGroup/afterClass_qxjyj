/* eslint-disable max-params */

import React, { useRef } from 'react';
import { history, Link } from 'umi';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import EllipsisHint from '@/components/EllipsisHint';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { getAllCourses, getAllCourses2 } from '@/services/after-class-qxjyj/jyjgsj';
import { updateKHKCSJ } from '@/services/after-class-qxjyj/khkcsj';

/**
 * 本区课程
 * @returns
 */
const LocalCourses = (props: { JYYData: any; reload: boolean }) => {
  const { JYYData, reload } = props;
  const actionRef = useRef<ActionType>();
  if (reload) {
    actionRef.current?.reload();
  }
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
      align: 'center',
      fixed: 'left',
      width: 160,
      ellipsis: true,
      render: (text: string, record: any) => {
        return (
          <a
            style={{ color: '#4884ff' }}
            onClick={() => {
              history.push({
                pathname: `/courseManagement/courseManagement/courseInfo`,
                state: { ...record }
              });
            }}
          >
            {record.KCMC}
          </a>
        );
      }
    },
    {
      title: '课程来源',
      dataIndex: 'SSJGLX',
      key: 'SSJGLX',
      valueType: 'select',
      width: 120,
      ellipsis: true,
      valueEnum: {
        校内课程: { text: '校内课程' },
        机构课程: { text: '机构课程' }
      },
      align: 'center'
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
      title: '所属机构/学校',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      search: false,
      width: 160,
      ellipsis: true,
      render: (text: any, record: any) => {
        return record.SSJGLX === '校内课程' ? (
          <Link
            to={{
              pathname: '/courseManagement/courseManagement/schoolList/schoolInfos',
              state: record
            }}
          >
            {record?.XXJBSJ?.XXMC}
          </Link>
        ) : (
          <Link
            to={{
              pathname: `/organizationManagement/agencyDetails`,
              state: { value: record.KHJYJG }
            }}
          >
            {record?.KHJYJG?.QYMC}
          </Link>
        );
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
              text?.length
                ? text.map((item: any) => {
                    return <Tag key={item.id}>{`${item.XD}${item.NJMC}`}</Tag>;
                  })
                : ''
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
          {record?.SSJGLX === '机构课程' ? (
            <a
              onClick={() => {
                history.push({
                  pathname: `/courseManagement/courseManagement/schoolList`,
                  state: { ...record }
                });
              }}
            >
              学校列表
            </a>
          ) : (
            <a
              onClick={() => {
                history.push({
                  pathname: `/courseManagement/courseManagement/classInfo`,
                  state: { ...record }
                });
              }}
            >
              课程班列表
            </a>
          )}

          {record?.SSJGLX === '校内课程' ? (
            ''
          ) : (
            <>
              <Popconfirm
                key="zr"
                title="确定取消引入该课程?"
                onConfirm={async () => {
                  const res = await updateKHKCSJ({ id: record?.id }, { KCZT: 1 });
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
                <a>取消引入</a>
              </Popconfirm>
            </>
          )}
        </Space>
      )
    }
  ];
  return (
    <div>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        dateFormatter="string"
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        scroll={{ x: 1100 }}
        request={async (param = {}, sort, filter) => {
          if (JYYData?.XZQH) {
            const params = {
              ...sort,
              ...filter,
              page: param.current,
              pageSize: param.pageSize,
              XZQHM: JYYData?.XZQH,
              KCMC: param.KCMC,
              KCLY: param.SSJGLX
            };
            const res = await getAllCourses2(params);
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
          }
          return [];
        }}
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

LocalCourses.wrappers = ['@/wrappers/auth'];
export default LocalCourses;
