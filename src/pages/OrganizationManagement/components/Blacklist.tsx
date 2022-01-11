/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-27 09:50:10
 * @LastEditTime: 2022-01-11 14:56:50
 * @LastEditors: wsl
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, message, Popconfirm, Row, Image, Modal, Input, Form, Tooltip, Button } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from '../data';
import styles from '../index.less';
import { getKHJGRZSQ, updateKHJGRZSQ } from '@/services/after-class-qxjyj/khjgrzsq';
import { useModel } from 'umi';
import { getAllInstitutions, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { updateKHJYJG } from '@/services/after-class-qxjyj/khjyjg';
import { CreateKHJYJSPJL } from '@/services/after-class-qxjyj/khjyjspjl';
import SearchLayout from '@/components/Search/Layout';
import { getTableWidth } from '@/utils';

const { Search } = Input;
const Blacklist = (props: { Keys: string | undefined }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSourse] = useState<any>();
  const [Datas, setDatas] = useState<TableListItem>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { username, userId, jyjId } = currentUser!;
  const { Keys } = props;
  const [form] = Form.useForm();
  const actionRef3 = useRef<ActionType>();
  const [XZQUMid, setXZQUMid] = useState<string>();
  const [JGMC, setJGMC] = useState<string>();

  const getData = async () => {
    const resJYJGSJ = await JYJGSJ({ id: jyjId! });
    setXZQUMid(resJYJGSJ?.data?.XZQH);
    if (resJYJGSJ?.status === 'ok') {
      const res = await getAllInstitutions({
        ZT: [1],
        XZQHM: resJYJGSJ.data.XZQH,
        JGMC: JGMC,
        LX: 1,
        page: 0,
        pageSize: 0
      });
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
        setDataSourse(newArr);
      } else {
        message.error(res.message);
        return {};
      }
    }
  };

  useEffect(() => {
    getData();
  }, [Keys]);
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
    const { SQR, SQRId, XZQHM, KHJYJGId } = Datas!.value;
    const data = {
      ZT: 3,
      LX: 1,
      SPR: username,
      SPRId: userId || '',
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
      await CreateKHJYJSPJL({
        ZT: 4,
        BZ: params.BZ,
        SPR: username,
        SPRId: userId || '',
        KHJYJGId: Datas?.value?.id,
        JYJGSJId: jyjId
      });
      getData();
    } else {
      message.error(res.message);
    }
    const resupdateKHJYJG = await updateKHJYJG({ id: Datas!.value.KHJGRZSQs[0].id }, { ZT: 0 });
  };
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
      search: false
    },
    {
      title: '加入黑名单时间',
      dataIndex: 'JRHMDSJ',
      key: 'JRHMDSJ',
      align: 'center',
      valueType: 'date',
      width: 160,
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
      width: 160,
      ellipsis: true,
      search: false
    },

    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 160,
      render: (text, record, action) => {
        return (
          <>
            {XZQUMid === record.value.XZQHM ? (
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
            ) : (
              <></>
            )}
          </>
        );
      }
    }
  ];
  return (
    <div className={styles.OrganizationManagement}>
      <ProTable<any>
        columns={columns}
        dataSource={dataSource}
        actionRef={actionRef3}
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
          reload: false
        }}
        headerTitle={
          <SearchLayout>
            <div>
              <label htmlFor="type">机构名称：</label>
              <Search
                placeholder="搜索机构名称"
                allowClear
                onSearch={(value: string) => {
                  setJGMC(value);
                }}
              />
            </div>
          </SearchLayout>
        }
        dateFormatter="string"
        toolBarRender={() => []}
      />
      <Modal
        title="移出黑名单"
        visible={isModalVisible}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            确定
          </Button>,
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>
        ]}
      >
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

Blacklist.wrappers = ['@/wrappers/auth'];
export default Blacklist;
