/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-27 10:01:58
 * @LastEditTime: 2021-08-30 10:31:28
 * @LastEditors: wsl
 */
/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-27 09:50:10
 * @LastEditTime: 2021-08-27 10:09:16
 * @LastEditors: wsl
 */
import React, { useEffect, useRef, useState } from 'react';
import { Col, message, Modal, Popconfirm, Row, Image } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from '../data';
import styles from './index.less';
import { getKHJGRZSQ, updateKHJGRZSQ } from '@/services/after-class-qxjyj/khjgrzsq';
import { getAllInstitutions, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { useModel } from '@/.umi/plugin-model/useModel';

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
      title: '机构名称',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      search: false
    },
    {
      title: '状态',
      dataIndex: 'ZT',
      key: 'ZT',
      align: 'center',
      search: false
    },
    {
      title: '开始时间',
      dataIndex: 'KSSJ',
      key: 'KSSJ',
      align: 'center',
      valueType: 'dateTime',
      ellipsis: true,
      search: false
    },
    {
      title: '结束时间',
      dataIndex: 'JSSJ',
      key: 'JSSJ',
      align: 'center',
      valueType: 'dateTime',
      ellipsis: true,
      search: false
    },
    {
      title: '原因',
      dataIndex: 'BZ',
      key: 'BZ',
      align: 'center',
      ellipsis: true,
      search: false
    },
    {
      title: '审批人',
      dataIndex: 'SPR',
      key: 'SPR',
      align: 'center',
      ellipsis: true,
      search: false
    }
  ];
  return (
    <div className={styles.OrganizationManagement}>
      <ProTable<any>
        columns={columns}
        actionRef={actionRef4}
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
          const zt = {
            申请中: 0,
            已通过: 1,
            已驳回: 2,
            正常结束: 3,
            异常结束: 4
          };
          const res = await getKHJGRZSQ(
            {
              ZT: [zt.已驳回, zt.正常结束, zt.异常结束],
              name: typeof opts.keyword === 'undefined' ? '' : opts.keyword,
              page: 0,
              pageSize: 0
            },
            opts
          );
          if (res.status === 'ok') {
            let newArr: any[] = [];
            res.data?.rows.forEach((value: any) => {
              const { QYMC } = value.KHJYJG;
              let state;
              if (value.ZT === 2) {
                state = '已驳回';
              } else if (value.ZT === 4) {
                state = '异常结束';
              } else if (value.ZT === 3 && value.LX === 0) {
                state = '正常结束';
              } else if (value.ZT === 3 && value.LX === 1) {
                state = '移出黑名单';
              } else if (value.ZT === 1 && value.LX === 1) {
                state = '加入黑名单';
              }
              const data = {
                value,
                JGMC: QYMC,
                KSSJ: value.createdAt,
                JSSJ: value.updatedAt,
                SPR: value.SPR,
                BZ: value.BZ,
                ZT: state
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
    </div>
  );
};

export default Historys;
