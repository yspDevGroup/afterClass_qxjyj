/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-27 09:50:10
 * @LastEditTime: 2022-05-19 17:22:27
 * @LastEditors: Wu Zhan
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
import { JSInforMation } from '@/components/JSInforMation';

const { Search } = Input;
const Blacklist = (props: { Keys: string | undefined }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSourse] = useState<any>();
  const [Datas, setDatas] = useState<TableListItem>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { username, UserId, jyjId } = currentUser!;
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
      SPRId: UserId || '',
      BZ: params.BZ,
      SQR,
      SQRId,
      XZQHM,
      KHJYJGId
    };
    const res = await updateKHJGRZSQ({ id: Datas!.value.KHJGRZSQs[0].id }, data);
    if (res.status === 'ok') {
      message.success('?????????????????????');
      setIsModalVisible(false);
      await CreateKHJYJSPJL({
        ZT: 4,
        BZ: params.BZ,
        SPR: username,
        SPRId: UserId || '',
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
      title: '??????',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '????????????',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      width: 160,
      fixed: 'left',
      search: false
    },
    {
      title: '?????????????????????',
      dataIndex: 'JRHMDSJ',
      key: 'JRHMDSJ',
      align: 'center',
      valueType: 'date',
      width: 160,
      ellipsis: true,
      search: false
    },
    {
      title: '?????????????????????',
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
      title: '?????????',
      dataIndex: 'SPR',
      key: 'SPR',
      align: 'center',
      width: 160,
      ellipsis: true,
      search: false
    },

    {
      title: '??????',
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
                    // if (JSInforMation(currentUser)) {
                    setDatas(record);
                    setIsModalVisible(true);
                    // }
                  }}
                >
                  ???????????????
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
              <label htmlFor="type">???????????????</label>
              <Search
                placeholder="??????????????????"
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
        title="???????????????"
        visible={isModalVisible}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            ??????
          </Button>,
          <Button key="back" onClick={handleCancel}>
            ??????
          </Button>
        ]}
      >
        <Form form={form} onFinish={submit} className={styles.Forms}>
          <Form.Item
            name="BZ"
            key="BZ"
            label="????????????????????????"
            rules={[
              {
                required: true,
                message: '?????????????????????'
              }
            ]}
          >
            <Input.TextArea placeholder="?????????" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

Blacklist.wrappers = ['@/wrappers/auth'];
export default Blacklist;
