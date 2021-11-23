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

const { Option } = Select;
const StateTab = (props: any) => {
  const { DDZT, id } = props.TabState;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
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
      title: '课程类型',
      dataIndex: 'KCTAG',
      key: 'KCTAG',
      align: 'center',
      search: false,
      width: 150,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return <div>{record?.KHBJSJ?.KHKCSJ?.KHKCLX?.KCTAG}</div>;
      }
    },
    {
      title: '课程费用(元)',
      dataIndex: 'KCFY',
      key: 'KCFY',
      align: 'center',
      width: 110,
      render: (_text: any, record: any) => {
        return <div>{record?.KHBJSJ?.FY}</div>;
      }
    },
    {
      title: '教辅费用(元)',
      dataIndex: 'JCFY',
      key: 'JCFY',
      align: 'center',
      width: 110,
      render: (_text: any, record: any) => {
        return <div>{record.DDFY - record?.KHBJSJ?.FY}</div>;
      }
    },
    {
      title: '订单总费用(元)',
      dataIndex: 'DDFY',
      key: 'DDFY',
      align: 'center',
      width: 120
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
      title: '支付方式',
      dataIndex: 'ZFFS',
      key: 'ZFFS',
      align: 'center',
      ellipsis: true,
      width: 150,
      render: (_text: any, record: any) => {
        return record.ZFFS;
      }
    }
  ];
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);
  const [kcmcValue, setKcmcValue] = useState<any>();
  const [kcmcData, setKcmcData] = useState<any[] | undefined>([]);
  const [kclxOptions, setKCLXOptions] = useState<any>();
  const [kclxValue, setKCLXValue] = useState<any>();
  useEffect(() => {
    (async () => {
      // 通过课程数据接口拿到所有的课程
      const khkcResl = await getAllCourses2({
        page: 0,
        pageSize: 0,
        XZQHM: currentUser?.XZQHM,
        KCMC: kcmcValue,
        KHKCLXId: kclxValue
      });
      if (khkcResl.status === 'ok') {
        const KCMC = khkcResl.data.rows?.map((item: any) => ({
          label: item.KCMC,
          value: item.id
        }));
        setKcmcData(KCMC);
      }
    })();
  }, [kclxValue]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (async () => {
      const res = await getOrders({
        XZQHM: currentUser?.XZQHM,
        DDZT,
        DDLX: 0,
        XXJBSJId: id,
        kcmc: kcmcValue,
        KHKCLXId: kclxValue
      });
      setDataSource(res.data?.rows);
      if (!kclxValue) {
        const kclxRes = await getAllKHKCLX({ name: '' });
        if (kclxRes.status === 'ok') {
          const data = kclxRes.data?.map((item: any) => {
            return {
              value: item.id,
              text: item.KCTAG
            };
          });
          setKCLXOptions(data);
        }
      }
    })();
  }, [kcmcValue, kclxValue]);
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
              <div style={{ marginRight: 20 }}>
                课程类型：
                <Select
                  style={{ width: 200 }}
                  value={kclxValue}
                  allowClear
                  placeholder="请选择"
                  onChange={(value) => {
                    setKcmcValue('');
                    setKcmcData([]);
                    setKCLXValue(value);
                  }}
                >
                  {kclxOptions?.map((item: any) => {
                    if (item.value) {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.text}
                        </Option>
                      );
                    }
                    return '';
                  })}
                </Select>
              </div>
              <div>
                课程名称：
                <Select
                  style={{ width: 200 }}
                  value={kcmcValue}
                  allowClear
                  placeholder="请选择"
                  onChange={(value) => {
                    setKcmcValue(value);
                  }}
                >
                  {kcmcData?.map((item: any) => {
                    if (item.label) {
                      return (
                        <Option value={item.label} key={item.label}>
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
