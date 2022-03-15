/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-27 10:01:58
 * @LastEditTime: 2021-10-18 12:02:48
 * @LastEditors: Sissle Lynn
 */
/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-27 09:50:10
 * @LastEditTime: 2021-08-27 10:09:16
 * @LastEditors: wsl
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, message, Modal, Popconfirm, Row, Image, Button } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from './data';
import styles from './index.less';
import { getKHJGRZSQ } from '@/services/after-class-qxjyj/khjgrzsq';
import { JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { useModel, history } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import { getAllSPJL } from '@/services/after-class-qxjyj/khjyjspjl';
import ShowName from '@/components/ShowName';

const Historys = (props: { Keys: string | undefined }) => {
  const { Keys } = props;
  const [Datas, setDatas] = useState<TableListItem>();
  const actionRef4 = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { username, jyjId, id } = currentUser!;

  useEffect(() => {
    actionRef4?.current?.reload();
  }, [Keys]);

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
      width: 180,
      fixed: 'left',
      ellipsis: true,
      search: false,
      render: (_, record: any) => {
        return record?.KHJYJG?.QYMC;
      }
    },
    {
      title: '联系人',
      dataIndex: 'LXR',
      key: 'LXR',
      align: 'center',
      width: 120,
      fixed: 'left',
      ellipsis: true,
      search: false,
      render: (_, record: any) => {
        return record?.KHJYJG?.LXRXM;
      }
    },
    {
      title: '联系电话',
      dataIndex: 'LXDH',
      key: 'LXDH',
      align: 'center',
      width: 160,
      ellipsis: true,
      search: false,
      render: (_, record: any) => {
        return record?.KHJYJG?.LXDH;
      }
    },
    {
      title: '操作类型',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      width: 120,
      ellipsis: true,
      search: false,
      render: (_, record: any) => {
        return (
          <>
            {record?.ZT === 0 ? (
              '准入'
            ) : (
              <>
                {record?.ZT === 1 ? (
                  '结束服务'
                ) : (
                  <>
                    {record?.ZT === 2 ? (
                      '驳回'
                    ) : (
                      <>{record?.ZT === 3 ? '移入黑名单' : <>{record?.ZT === 4 ? '移出黑名单' : ''}</>}</>
                    )}
                  </>
                )}
              </>
            )}
          </>
        );
      }
    },
    {
      title: '操作人',
      dataIndex: 'SPR',
      key: 'SPR',
      align: 'center',
      width: 120,
      ellipsis: true,
      search: false,
      render: (_, record) => <ShowName type="userName" openid={record?.SPRId} XM={record?.SPR} />
    },
    {
      title: '操作时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 160,
      ellipsis: true,
      search: false
    },
    {
      title: '原因',
      dataIndex: 'BZ',
      key: 'BZ',
      align: 'center',
      width: 180,
      ellipsis: true,
      search: false
    }
  ];
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          history.go(-1);
        }}
        style={{
          marginBottom: '24px'
        }}
      >
        <LeftOutlined />
        返回上一页
      </Button>
      <div className={styles.OrganizationManagement}>
        <ProTable<any>
          columns={columns}
          actionRef={actionRef4}
          rowKey="key"
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1
          }}
          scroll={{ x: 1000 }}
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
            const res = await getAllSPJL(
              {
                KHJYJGMC: typeof opts.keyword === 'undefined' ? '' : opts.keyword,
                KHJYJId: jyjId,
                page: 0,
                pageSize: 0
              },
              opts
            );
            if (res.status === 'ok') {
              return {
                data: res.data?.rows,
                total: res.data?.count,
                success: true
              };
            }

            return {};
          }}
          dateFormatter="string"
          toolBarRender={() => []}
        />
      </div>
    </>
  );
};

Historys.wrappers = ['@/wrappers/auth'];
export default Historys;
