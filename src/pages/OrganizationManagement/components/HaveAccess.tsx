/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-26 11:45:40
 * @LastEditTime: 2021-09-08 17:24:01
 * @LastEditors: wsl
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, message, Popconfirm, Row, Tabs, Image, Modal, Form, Input } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from '../data';
import styles from '../index.less';
import { blockKHJGRZSQ, getKHJGRZSQ, updateKHJGRZSQ } from '@/services/after-class-qxjyj/khjgrzsq';
import { Link, useModel } from 'umi';
import { getAllInstitutions, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';

const HaveAccess = (props: { Keys: string | undefined }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Keys } = props;
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { username, jyjId, id } = currentUser!;
  const actionRef1 = useRef<ActionType>();
  const [Datas, setDatas] = useState<TableListItem>();
  const [Titles, setTitles] = useState<string>();
  const [XZQUMid, setXZQUMid] = useState<string>();
  useEffect(() => {
    actionRef1?.current?.reload();
  }, [Keys]);

  useEffect(() => {
    setTimeout(() => {
      form.resetFields();
    }, 50);
  }, [isModalVisible]);
  const handleOk = () => {
    form.submit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const submit = async (params: any) => {
    if (Titles === '异常取消') {
      const data = {
        ZT: 4,
        SPR: username,
        SPRId: id,
        BZ: params.BZ,
        JYJGSJId: jyjId
      };
      const res = await updateKHJGRZSQ({ id: Datas!.value.KHJGRZSQs[0].id }, data);
      if (res.status === 'ok') {
        message.success('取消成功');
        actionRef1?.current?.reload();
      }
    } else {
      const data = {
        KHJYJGId: Datas!.value.id,
        id: Datas!.value.KHJGRZSQs[0].id,
        SPR: username,
        SPRId: id,
        BZ: params.BZ,
        JYJGSJId: jyjId
      };
      const res = await blockKHJGRZSQ(data);
      if (res.status === 'ok') {
        message.success('成功加入黑名单');
        actionRef1?.current?.reload();
      }
    }
  };

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
            {text}
          </Link>
        );
      }
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
              key="kclb"
              to={{
                pathname: '/organizationManagement/courseList',
                state: {
                  record: record
                }
              }}
            >
              课程列表
            </Link>
            {XZQUMid === record.value.XZQHM ? (
              <>
                <Popconfirm
                  title="请选择取消状态为正常取消或异常取消"
                  onConfirm={async (e) => {
                    const { SQR, SQRId, XZQHM, KHJYJGId } = record.value;
                    const data = {
                      ZT: 3,
                      SPR: username,
                      SPRId: id,
                      SQR,
                      SQRId,
                      XZQHM,
                      KHJYJGId
                    };
                    const res = await updateKHJGRZSQ({ id: record.value.KHJGRZSQs[0].id }, data);
                    if (res.status === 'ok') {
                      message.success('取消成功');
                      actionRef1?.current?.reload();
                    }
                  }}
                  onCancel={(e) => {
                    setDatas(record);
                    setTitles('异常取消');
                    setIsModalVisible(true);
                  }}
                  okText="正常取消"
                  cancelText="异常取消"
                >
                  <a href="#">取消准入</a>
                </Popconfirm>

                <a
                  key="qxzr"
                  onClick={() => {
                    setDatas(record);
                    setTitles('加入黑名单');
                    setIsModalVisible(true);
                  }}
                >
                  加入黑名单
                </a>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      }
    }
  ];
  return (
    <div className={styles.OrganizationManagement}>
      <ProTable<any>
        columns={columns}
        rowKey="key"
        actionRef={actionRef1}
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
          setXZQUMid(resJYJGSJ.data.XZQH);
          if (resJYJGSJ.status === 'ok') {
            const res = await getAllInstitutions(
              {
                ZT: [1],
                XZQHM: resJYJGSJ.data.XZQH,
                JGMC: typeof opts.keyword === 'undefined' ? '' : opts.keyword,
                LX: 0,
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
      <Modal title={Titles} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={submit} className={styles.Forms}>
          <Form.Item
            name="BZ"
            key="BZ"
            label="原因："
            rules={[
              {
                required: true,
                message: '请输入原因'
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

HaveAccess.wrappers = ['@/wrappers/auth'];
export default HaveAccess;
