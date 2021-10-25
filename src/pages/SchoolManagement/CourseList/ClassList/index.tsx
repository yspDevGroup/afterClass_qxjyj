/*
 * @description:
 * @author: wsl
 * @Date: 2021-09-06 17:00:58
 * @LastEditTime: 2021-10-18 14:09:05
 * @LastEditors: Sissle Lynn
 */
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Modal, Table, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import styles from '../index.less';
import { history, Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import { paginationConfig } from '@/constant';
/**
 * 课程班详情
 * @returns
 */
const ClassList = (props: any) => {
  const { state } = props.location;
  const actionRef = useRef<ActionType>();
  const { KHBJSJs } = state.value;

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
      title: '课程班名称',
      dataIndex: 'BJMC',
      key: 'BJMC',
      align: 'center',
      width: 120,
      fixed: 'left',
      ellipsis: true,
      search: false
    },
    {
      title: '课程班人数',
      dataIndex: 'BJRS',
      key: 'BJRS',
      align: 'center',
      search: false,
      width: 110,
      ellipsis: true,
      render: (text: any, record: any) => {
        return record.BJRS;
      }
    },
    {
      title: '报名人数',
      dataIndex: 'BMRS',
      key: 'BMRS',
      align: 'center',
      search: false,
      width: 100,
      ellipsis: true,
      render: (text: any, record: any) => {
        return record.KHXSBJs?.length;
      }
    },
    {
      title: '所属学校',
      dataIndex: 'XQSJ',
      key: 'XQSJ',
      align: 'center',
      search: false,
      width: 120,
      ellipsis: true,
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
      width: 160,
      ellipsis: true,
      render: (text: any, record: any) => {
        return `${record?.XNXQ?.XN} ${record?.XNXQ?.XQ}`;
      }
    },
    {
      title: '开班日期',
      dataIndex: 'KKRQ',
      key: 'KKRQ',
      align: 'center',
      valueType: 'date',
      width: 120,
      ellipsis: true,
      search: false
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      align: 'center',
      search: false,
      width: 160,
      fixed: 'right',
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
              课程班详情
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
          history.go(-1);
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
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1,
          }}
          scroll={{ x: 1300 }}
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
