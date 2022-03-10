/*
 * @description:
 * @author: wsl
 * @Date: 2021-09-06 17:00:58
 * @LastEditTime: 2021-10-27 12:02:16
 * @LastEditors: Please set LastEditors
 */
import ProTable, { ActionType, RequestData } from '@ant-design/pro-table';
import { Button, message, Modal, Table, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import styles from '../index.less';
import { history, Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import { paginationConfig } from '@/constant';
import { TableListItem, TableListParams } from '../../data';
import { getAllClasses } from '@/services/after-class-qxjyj/khbjsj';
import SemesterSelect from '@/components/SemesterSelect';
import EllipsisHint from '@/components/EllipsisHint';

/**
 * 课程班详情
 * @returns
 */
const ClassList = (props: any) => {
  const { state } = props.location;
  const { XXJBSJID } = state;
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<any>([]);
  console.log('state', state);

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
        // console.log('record',record);
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
        return record['xs_count'];
        // return record.KHXSBJs?.length;
      }
    },
    {
      title: '教材数量',
      dataIndex: 'JCSL',
      key: 'JCSL',
      align: 'center',
      search: false,
      width: 100,
      ellipsis: true,
      render: (text: any, record: any) => {
        return record['jc_count'];
        // return record.KHXSBJs?.length;
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
      title: '任课教师',
      dataIndex: 'RKJS',
      key: 'RKJS',
      align: 'center',
      search: false,
      width: 160,
      ellipsis: true,
      render: (text: any, record: any) => (
        <EllipsisHint
          width="100%"
          text={record.KHBJJs?.map((item: any) => {
            // console.log('++++++',item.JZGJBSJ.XM);
            return <Tag key={item.id}>{item.JZGJBSJ.XM}</Tag>;
          })}
        />
      )
    },
    // {
    //   title: '开班日期',
    //   dataIndex: 'KKRQ',
    //   key: 'KKRQ',
    //   align: 'center',
    //   valueType: 'date',
    //   width: 120,
    //   ellipsis: true,
    //   search: false
    // },
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
                  kcmc: state?.value.KCMC
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
  const onSelectChange = (value: string) => {
    console.log('value', value);
    getDataSource(value);
  };
  const getDataSource = async (XNXQId: string) => {
    const { id } = state.value;
    const res = await getAllClasses({
      KHKCSJId: id,
      XNXQId,
      page: 0,
      pageSize: 0
    });
    if (res.status === 'ok') {
      let newArr: any[] = [];
      res.data?.rows.forEach((value: any) => {
        newArr.push(value);
      });
      setDataSource(newArr);
    }
  };

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
      <div className={styles.searchs}>
        <span>
          所属学年学期：
          <SemesterSelect onChange={onSelectChange} XXJBSJId={XXJBSJID} />
        </span>
      </div>
      <div className={styles.contents}>
        <div className={styles.headerInfo}>
          <span>课程名称：{state?.value.KCMC}</span>
          {state?.value.SSJGLX === '机构课程' ? <span>所属机构：{state?.value.KHJYJG?.QYMC}</span> : ''}
          <span>课程类型：{state?.value.KHKCLX?.KCTAG}</span>
          <span>
            适用年级：
            {state?.value.NJSJs.map((item: any) => {
              return <Tag key={item.id}>{`${item.XD}${item.NJMC}`}</Tag>;
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
            defaultCurrent: 1
          }}
          scroll={{ x: 1300 }}
          dataSource={dataSource}
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
