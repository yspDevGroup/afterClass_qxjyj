// tab 表格切换状态
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getOrders } from '@/services/after-class-qxjyj/jyjgsj';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { Select } from 'antd';
import styles from './index.less';
import { getAllKHKCLX } from '@/services/after-class-qxjyj/khkclx';
import { getAllCourses2 } from '@/services/after-class-qxjyj/khkcsj';
import { getTableWidth } from '@/utils';
import SearchLayout from '@/components/Search/Layout';
import { getAllNJSJ } from '@/services/after-class-qxjyj/njsj';

const { Option } = Select;
const AfterTab = (props: any) => {
  const { DDZT, id } = props.TabState;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);
  const [NJValue, setNJValue] = useState<any>();
  const [NjmcData, setNjmcData] = useState<any[] | undefined>([]);
  const columns: ProColumns<API.KHXSDD>[] = [
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
      dataIndex: 'XSJBSJ',
      key: 'XSJBSJ',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return `${record?.XSFWBJ?.KHFWBJ?.BJSJ?.NJSJ?.NJMC}${record?.XSFWBJ?.KHFWBJ?.BJSJ?.BJ}`;
      }
    },
    {
      title: '订单编号',
      dataIndex: 'DDBH',
      key: 'DDBH',
      align: 'center',
      ellipsis: true,
      width: 180
    },
    {
      title: '订单费用(元)',
      dataIndex: 'DDFY',
      key: 'DDFY',
      align: 'center',
      width: 110
    },
    {
      title: '下单时间',
      dataIndex: 'XDSJ',
      key: 'XDSJ',
      align: 'center',
      ellipsis: true,
      width: 150,
      render: (_text: any, record: any) => {
        return record.XDSJ?.substring(0, 16);
      }
    },
    {
      title: '付款时间',
      dataIndex: 'ZFSJ',
      key: 'ZFSJ',
      align: 'center',
      hideInTable: DDZT !== '已付款',
      ellipsis: true,
      width: 150,
      render: (_text: any, record: any) => {
        return record.ZFSJ?.substring(0, 16);
      }
    },
    {
      title: '支付方式',
      dataIndex: 'ZFFS',
      key: 'ZFFS',
      align: 'center',
      ellipsis: true,
      width: 150,
      render: (_text: any, record: any) => {
        return record.ZFFS?.substring(0, 16);
      }
    }
  ];

  useEffect(() => {
    (async () => {
      // 通过课程数据接口拿到所有的课程
      const res = await getAllNJSJ({
        XD: ['小学', '初中']
      });
      if (res.status === 'ok') {
        console.log(res);
        const NJMC = res?.data?.rows?.map((item: any) => ({
          label: `${item?.XD}${item?.NJMC}`,
          value: item?.id
        }));
        setNjmcData(NJMC);
      }
    })();
  }, []);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (async () => {
      const res = await getOrders({
        XZQHM: currentUser?.XZQHM || '',
        DDZT: ['已付款', '已退款'],
        DDLX: 2,
        XXJBSJId: id,
        NJSJId: NJValue
      });
      if (res?.status === 'ok') {
        console.log(11111);
        setDataSource(res.data);
      }
    })();
  }, [NJValue]);
  console.log(dataSource, 'dataSource');
  return (
    <>
      <div>
        <ProTable
          columns={columns}
          dataSource={dataSource}
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1
          }}
          scroll={{ x: getTableWidth(columns) }}
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
                <label htmlFor="kcmc">年级：</label>
                <Select
                  value={NJValue}
                  allowClear
                  placeholder="请选择"
                  onChange={(value) => {
                    setNJValue(value);
                  }}
                >
                  {NjmcData?.map((item: any) => {
                    if (item.label) {
                      return (
                        <Option value={item.value} key={item.label}>
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
export default AfterTab;
