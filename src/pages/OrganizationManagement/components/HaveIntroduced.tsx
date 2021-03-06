/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-29 15:00:08
 * @LastEditTime: 2022-04-18 09:29:53
 * @LastEditors: Wu Zhan
 */
import React, { useEffect, useRef } from 'react';
import { message, Popconfirm, Form, Tag, Tooltip } from 'antd';
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { TableListItem, TableListParams } from '../data';
import styles from './index.less';
import { Link, useModel } from 'umi';
import { getCourses } from '@/services/after-class-qxjyj/jyjgsj';
import EllipsisHint from '@/components/EllipsisHint';
import { updateKHKCSJ } from '@/services/after-class-qxjyj/khkcsj';
import WWOpenDataCom from '@/components/WWOpenDataCom';

const HaveIntroduced = (props: { Keys: string | undefined; state: any }) => {
  const { Keys, state } = props;

  const actionRef1 = useRef<ActionType>();
  useEffect(() => {
    actionRef1?.current?.reload();
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
      title: '课程名称',
      dataIndex: 'KCMC',
      key: 'KCMC',
      align: 'center',
      search: false,
      width: 160,
      fixed: 'left',
      ellipsis: true
    },
    {
      title: '课程类型',
      dataIndex: 'KCLX',
      key: 'KCLX',
      align: 'center',
      width: 120,
      ellipsis: true,
      search: false
    },
    {
      title: '适用年级',
      dataIndex: 'SYNJ',
      key: 'SYNJ',
      align: 'center',
      search: false,
      width: 200,
      render: (text: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={text?.map((item: any) => {
              return <Tag key={item.id}>{`${item.XD}${item.NJMC}`}</Tag>;
            })}
          />
        );
      }
    },
    {
      title: '任课教师',
      dataIndex: 'DKLS',
      key: 'DKLS',
      align: 'center',
      search: false,
      width: 200,
      render: (text: any, record: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={record?.value?.KHKCJs?.map((item: any) => {
              const showWXName = item?.JZGJBSJ?.XM === '未知' && item?.JZGJBSJ?.WechatUserId;
              if (showWXName) {
                return <WWOpenDataCom type="userName" openid={item?.JZGJBSJ?.WechatUserId} />;
              }
              return <Tag key={item.id}>{item?.JZGJBSJ?.XM}</Tag>;
            })}
          />
        );
      }
    },
    {
      title: '引入学校',
      dataIndex: 'ZRXX',
      key: 'ZRXX',
      align: 'center',
      search: false,
      width: 200,
      render: (text: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={
              text?.length
                ? text.map((item: any) => {
                    return <Tag key={item.XXJBSJ.id}>{item.XXJBSJ.XXMC}</Tag>;
                  })
                : ''
            }
          />
        );
      }
    },
    {
      title: '课程描述',
      dataIndex: 'KCMS',
      key: 'KCMS',
      align: 'center',
      search: false,
      ellipsis: true,
      width: 200,
      render: (text, record) => {
        return (
          <Tooltip placement="topLeft" title={record?.value?.KCMS}>
            <span
              className="ant-typography ant-typography-ellipsis ant-typography-single-line"
              style={{ width: '100%', margin: '0px', padding: '0px' }}
            >
              {record?.value?.KCMS}
            </span>
          </Tooltip>
        );
      }
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (text, record, action) => {
        console.log(record.ZRXX);
        console.log(record);

        return (
          <div className={styles.operation}>
            <Link
              key="jgxq"
              to={{
                pathname: '/organizationManagement/courseList/courseInfo',
                state: record.value
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
    <div className={styles.ToIntroduce}>
      <ProTable<any>
        columns={columns}
        rowKey="key"
        actionRef={actionRef1}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        scroll={{ x: 1300 }}
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
            KCMC: params.keyword,
            KCZT: [2],
            page: 0,
            pageSize: 0
          });
          if (res.status === 'ok') {
            let newArr: any[] = [];
            res.data?.rows.forEach((value: any) => {
              const { KCMC, NJSJs, KHKCJs, KHKCSQs, KHKCLX } = value;
              const data = {
                value,
                KCMC: KCMC,
                SYNJ: NJSJs,
                DKLS: KHKCJs,
                ZRXX: KHKCSQs,
                KCLX: KHKCLX.KCTAG
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
        // eslint-disable-next-line react/no-unstable-nested-components
        toolBarRender={() => [<span key="JGMC">{state.JGMC}</span>]}
      />
    </div>
  );
};

HaveIntroduced.wrappers = ['@/wrappers/auth'];
export default HaveIntroduced;
