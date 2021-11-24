import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Modal, Table, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import classes from './index.less';
import { history, Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getAllClasses } from '@/services/after-class-qxjyj/khbjsj';
import SemesterSelect from '@/components/SemesterSelect';
import EllipsisHint from '@/components/EllipsisHint';
/**
 * 课程班详情
 * @returns
 */
const ClassInfo = (props: any) => {
  const { state } = props.location;
  const actionRef = useRef<ActionType>();
  const { KHBJSJs } = state;
  const [dataSource, setDataSource] = useState<any>([]);

  const onSelectChange = (value: string) => {
    getDataSource(value);
  };
  const getDataSource = async (XNXQId: string) => {
    const { id } = state;
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
        return state?.XXJBSJ?.XXMC;
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
    //   title: '序号',
    //   dataIndex: 'index',
    //   valueType: 'index',
    //   width: 50,
    //   fixed:'left',
    //   align: 'center'
    // },
    // {
    //   title: '课程班名称',
    //   dataIndex: 'BJMC',
    //   key: 'BJMC',
    //   align: 'center',
    //   fixed:'left',
    //   width: 130,
    //   ellipsis: true,
    //   search: false
    // },
    // {
    //   title: '所属校区',
    //   dataIndex: 'XQSJ',
    //   key: 'XQSJ',
    //   align: 'center',
    //   search: false,
    //   width: 120,
    //   ellipsis: true,
    //   render: (text: any) => {
    //     return text?.XQMC;
    //   }
    // },
    // {
    //   title: '所属学校',
    //   dataIndex: 'XQSJ',
    //   key: 'XQSJ',
    //   align: 'center',
    //   search: false,
    //   width: 160,
    //   ellipsis: true,
    //   render: (text: any, record: any) => {
    //     return text?.XXJBSJ?.XXMC;
    //   }
    // },
    // {
    //   title: '所属学期',
    //   dataIndex: 'XNXQ',
    //   key: 'XNXQ',
    //   align: 'center',
    //   search: false,
    //   width: 120,
    //   ellipsis: true,
    //   render: (text: any, record: any) => {
    //     return `${record?.XNXQ?.XN} ${record?.XNXQ?.XQ}`;
    //   }
    // },
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
          history.go(-1);
        }}
        style={{
          marginBottom: '24px'
        }}
      >
        <LeftOutlined />
        返回上一页
      </Button>
      <div className={classes.searchs}>
        <span>
          所属学年学期：
          <SemesterSelect onChange={onSelectChange} XXJBSJId={state?.XXJBSJ?.id} />
        </span>
      </div>
      <div className={classes.content}>
        <div className={classes.headerInfo}>
          <span>课程名称：{state?.KCMC}</span>
          {state?.SSJGLX === '机构课程' ? <span>所属机构：{state?.KHJYJG?.QYMC}</span> : ''}
          <span>课程类型：{state?.KHKCLX?.KCTAG}</span>
          <span>
            适用年级：
            {state?.NJSJs.map((item: any) => {
              return <Tag key={item.id}>{`${item.XD}${item.NJMC}`}</Tag>;
            })}
          </span>
        </div>
        <ProTable
          className={classes.proTableinfo}
          actionRef={actionRef}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1
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
