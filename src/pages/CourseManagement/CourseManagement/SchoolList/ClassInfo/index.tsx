import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Modal, Table, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import classes from './index.less';
import { history, Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import { getKHKCSJ } from '@/services/after-class-qxjyj/khkcsj';
/**
 * 课程班详情
 * @returns
 */
const ClassInfo = (props: any) => {
  const { state } = props.location;
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Datas, setDatas] = useState<any>();
  const [KHBJSJs, setKHBJSJs] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getKHKCSJ({
        XXJBSJId: state?.XXJBSJId,
        kcId: state.KHKCSJId,
        XNXQId: ''
      });
      if (res.status === 'ok') {
        setKHBJSJs(res.data.KHBJSJs);
        setDatas(res.data);
      }
    })();
  }, []);

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
      fixed: 'left',
      width: 130,
      ellipsis: true,
      search: false
    },
    {
      title: '课程班人数',
      dataIndex: 'BJRS',
      key: 'BJRS',
      align: 'center',
      search: false,
      width: 120,
      render: (text: any, record: any) => {
        return record.BJRS;
      }
    },
    {
      title: '报名人数',
      dataIndex: 'BJRS',
      key: 'BJRS',
      align: 'center',
      search: false,
      width: 110,
      render: (_: any, record: any) => {
        return record.KHXSBJs.length;
      }
    },
    {
      title: '开课日期',
      dataIndex: 'KKRQ',
      key: 'KKRQ',
      valueType: 'date',
      align: 'center',
      width: 110,
      search: false
    },
    {
      title: '结课日期',
      dataIndex: 'JKRQ',
      key: 'JKRQ',
      align: 'center',
      valueType: 'date',
      width: 110,
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
              pathname: '/courseManagement/courseManagement/schoolList/classInfo/studentList',
              state: {
                value: record,
                xxmc: state.XXJBSJ.XXMC,
                kcmc: Datas?.KCMC
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
      <div className={classes.content}>
        <div className={classes.headerInfo}>
          <span>课程名称：{Datas?.KCMC}</span>
          {Datas?.SSJGLX === '机构课程' ? <span>所属机构：{Datas?.KHJYJG?.QYMC}</span> : ''}
          <span>课程类型：{Datas?.KHKCLX?.KCTAG}</span>
          <span>
            适用年级：
            {Datas?.NJSJs.map((item: any) => {
              return <Tag key={item.id}>{`${item.XD}${item.NJMC}`}</Tag>;
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
            defaultCurrent: 1
          }}
          scroll={{ x: 1200 }}
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
