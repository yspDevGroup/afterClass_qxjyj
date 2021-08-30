/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-29 15:00:08
 * @LastEditTime: 2021-08-30 15:04:04
 * @LastEditors: wsl
 */
/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-26 11:45:40
 * @LastEditTime: 2021-08-29 14:54:30
 * @LastEditors: wsl
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, message, Popconfirm, Row, Tabs, Image, Modal, Form, Input, Tag } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from '../data';
import styles from '../index.less';
import { blockKHJGRZSQ, getKHJGRZSQ, updateKHJGRZSQ } from '@/services/after-class-qxjyj/khjgrzsq';
import { Link, useModel } from 'umi';
import { getCourses } from '@/services/after-class-qxjyj/jyjgsj';
import EllipsisHint from '@/components/EllipsisHint';
import { updateKHKCSJ } from '@/services/after-class-qxjyj/khkcsj';

const HaveIntroduced = (props: { Keys: string | undefined; state: any }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { Keys, state } = props;
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { username, jyjId, id } = currentUser!;
  const actionRef1 = useRef<ActionType>();
  const [Datas, setDatas] = useState<TableListItem>();
  const [Titles, setTitles] = useState<string>();
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
    const { SQR, SQRId, XZQHM, KHJYJGId } = Datas!.value;
    if (Titles === '异常取消') {
      const data = {
        ZT: 4,
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
        message.success('取消成功');
        actionRef1?.current?.reload();
      }
    } else {
      const data = {
        ...Datas!.value,
        BZ: params.BZ
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
      title: '课程名称',
      dataIndex: 'KCMC',
      key: 'KCMC',
      align: 'center',
      search: false
    },
    {
      title: '适用年级',
      dataIndex: 'SYNJ',
      key: 'SYNJ',
      align: 'center',
      search: false,
      render: (text: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={text?.map((item: any) => {
              return <Tag key={item.id}>{item.XD === '初中' ? `${item.NJMC}` : `${item.XD}${item.NJMC}`}</Tag>;
            })}
          />
        );
      }
    },
    {
      title: '代课老师',
      dataIndex: 'DKLS',
      key: 'DKLS',
      align: 'center',
      search: false,
      render: (text: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={text?.map((item: any) => {
              return <Tag key={item.KHJSSJ.id}>{item.KHJSSJ.XM}</Tag>;
            })}
          />
        );
      }
    },
    {
      title: '准入学校',
      dataIndex: 'ZRXX',
      key: 'ZRXX',
      align: 'center',
      search: false,
      render: (text: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={text?.map((item: any) => {
              return <Tag key={item.XXJBSJ.id}>{item.XXJBSJ.XXMC}</Tag>;
            })}
          />
        );
      }
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
                pathname: '/organizationManagement/courseList/courseInfo',
                state: record
              }}
            >
              课程详情
            </Link>

            <Popconfirm
              key="zr"
              title="确定取消引入该课程?"
              onConfirm={async () => {
                const data = {
                  KCZT: 1
                };

                const res = await updateKHKCSJ({ id: record.value.id }, data);
                if (res.status === 'ok') {
                  message.success('取消成功');
                  actionRef1?.current?.reload();
                }
              }}
              okText="确定"
              cancelText="取消"
              placement="topRight"
            >
              <a>取消引入</a>
            </Popconfirm>
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
            placeholder: '搜索课程名称'
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
          const res = await getCourses({
            JGId: state.value.id,
            KCMC: '',
            KCZT: [2],
            page: 0,
            pageSize: 0
          });
          if (res.status === 'ok') {
            let newArr: any[] = [];
            res.data?.rows.forEach((value: any) => {
              const { KCMC, NJSJs, KHKCJs, KHKCSQs } = value;
              const data = {
                value,
                KCMC: KCMC,
                SYNJ: NJSJs,
                DKLS: KHKCJs,
                ZRXX: KHKCSQs
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

export default HaveIntroduced;
