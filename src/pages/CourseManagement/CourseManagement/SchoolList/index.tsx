/*
 * @description:
 * @author: wsl
 * @Date: 2021-09-09 17:50:48
 * @LastEditTime: 2021-10-18 15:10:53
 * @LastEditors: Sissle Lynn
 */
/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-24 14:37:02
 * @LastEditTime: 2021-09-07 18:48:07
 * @LastEditors: wsl
 */
import React, { useRef } from 'react';
import ProTable, { RequestData } from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Link, useModel, history } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import styles from './index.less';
import { TableListParams } from '@/constant';
import { getAllSchools, JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { Button, Tag } from 'antd';
import EllipsisHint from '@/components/EllipsisHint';

const SchoolManagement = (props: any) => {
  const { state } = props.location;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // 列表对象引用，可主动执行刷新等操作
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      align: 'center'
    },
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      align: 'center',
      width: 160,
      ellipsis: true,
      render: (_, record) => {
        return (
          <Link
            to={{
              pathname: '/courseManagement/courseManagement/schoolList/schoolInfos',
              state: record
            }}
          >
            {record.XXJBSJ.XXMC}
          </Link>
        );
      }
    },
    {
      title: '所属学段',
      key: 'XD',
      dataIndex: 'XD',
      align: 'center',
      valueType: 'select',
      filters: true,
      onFilter: true,
      width: 150,
      render: (_, record) => {
        return record.XXJBSJ.XD;
      }
    },
    {
      title: '联系人',
      key: 'LXR',
      dataIndex: 'LXR',
      align: 'center',
      width: 120,
      render: (_, record) => {
        return record.XXJBSJ.LXR;
      }
    },
    {
      title: '联系电话',
      key: 'LXDH',
      dataIndex: 'LXDH',
      align: 'center',
      width: 140,
      render: (_, record) => {
        return record.XXJBSJ.LXDH;
      }
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <div className={styles.operation}>
          <Link
            to={{
              pathname: '/courseManagement/courseManagement/schoolList/classInfo',
              state: record
            }}
          >
            课程班列表
          </Link>
        </div>
      )
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
      <div className={styles.SchoolManagement}>
        <ProTable<any>
          columns={columns}
          className={styles.schoolTable}
          actionRef={actionRef}
          search={false}
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1,
          }}
          scroll={{ x: 800 }}
          request={async (
            params: any & {
              pageSize?: number;
              current?: number;
              keyword?: string;
            },
            sort,
            filter
          ): Promise<Partial<RequestData<any>>> => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            const opts: TableListParams = {
              ...params,
              sorter: sort && Object.keys(sort).length ? sort : undefined,
              filter
            };
            const resJYJGSJ = await JYJGSJ({ id: currentUser!.jyjId! });
            const resgetAllSchools = await getAllSchools({
              XZQHM: resJYJGSJ.data.XZQH,
              XXMC: '',
              page: 0,
              pageSize: 0
            });
            if (resgetAllSchools.status === 'ok') {
              return {
                data: state.KHKCSQs,
                total: state.KHKCSQs.length,
                success: true
              };
            }
            return {};
          }}
          options={{
            setting: false,
            fullScreen: false,
            density: false,
            reload: false,
            search: {
              placeholder: '学校名称'
            }
          }}
          rowKey="id"
          dateFormatter="string"
        />
      </div>
    </>
  );
};

SchoolManagement.wrappers = ['@/wrappers/auth'];
export default SchoolManagement;
