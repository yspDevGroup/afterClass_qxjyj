import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Modal, Table, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import classes from './index.less';
import { history, Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import { getKHKCSJ } from '@/services/after-class-qxjyj/khkcsj';
/**
 * 班级详情
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

      console.log(res, '121212121-');
    })();
  }, []);
  console.log(KHBJSJs);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      search: false
    },
    {
      title: '结课日期',
      dataIndex: 'JKRQ',
      key: 'JKRQ',
      align: 'center',
      valueType: 'date',
      search: false
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
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      align: 'center',
      search: false,
      render: (text: any, record: any) => {
        console.log(record, '+++++++++++++==');
        return (
          <Link
            key="bjxq"
            to={{
              pathname: '/courseManagement/schoolList/classInfo/studentList',
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
  const stdColumns: any = [
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center'
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
          <span>课程名称：{Datas?.KCMC}</span>
          {Datas?.SSJGLX === '机构课程' ? <span>所属机构：{Datas?.KHJYJG?.QYMC}</span> : ''}
          <span>课程类型：{Datas?.KHKCLX?.KCTAG}</span>
          <span>
            适用年级：
            {Datas?.NJSJs.map((item: any) => {
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
        {/* <Modal
          title={`学生列表 `}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
          bodyStyle={{
            maxHeight: '600px',
            overflowY: 'auto',
            minHeight: 200
          }}
        >
          <div style={{ float: 'right', marginBottom: 12 }}>总人数：{stdData.length}人</div>
          <Table dataSource={stdData} columns={stdColumns} pagination={false} rowKey="id" />
        </Modal> */}
      </div>
    </>
  );
};

ClassInfo.wrappers = ['@/wrappers/auth'];
export default ClassInfo;
