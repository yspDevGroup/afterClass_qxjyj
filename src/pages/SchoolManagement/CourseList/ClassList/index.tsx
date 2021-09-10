/*
 * @description:
 * @author: wsl
 * @Date: 2021-09-06 17:00:58
 * @LastEditTime: 2021-09-10 16:01:23
 * @LastEditors: wsl
 */
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Modal, Table, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import styles from '../index.less';
import { history, Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import { paginationConfig } from '@/constant';
/**
 * 班级详情
 * @returns
 */
const ClassList = (props: any) => {
  const { state } = props.location;
  console.log(state, '----');
  const actionRef = useRef<ActionType>();
  const { KHBJSJs } = state.value;

  const columns: any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 58,
      align: 'center'
    },
    {
      title: '班级名称',
      dataIndex: 'BJMC',
      key: 'BJMC',
      align: 'center',
      search: false
    },
    {
      title: '报名人数',
      dataIndex: 'BJRS',
      key: 'BJRS',
      align: 'center',
      search: false,
      render: (text: any, record: any) => {
        return record.KHXSBJs?.length;
      }
    },
    {
      title: '所属校区',
      dataIndex: 'XQSJ',
      key: 'XQSJ',
      align: 'center',
      search: false,
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
      render: (text: any, record: any) => {
        return state?.xxmc;
      }
    },
    {
      title: '所属学期',
      dataIndex: 'XNXQ',
      key: 'XNXQ',
      align: 'center',
      search: false,
      render: (text: any) => {
        return `${text?.XN}${text.XQ}`;
      }
    },
    {
      title: '开班日期',
      dataIndex: 'KKRQ',
      key: 'KKRQ',
      align: 'center',
      valueType: 'date',
      search: false
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      align: 'center',
      search: false,
      render: (text: any, record: any) => {
        return (
          <div className={styles.operation}>
            <Link
              key="bjxq"
              to={{
                pathname: '/schoolManagement/courseList/classList/classInfo',
                state: record
              }}
            >
              班级详情
            </Link>
            <Link
              key="bjxq"
              to={{
                pathname: '/schoolManagement/courseList/classList/studentList',
                state: {
                  value: record,
                  xxmc: state.xxmc,
                  kcmc: state.value.KCMC
                }
              }}
            >
              学生列表
            </Link>
          </div>
        );
      }
    }
  ];
  return (
    <div className={styles.ClassInfo}>
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
      <div className={styles.contents}>
        <div className={styles.headerInfo}>
          <span>课程名称：{state?.value.KCMC}</span>
          {state?.value.SSJGLX === '机构课程' ? <span>所属机构：{state?.value.KHKCSQs[0].KHJYJG.QYMC}</span> : ''}
          <span>课程类型：{state?.value.KHKCLX?.KCTAG}</span>
          <span>
            适用年级：
            {state?.value.NJSJs.map((item: any) => {
              return <Tag key={item.id}>{item.XD === '初中' ? `${item.NJMC}` : `${item.XD}${item.NJMC}`}</Tag>;
            })}
          </span>
        </div>
        <ProTable
          className={styles.proTableinfo}
          actionRef={actionRef}
          columns={columns}
          dataSource={KHBJSJs}
          rowKey="id"
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
    </div>
  );
};

ClassList.wrappers = ['@/wrappers/auth'];
export default ClassList;
