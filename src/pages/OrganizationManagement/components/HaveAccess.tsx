/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-26 11:45:40
 * @LastEditTime: 2022-05-19 17:22:47
 * @LastEditors: Wu Zhan
 */
import React, { useEffect, useRef, useState } from 'react';
import { message, Modal, Form, Input, Button } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from '../data';
import styles from '../index.less';
import { blockKHJGRZSQ, updateKHJGRZSQ } from '@/services/after-class-qxjyj/khjgrzsq';
import { Link, useModel } from 'umi';
import { getAllInstitutions, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { CreateKHJYJSPJL } from '@/services/after-class-qxjyj/khjyjspjl';
import SearchLayout from '@/components/Search/Layout';
import { getTableWidth } from '@/utils';
import { JSInforMation } from '@/components/JSInforMation';

const { Search } = Input;
const HaveAccess = (props: { Keys: string | undefined }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Keys } = props;
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { username, jyjId, UserId } = currentUser!;
  const actionRef1 = useRef<ActionType>();
  const [dataSource, setDataSourse] = useState<any>();
  const [Datas, setDatas] = useState<TableListItem>();
  const [Titles, setTitles] = useState<string>();
  const [XZQUMid, setXZQUMid] = useState<string>();
  const [JGMC, setJGMC] = useState<string>();
  const getData = async () => {
    const resJYJGSJ = await JYJGSJ({ id: jyjId! });
    setXZQUMid(resJYJGSJ?.data?.XZQH);
    if (resJYJGSJ.status === 'ok') {
      const res = await getAllInstitutions({
        ZT: [1],
        XZQHM: resJYJGSJ.data.XZQH,
        JGMC: JGMC,
        LX: 0,
        page: 0,
        pageSize: 0
      });
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
    if (Titles === '????????????') {
      const data = {
        ZT: 3,
        SPR: username,
        SPRId: UserId || '',
        BZ: params.BZ,
        JYJGSJId: jyjId
      };
      const res = await updateKHJGRZSQ({ id: Datas!.value.KHJGRZSQs[0].id }, data);
      if (res.status === 'ok') {
        message.success('????????????');
        setIsModalVisible(false);
        await CreateKHJYJSPJL({
          ZT: 1,
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
    } else {
      const data = {
        KHJYJGId: Datas!.value.id,
        id: Datas!.value.KHJGRZSQs[0].id,
        SPR: username,
        SPRId: UserId || '',
        BZ: params.BZ,
        JYJGSJId: jyjId
      };
      const res = await blockKHJGRZSQ(data);
      if (res.status === 'ok') {
        message.success('?????????????????????');
        setIsModalVisible(false);
        await CreateKHJYJSPJL({
          ZT: 3,
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
    }
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
      search: false,
      width: 160,
      fixed: 'left',
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <Link
            key="jgxq"
            to={{
              pathname: '/organizationManagement/agencyDetails',
              state: { value: { id: record?.value?.id } }
            }}
          >
            {record?.JGMC}
          </Link>
        );
      }
    },

    {
      title: '?????????',
      dataIndex: 'LXRXM',
      key: 'LXRXM',
      align: 'center',
      width: 120,
      ellipsis: true,
      search: false
    },
    {
      title: '????????????',
      dataIndex: 'LXRDH',
      key: 'LXRDH',
      align: 'center',
      width: 120,
      ellipsis: true,
      search: false
    },
    {
      title: '????????????',
      dataIndex: 'KCSL',
      key: 'KCSL',
      align: 'center',
      width: 100,
      ellipsis: true,
      search: false
    },
    {
      title: '????????????',
      dataIndex: 'JGFWFW',
      key: 'JGFWFW',
      align: 'center',
      width: 180,
      ellipsis: true,
      search: false
    },
    {
      title: '??????',
      key: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 200,
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
              ????????????
            </Link>
            {XZQUMid === record.value.XZQHM ? (
              <>
                {/* <Popconfirm
                  title="???????????????????????????????????????????????????"
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
                      message.success('????????????');
                      getData();
                    }
                  }}
                  onCancel={(e) => {
                    setDatas(record);
                    setTitles('????????????');
                    setIsModalVisible(true);
                  }}
                  okText="????????????"
                  cancelText="????????????"
                >
                  <a href="#">????????????</a>
                </Popconfirm> */}
                <a
                  href="#"
                  onClick={() => {
                    // if (JSInforMation(currentUser)) {
                    setDatas(record);
                    setTitles('????????????');
                    setIsModalVisible(true);
                    // }
                  }}
                >
                  ????????????
                </a>
                <a
                  key="qxzr"
                  onClick={() => {
                    // if (JSInforMation(currentUser)) {
                    setDatas(record);
                    setTitles('???????????????');
                    setIsModalVisible(true);
                    // }
                  }}
                >
                  ???????????????
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
        dataSource={dataSource}
        rowKey="key"
        actionRef={actionRef1}
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
        title={Titles}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
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
            label="?????????"
            rules={[
              {
                required: true,
                message: '???????????????'
              }
            ]}
          >
            <Input.TextArea placeholder="?????????" rows={4} maxLength={255} showCount />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

HaveAccess.wrappers = ['@/wrappers/auth'];
export default HaveAccess;
