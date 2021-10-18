import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Modal, Table, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import classes from './index.less';
import { history, Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import WWOpenDataCom from '@/components/WWOpenDataCom';
/**
 * 课程班详情
 * @returns
 */
const ClassInfo = (props: any) => {
  const { state } = props.location;
  const actionRef = useRef<ActionType>();
  const { KHBJSJs } = state;

  const columns: any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      fixed:'left',
      align: 'center'
    },
    {
      title: '课程班名称',
      dataIndex: 'BJMC',
      key: 'BJMC',
      align: 'center',
      fixed:'left',
      width: 130,
      ellipsis: true,
      search: false
    },
    {
      title: '所属校区',
      dataIndex: 'XQSJ',
      key: 'XQSJ',
      align: 'center',
      search: false,
      width: 120,
      ellipsis: true,
      render: (text: any) => {
        return text?.XQMC;
      }
    },
    {
      title: '所属学校',
      dataIndex: 'XQSJ',
      key: 'XQSJ',
      align: 'center',
      search: false,
      width: 160,
      ellipsis: true,
      render: (text: any, record: any) => {
        return text?.XXJBSJ?.XXMC;
      }
    },
    {
      title: '所属学期',
      dataIndex: 'XNXQ',
      key: 'XNXQ',
      align: 'center',
      search: false,
      width: 120,
      ellipsis: true,
      render: (text: any, record: any) => {
        return `${record?.XNXQ?.XN} ${record?.XNXQ?.XQ}`;
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      align: 'center',
      search: false,
      width: 100,
      fixed: 'right',
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <Link
            key="bjxq"
            to={{
              pathname: '/courseManagement/courseManagement/classInfo/studentList',
              state: {
                value: record,
                xxmc: state.XXJBSJ.XXMC,
                kcmc: state.KCMC
              }
            }}
          >
            学生列表
          </Link>
        );
      }
    }
  ];
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          history.goBack();
        }}
        style={{
          marginBottom: '24px'
        }}
      >
        <LeftOutlined />
        返回上一页
      </Button>
      <div className={classes.content}>
        <div className={classes.headerInfo}>
          <span>课程名称：{state?.KCMC}</span>
          {state?.SSJGLX === '机构课程' ? <span>所属机构：{state?.KHJYJG?.QYMC}</span> : ''}
          <span>课程类型：{state?.KHKCLX?.KCTAG}</span>
          <span>
            适用年级：
            {state?.NJSJs.map((item: any) => {
              return <Tag key={item.id}>{item.XD === '初中' ? `${item.NJMC}` : `${item.XD}${item.NJMC}`}</Tag>;
            })}
          </span>
        </div>
        <ProTable
          className={classes.proTableinfo}
          actionRef={actionRef}
          columns={columns}
          dataSource={KHBJSJs}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1,
          }}
          scroll={{ x: 1000 }}
          dateFormatter="string"
          search={false}
          options={{
            setting: false,
            fullScreen: false,
            density: false,
            reload: false,
            search: false
          }}
        />
      </div>
    </>
  );
};

ClassInfo.wrappers = ['@/wrappers/auth'];
export default ClassInfo;
