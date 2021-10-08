// tab 表格切换状态
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React, { useEffect, useState } from 'react';
import { getOrders } from '@/services/after-class-qxjyj/jyjgsj';

import { useModel } from 'umi';
import styles from './index.less';

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
      width: 60,
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
    },
    {
      title: '服务名称',
      dataIndex: 'KHXXZZFW',
      key: 'KHXXZZFW',
      align: 'center',
      render: (text: any) => {
        return <div>{text?.FWMC}</div>;
      },
    },
    {
      title: '下单时间',
      dataIndex: 'XDSJ',
      key: 'XDSJ',
      align: 'center',
    },
    {
      title: '付款时间',
      dataIndex: 'ZFSJ',
      key: 'ZFSJ',
      align: 'center',
    },
    {
      title: '订单费用(元)',
      dataIndex: 'DDFY',
      key: 'DDFY',
      align: 'center',
    },
    {
      title: '订单状态',
      dataIndex: 'DDZT',
      key: 'DDZT',
      align: 'center',
    },
  ];
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (async () => {
      const res = await getOrders({ XZQHM: currentUser?.XZQHM, DDZT, DDLX: 1, XXJBSJId: id });
      console.log(res.data.rows);
      
      setDataSource(res.data.rows);
    })();
  }, []);
  return (
    <>
      <div>
        {/* <div className={styles.searchs}>

        </div> */}
        <ProTable
          columns={columns}
          // bordered
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
