/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-27 09:50:10
 * @LastEditTime: 2021-08-30 10:17:04
 * @LastEditors: wsl
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, message, Popconfirm, Row, Image, Modal, Input, Form, Tooltip } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from '../data';
import styles from '../index.less';
import { getKHJGRZSQ, updateKHJGRZSQ } from '@/services/after-class-qxjyj/khjgrzsq';
import { useModel } from '@/.umi/plugin-model/useModel';
import { getAllInstitutions, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';

const Blacklist = (props: { Keys: string | undefined }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Datas, setDatas] = useState<TableListItem>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { username, id, jyjId } = currentUser!;
  const { Keys } = props;
  const [form] = Form.useForm();
  const actionRef3 = useRef<ActionType>();

  useEffect(() => {
    actionRef3?.current?.reload();
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
    const { SQR, SQRId, XZQHM, KHJYJGId } = Datas!.value;
    const data = {
      ZT: 3,
      LX: 1,
      SPR: username,
      SPRId: id,
      BZ: params.BZ,
      SQR,
      SQRId,
      XZQHM,
      KHJYJGId
    };
    const res = await updateKHJGRZSQ({ id: Datas!.value.KHJGRZSQs[0].id }, data);
    if (res.status === 'ok') {
      message.success('成功移出黑名单');
      setIsModalVisible(false);
      actionRef3?.current?.reload();
    } else {
      message.error(res.message);
    }
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '机构名称',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      search: false
    },
    {
      title: '加入黑名单时间',
      dataIndex: 'JRHMDSJ',
      key: 'JRHMDSJ',
      align: 'center',
      valueType: 'date',
      ellipsis: true,
      search: false
    },
    {
      title: '加入黑名单原因',
      dataIndex: 'BZ',
      key: 'BZ',
      align: 'center',
      width: 300,
      search: false,
      render: (text, record, action) => {
        return (
          <Tooltip title={record.BZ}>
            <span>{record.BZ}</span>
          </Tooltip>
        );
      }
    },
    {
      title: '审批人',
      dataIndex: 'SPR',
      key: 'SPR',
      align: 'center',
      ellipsis: true,
      search: false
    },

    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (text, record, action) => {
        return (
          <div className={styles.operation}>
            <a
              key="qxzr"
              onClick={() => {
                setDatas(record);
                setIsModalVisible(true);
              }}
            >
              移出黑名单
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
        actionRef={actionRef3}
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
                ZT: [1],
                XZQHM: resJYJGSJ.data.XZQH,
                JGMC: typeof opts.keyword === 'undefined' ? '' : opts.keyword,
                LX: 1,
                page: 0,
                pageSize: 0
              },
              opts
            );
            if (res.status === 'ok') {
              let newArr: any[] = [];
              res.data?.rows.forEach((value: any) => {
                const { QYMC, KHJGRZSQs } = value;
                const data = {
                  value,
                  JGMC: QYMC,
                  SPR: KHJGRZSQs[0].SPR,
                  JRHMDSJ: KHJGRZSQs[0].createdAt,
                  BZ: KHJGRZSQs[0].BZ
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
      <Modal title="移出黑名单" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={submit} className={styles.Forms}>
          <Form.Item
            name="BZ"
            key="BZ"
            label="移出黑名单原因："
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

export default Blacklist;
