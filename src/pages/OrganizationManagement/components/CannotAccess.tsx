/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-27 10:16:11
 * @LastEditTime: 2021-09-08 17:58:48
 * @LastEditors: wsl
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, message, Modal, Popconfirm, Row, Tabs, Image, Form, Input } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from '../data';
import styles from '../index.less';
import { updateKHJGRZSQ } from '@/services/after-class-qxjyj/khjgrzsq';
import { history, Link, useModel } from 'umi';
import moment from 'moment';
import { getAllInstitutions, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { updateKHJYJG } from '@/services/after-class-qxjyj/khjyjg';

const CannotAccess = (props: { Keys: string | undefined }) => {
  const { Keys } = props;
  const actionRef2 = useRef<ActionType>();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { username, id, jyjId } = currentUser!;
  const [Datas, setDatas] = useState<TableListItem>();

  useEffect(() => {
    setTimeout(() => {
      form.resetFields();
    }, 50);
  }, [isModalVisible]);
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
      actionRef2?.current?.reload();
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    actionRef2?.current?.reload();
  }, [Keys]);
  let myDate = new Date();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 58,
      align: 'center'
    },
    {
      title: '机构名称',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      search: false
    },
    {
      title: '联系人',
      dataIndex: 'LXRXM',
      key: 'LXRXM',
      align: 'center',
      ellipsis: true,
      search: false
    },
    {
      title: '联系电话',
      dataIndex: 'LXRDH',
      key: 'LXRDH',
      align: 'center',
      ellipsis: true,
      search: false
    },
    {
      title: '课程数量',
      dataIndex: 'KCSL',
      key: 'KCSL',
      width: 80,
      align: 'center',
      ellipsis: true,
      search: false
    },
    {
      title: '服务范围',
      dataIndex: 'JGFWFW',
      key: 'JGFWFW',
      align: 'center',
      search: false
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      align: 'center',
      width: 300,
      render: (text, record, action) => {
        return (
          <div className={styles.operation}>
            <Link
              key="jgxq"
              to={{
                pathname: '/organizationManagement/agencyDetails',
                state: record
              }}
            >
              机构详情
            </Link>
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
                  SPR: username,
                  SPRId: id,
                  RZSJ: moment(myDate).format(),
                  JYJGSJId: jyjId
                };

                const res = await updateKHJGRZSQ({ id: record.value?.KHJGRZSQs[0].id }, data);
                if (res.status === 'ok') {
                  message.success('准入成功');
                  actionRef2?.current?.reload();
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
        actionRef={actionRef2}
        rowKey="key"
        pagination={{
          showQuickJumper: true
        }}
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false,
          search: {
            placeholder: '搜索机构名称'
          }
        }}
        request={async (
          params: TableListItem & {
            pageSize?: number;
            current?: number;
            keyword?: string;
          },
          sort,
          filter
        ): Promise<Partial<RequestData<TableListItem>>> => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const opts: TableListParams = {
            ...params,
            sorter: sort && Object.keys(sort).length ? sort : undefined
          };
          const resJYJGSJ = await JYJGSJ({ id: jyjId! });
          if (resJYJGSJ.status === 'ok') {
            const res = await getAllInstitutions(
              {
                ZT: [0],
                LX: 0,
                XZQHM: resJYJGSJ.data.XZQH,
                JGMC: typeof opts.keyword === 'undefined' ? '' : opts.keyword,
                page: 0,
                pageSize: 0
              },
              opts
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
              if (newArr.length === res.data?.rows.length) {
                return {
                  data: newArr,
                  total: res.data?.count,
                  success: true
                };
              }
            } else {
              message.error(res.message);
              return {};
            }
          }

          return {};
        }}
        dateFormatter="string"
        toolBarRender={() => []}
      />
      <Modal title="驳回申请" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
