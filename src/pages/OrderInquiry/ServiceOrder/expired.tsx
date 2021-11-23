// tab 表格切换状态
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getOrders } from '@/services/after-class-qxjyj/jyjgsj';

import { useModel } from 'umi';
import styles from './index.less';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getKHZZFW } from '@/services/after-class-qxjyj/khzzfw';
import { getKHXXZZFW } from '@/services/after-class-qxjyj/khxxzzfw';
import { getTableWidth } from '@/utils';
import SearchLayout from '@/components/Search/Layout';

const { Option } = Select;
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
      fixed: 'left',
      width: 50
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      fixed: 'left',
      width: 110,
      ellipsis: true,
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
      title: '服务名称',
      dataIndex: 'KHXXZZFW',
      key: 'KHXXZZFW',
      align: 'center',
      width: 180,
      ellipsis: true,
      render: (text: any, record: any) => {
        return <div>{record?.KHXXZZFW?.FWMC}</div>;
      }
    },
    {
      title: '服务类型',
      dataIndex: 'KHKCFWLX',
      key: 'KHKCFWLX',
      align: 'center',
      width: 180,
      ellipsis: true,
      render: (text: any, record: any) => {
        return <div>{record?.KHXXZZFW?.KHZZFW?.FWMC}</div>;
      }
    },
    {
      title: '订单费用(元)',
      dataIndex: 'DDFY',
      key: 'DDFY',
      width: 120,
      align: 'center'
    },
    {
      title: '下单时间',
      dataIndex: 'XDSJ',
      key: 'XDSJ',
      width: 160,
      align: 'center'
    },
    {
      title: '付款时间',
      dataIndex: 'ZFSJ',
      key: 'ZFSJ',
      width: 160,
      align: 'center'
    },
    {
      title: '支付方式',
      dataIndex: 'ZFFS',
      key: 'ZFFS',
      align: 'center',
      ellipsis: true,
      width: 150,
      render: (_text: any, record: any) => {
        return record.ZFFS;
      },
    }
  ];
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);
  const [fwlxData, setFwlxData] = useState<any[] | undefined>([]);
  const [zzfwData, setZzfwData] = useState<any[] | undefined>([]);
  const [zzfwValue, setZzfwValue] = useState<string | undefined>();
  const [fwlxValue, setFwlxValue] = useState<string | undefined>();

  useEffect(() => {
    getData();
  }, [fwlxValue, zzfwValue])

  const getData = async () => {
    const res = await getOrders({
      XZQHM: currentUser?.XZQHM,
      DDZT,
      DDLX: 1,
      XXJBSJId: id,
      KHZZFWId: fwlxValue,
      KHXXZZFWId: zzfwValue
    });
    setDataSource(res.data?.rows);

    const fwlxRes = await getKHZZFW({ XXJBSJId: id })
    if (fwlxRes.status === 'ok') {
      const FWLX = fwlxRes?.data?.rows?.map((item: any) => ({
        label: item.FWMC,
        value: item.id,
      }));
      setFwlxData(FWLX);
    }
    const zzfwRes = await getKHXXZZFW({ XXJBSJId: id, KHZZFWId: fwlxValue })
    if (zzfwRes.status === 'ok') {
      const ZZFW = zzfwRes?.data?.rows?.map((item: any) => ({
        label: item.FWMC,
        value: item.id,
      }));
      setZzfwData(ZZFW);
    }
  }
  return (
    <>
      <div>
        <ProTable
          columns={columns}
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1
          }}
          scroll={{ x: getTableWidth(columns) }}
          dataSource={dataSource}
          options={{
            setting: false,
            fullScreen: false,
            density: false,
            reload: false
          }}
          search={false}
          headerTitle={
            <SearchLayout>
              <div>
                服务类型：
                <Select
                  style={{ width: 200 }}
                  value={fwlxValue}
                  allowClear
                  placeholder="请选择"
                  onChange={(value) => {
                    setZzfwValue('');
                    setZzfwData([]);
                    setFwlxValue(value);
                  }}
                >
                  {fwlxData?.map((item: any) => {
                    if (item.value) {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.label}
                        </Option>
                      );
                    }
                    return '';
                  })}
                </Select>
              </div>
              <div>
                服务名称：
                <Select
                  style={{ width: 200 }}
                  value={zzfwValue}
                  allowClear
                  placeholder="请选择"
                  onChange={(value) => {
                    setZzfwValue(value);
                  }}
                >
                  {zzfwData?.map((item: any) => {
                    if (item.value) {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.label}
                        </Option>
                      );
                    }
                    return '';
                  })}
                </Select>
              </div>
            </SearchLayout>
          }
        />
      </div>
    </>
  );
};
export default StateTab;
