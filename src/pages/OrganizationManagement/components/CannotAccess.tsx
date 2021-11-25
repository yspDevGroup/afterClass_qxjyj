/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-27 10:16:11
 * @LastEditTime: 2021-11-23 10:25:13
 * @LastEditors: Sissle Lynn
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, message, Modal, Popconfirm, Row, Tabs, Image, Form, Input, Button } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from '../data';
import styles from '../index.less';
import { updateKHJGRZSQ } from '@/services/after-class-qxjyj/khjgrzsq';
import { history, Link, useModel } from 'umi';
import moment from 'moment';
import { getAllInstitutions, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { updateKHJYJG } from '@/services/after-class-qxjyj/khjyjg';
import { CreateKHJYJSPJL } from '@/services/after-class-qxjyj/khjyjspjl';
import SearchLayout from '@/components/Search/Layout';
import { getTableWidth } from '@/utils';

const { Search } = Input;
const CannotAccess = (props: { Keys: string | undefined }) => {
  const { Keys } = props;
  const actionRef2 = useRef<ActionType>();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { username, id, jyjId } = currentUser!;
  const [XZQUMid, setXZQUMid] = useState<string>();
  const [dataSource, setDataSourse] = useState<any>();
  const [Datas, setDatas] = useState<TableListItem>();
  const [JGMC, setJGMC] = useState<string>();

  const getData = async () => {
    const resJYJGSJ = await JYJGSJ({ id: jyjId! });
    setXZQUMid(resJYJGSJ.data.XZQH);
    if (resJYJGSJ.status === 'ok') {
      const res = await getAllInstitutions(
        {
          ZT: [0],
          LX: 0,
          XZQHM: resJYJGSJ.data.XZQH,
          JGMC: JGMC,
          page: 0,
          pageSize: 0
        }
      );
      if (res.status === 'ok') {
        let newArr: any[] = [];
        res.data?.rows.forEach((value: any) => {
          const { QYMC, JGFWFW, LXRXM, LXDH, KHKCSJs } = value;
          const data = {
            value,
            JGMC: QYMC,
            JGFWFW: JGFWFW,
            LXRXM: LXRXM,
            LXRDH: LXDH,
            KCSL: KHKCSJs.length
          };
          newArr.push(data);
        });
        setDataSourse(newArr);
        // if (newArr.length === res.data?.rows.length) {
        //   return {
        //     data: newArr,
        //     total: res.data?.count,
        //     success: true
        //   };
        // }
      } else {
        message.error(res.message);
        return {};
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      form.resetFields();
    }, 50);
  }, [isModalVisible]);

  useEffect(() => {
    getData();
  }, [JGMC]);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const submit = async (params: any) => {
    const data = {
      ZT: 2,
      SPR: username,
      SPRId: id,
      BZ: params.BZ,
      JYJGSJId: jyjId
    };
    const res = await updateKHJGRZSQ({ id: Datas!.value.KHJGRZSQs[0].id }, data);
    if (res.status === 'ok') {
      message.success('驳回成功');
      setIsModalVisible(false);
      getData();
      await CreateKHJYJSPJL({
        ZT: 2,
        BZ: params.BZ,
        SPR: username,
        SPRId: id,
        KHJYJGId: Datas?.value?.id,
        JYJGSJId: jyjId
      });
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    getData();
  }, [Keys]);
  let myDate = new Date();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '机构名称',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      width: 160,
      fixed: 'left',
      search: false,
      render: (text: any, record: any) => {
        return (
          <Link
            key="jgxq"
            to={{
              pathname: '/organizationManagement/agencyDetails',
              state: record
            }}
          >
            {record?.JGMC}
          </Link>
        );
      }
    },
    {
      title: '联系人',
      dataIndex: 'LXRXM',
      key: 'LXRXM',
      width: 120,
      align: 'center',
      ellipsis: true,
      search: false
    },
    {
      title: '联系电话',
      dataIndex: 'LXRDH',
      key: 'LXRDH',
      align: 'center',
      width: 140,
      ellipsis: true,
      search: false
    },
    {
      title: '课程数量',
      dataIndex: 'KCSL',
      key: 'KCSL',
      width: 100,
      align: 'center',
      ellipsis: true,
      search: false
    },
    {
      title: '服务范围',
      dataIndex: 'JGFWFW',
      key: 'JGFWFW',
      width: 160,
      align: 'center',
      ellipsis: true,
      search: false
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 180,
      render: (text, record, action) => {
        console.log(record, 'record');
        return (
          <div className={styles.operation}>
            <Link
              key="kclb"
              to={{
                pathname: '/organizationManagement/courseList',
                state: {
                  record: record,
                  type: '待准入'
                }
              }}
            >
              课程列表
            </Link>
            <Popconfirm
              key="zr"
              title="确定准入该机构?"
              onConfirm={async () => {
                const data = {
                  ZT: 1,
                  BZ: '',
                  SPR: username,
                  SPRId: id,
                  RZSJ: moment(myDate).format(),
                  JYJGSJId: jyjId
                };
                const res = await updateKHJGRZSQ({ id: record.value?.KHJGRZSQs[0].id }, data);
                if (res.status === 'ok') {
                  message.success('准入成功');
                  await CreateKHJYJSPJL({
                    ZT: 0,
                    BZ: '',
                    SPR: username,
                    SPRId: id,
                    KHJYJGId: record.value?.id,
                    JYJGSJId: jyjId
                  });
                  getData();
                }
              }}
              okText="确定"
              cancelText="取消"
              placement="topRight"
            >
              <a>准入</a>
            </Popconfirm>
            <a
              key="bhsq"
              onClick={() => {
                setDatas(record);
                setIsModalVisible(true);
              }}
            >
              驳回申请
            </a>
          </div>
        );
      }
    }
  ];
  return (
    <div className={styles.OrganizationManagement}>
      <ProTable<any>
        columns={columns}
        dataSource={dataSource}
        actionRef={actionRef2}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        scroll={{ x: getTableWidth(columns) }}
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false,
        }}
        headerTitle={
          <SearchLayout>
            <div>
              <label htmlFor='type'>机构名称：</label>
              <Search placeholder="搜索机构名称" allowClear onSearch={(value: string) => {
                setJGMC(value);
              }} />
            </div>
          </SearchLayout>
        }
        dateFormatter="string"
        toolBarRender={() => []}
      />
      <Modal title="驳回申请" visible={isModalVisible} footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            确定
          </Button>,
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
        ]}>
        <Form form={form} onFinish={submit} className={styles.Forms}>
          <Form.Item
            name="BZ"
            key="BZ"
            label="驳回原因："
            rules={[
              {
                required: true,
                message: '请输入驳回原因'
              }
            ]}
          >
            <Input.TextArea placeholder="请输入" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

CannotAccess.wrappers = ['@/wrappers/auth'];
export default CannotAccess;
