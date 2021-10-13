/* eslint-disable react/no-unstable-nested-components */
/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-29 15:00:08
 * @LastEditTime: 2021-10-13 09:54:38
 * @LastEditors: Sissle Lynn
 */
import React, { useEffect, useRef } from 'react';
import { message, Popconfirm, Form, Tag, Button } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from '../data';
import styles from './index.less';
import { Link, useModel, history } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import { getCoursesBySchool } from '@/services/after-class-qxjyj/jyjgsj';
import EllipsisHint from '@/components/EllipsisHint';

const HaveIntroduced = (props: any) => {
  const { state } = props.location;
  const { initialState } = useModel('@@initialState');
  const actionRef1 = useRef<ActionType>();
  useEffect(() => {
    actionRef1?.current?.reload();
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 58,
      align: 'center'
    },
    {
      title: '课程名称',
      dataIndex: 'KCMC',
      key: 'KCMC',
      align: 'center',
      search: false,
      width: 150,
      ellipsis: true
    },
    {
      title: '课程类型',
      dataIndex: 'KCLX',
      key: 'KCLX',
      align: 'center',
      search: false,
      width: 120,
      ellipsis: true
    },
    {
      title: '课程来源',
      dataIndex: 'KCLY',
      key: 'KCLY',
      align: 'center',
      search: false,
      width: 120,
      ellipsis: true
    },
    {
      title: '机构名称',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      search: false,
      width: 150,
      ellipsis: true
    },
    {
      title: '适用年级',
      dataIndex: 'SYNJ',
      key: 'SYNJ',
      align: 'center',
      search: false,
      width: 300,
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
      title: '操作',
      key: 'option',
      valueType: 'option',
      align: 'center',
      width: 200,
      render: (text, record, action) => {
        return (
          <div className={styles.operation}>
            <Link
              key="kcxq"
              to={{
                pathname: '/schoolManagement/courseList/courseInfo',
                state: record.value
              }}
            >
              课程详情
            </Link>
            <Link
              key="bjxq"
              to={{
                pathname: '/schoolManagement/courseList/classList',
                state: {
                  value: record.value,
                  xxmc: state.XXMC
                }
              }}
            >
              课程班列表
            </Link>
          </div>
        );
      }
    }
  ];
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          history.goBack();
        }}
        style={{
          marginBottom: '24px'
        }}
      >
        <LeftOutlined />
        返回上一页
      </Button>
      <div className={styles.ToIntroduce}>
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
            const res = await getCoursesBySchool({
              XXJBSJId: state.id,
              XNXQId: '',
              KCMC: opts.keyword || ''
            });
            if (res.status === 'ok') {
              let newArr: any[] = [];
              res.data?.forEach((value: any) => {
                const { KCMC, NJSJs, KHKCJs, KHKCLX, SSJGLX, KHKCSQs } = value;
                const data = {
                  value,
                  KCMC: KCMC,
                  SYNJ: NJSJs,
                  DKLS: KHKCJs,
                  KCLY: SSJGLX,
                  KCLX: KHKCLX.KCTAG,
                  JGMC: KHKCSQs.length !== 0 ? KHKCSQs[0].KHJYJG.QYMC : '-'
                };
                newArr.push(data);
              });

              if (newArr.length === res.data?.length) {
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
          toolBarRender={() => [<span key="XXMC">{state?.XXMC}</span>]}
        />
      </div>
    </>
  );
};

HaveIntroduced.wrappers = ['@/wrappers/auth'];
export default HaveIntroduced;
