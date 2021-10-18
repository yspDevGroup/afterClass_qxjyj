// tab 表格切换状态
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React, { useEffect, useState } from 'react';
import { getOrders } from '@/services/after-class-qxjyj/jyjgsj';

import { useModel } from 'umi';
import styles from './index.less';
import WWOpenDataCom from '@/components/WWOpenDataCom';

const StateTab = (props: any) => {
  const { DDZT, id } = props.TabState;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const columns: ProColumns<API.KHXSDD>[] | undefined = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 50,
      fixed: 'left',
      search: false
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      search: false,
      width: 110,
      ellipsis: true,
      fixed: 'left',
      render: (text: any, record: any) => {
        const showWXName = record?.XSJBSJ?.XM === '未知' && record.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={record.WechatUserId} />;
        }
        return record?.XSJBSJ?.XM;
      }
    },
    {
      title: '行政班名称',
      dataIndex: 'XZBJSJ',
      key: 'XZBJSJ',
      align: 'center',
      width: 130,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return `${record?.XSJBSJ?.BJSJ?.NJSJ?.NJMC}${record?.XSJBSJ?.BJSJ?.BJ}`;
      }
    },
    {
      title: '课程班名称',
      dataIndex: 'BJMC',
      key: 'BJMC',
      align: 'center',
      search: false,
      width: 130,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return <div>{record?.KHBJSJ?.BJMC}</div>;
      }
    },
    {
      title: '课程名称',
      dataIndex: 'KCMC',
      key: 'KCMC',
      align: 'center',
      search: false,
      width: 150,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return <div>{record?.KHBJSJ?.KHKCSJ?.KCMC}</div>;
      }
    },
    {
      title: '下单时间',
      dataIndex: 'XDSJ',
      key: 'XDSJ',
      width: 160,
      ellipsis: true,
      align: 'center',
      search: false
    },
    {
      title: '付款时间',
      dataIndex: 'ZFSJ',
      key: 'ZFSJ',
      width: 160,
      align: 'center',
      search: false
    },
    {
      title: '订单费用(元)',
      dataIndex: 'DDFY',
      key: 'DDFY',
      width: 120,
      align: 'center',
      search: false
    },
    {
      title: '订单状态',
      dataIndex: 'DDZT',
      key: 'DDZT',
      width: 100,
      align: 'center',
      search: false
    }
  ];
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (async () => {
      const res = await getOrders({ XZQHM: currentUser?.XZQHM, DDZT, DDLX: 0, XXJBSJId: id });
      setDataSource(res.data.rows);
    })();
  }, []);
  return (
    <>
      <div>
        <ProTable
          columns={columns}
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1,
          }}
          scroll={{ x: 1000 }}
          dataSource={dataSource}
          options={{
            setting: false,
            fullScreen: false,
            density: false,
            reload: false
          }}
          search={false}
        />
      </div>
    </>
  );
};
export default StateTab;
