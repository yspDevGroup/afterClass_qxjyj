import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Modal, Table, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import classes from './index.less';
import { history } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
/**
 * 班级详情
 * @returns
 */
const ClassInfo = (props: any) => {
  const { state } = props.location;
  const actionRef = useRef<ActionType>();
  const { KHBJSJs } = state;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stdData, setStdData] = useState([]);

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
      title: '班级名称',
      dataIndex: 'BJMC',
      key: 'BJMC',
      align: 'center',
      search: false
    },
    {
      title: '班级人数',
      dataIndex: 'BJRS',
      key: 'BJRS',
      align: 'center',
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
      title: '所属学校',
      dataIndex: 'XQSJ',
      key: 'XQSJ',
      align: 'center',
      search: false,
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
          <a
            onClick={() => {
              showModal();
              setStdData(record.KHXSBJs);
            }}
          >
            学生列表
          </a>
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
      <div className={classes.contents}>
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
        <Modal
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
        </Modal>
      </div>
    </>
  );
};

export default ClassInfo;
