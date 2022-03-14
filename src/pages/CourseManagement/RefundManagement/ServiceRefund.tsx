import { useEffect, useRef, useState } from 'react';
import { getAllTK, getKHTKSJ } from '@/services/after-class-qxjyj/khtksj';
import { Select, message, Button } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getAllXNXQ } from '@/services/after-class-qxjyj/xnxq';
import { getCurrentXQ } from '@/utils';
import styles from './index.less';
import { getAllKHXSTK } from '@/services/after-class-qxjyj/khxstk';
import SemesterSelect from '@/components/Search/SemesterSelect';
import SearchLayout from '@/components/Search/Layout';
import { getTableWidth } from '@/utils';

const { Option } = Select;
// 服务退款
const ServiceRefund = (props: { state: any }) => {
  const actionRef = useRef<ActionType>();
  const { state } = props;
  const { id, xzqhm, xxmc } = state;
  const [dataSource, setDataSource] = useState<any>([]);

  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 58,
      fixed: 'left'
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      width: 100,
      fixed: 'left',
      render: (_text: any, record: any) => {
        return record?.XSJBSJ?.XM;
      }
    },
    {
      title: '订单编号',
      dataIndex: 'TKBH',
      key: 'TKBH',
      align: 'center',
      ellipsis: true,
      width: 180
    },
    {
      title: '行政班名称',
      dataIndex: 'XZBJSJ',
      key: 'XZBJSJ',
      align: 'center',
      width: 120,
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
      render: (text: any, record: any) => {
        return record?.KHXXZZFW?.FWMC;
      },
      ellipsis: true,
      width: 150
    },
    {
      title: '服务类型',
      dataIndex: 'FWLX',
      key: 'FWLX',
      align: 'center',
      render: (text: any, record: any) => {
        return record?.KHXXZZFW?.KHZZFW?.FWMC;
      },
      ellipsis: true,
      width: 120
    },
    {
      title: '退款金额',
      dataIndex: 'TKJE',
      key: 'TKJE',
      align: 'center',
      ellipsis: true,
      width: 100
    },
    {
      title: '申请时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      ellipsis: true,
      render: (_, record) => {
        return record?.createdAt?.substring(0, 16);
      },
      width: 150
    },
    {
      title: '审批人',
      dataIndex: 'JZGJBSJ',
      key: 'JZGJBSJ',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (_, record) => {
        const showWXName = record?.JZGJBSJ?.XM === '未知' && record?.JZGJBSJ?.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={record?.JZGJBSJ?.WechatUserId} />;
        }
        return record?.JZGJBSJ?.XM;
      }
    },
    {
      title: '审批时间',
      dataIndex: 'SPSJ',
      key: 'SPSJ',
      align: 'center',
      ellipsis: true,
      render: (_, record) => {
        return record?.SPSJ?.replace(/T/, ' ').substring(0, 16);
      },
      width: 150
    },
    {
      title: '审批说明',
      dataIndex: 'BZ',
      key: 'BZ',
      align: 'center',
      ellipsis: true,
      width: 180
    },
    {
      title: '退款时间',
      dataIndex: 'TKSJ',
      key: 'TKSJ',
      align: 'center',
      ellipsis: true,
      render: (_, record) => {
        return record?.TKSJ?.substring(0, 16);
      },
      width: 150
    },
    {
      title: '状态',
      dataIndex: 'TKZT',
      key: 'TKZT',
      align: 'center',
      valueEnum: {
        0: {
          text: '申请中',
          status: 'Processing'
        },
        1: {
          text: '审批通过',
          status: 'Processing'
        },
        2: {
          text: '已驳回',
          status: 'Error'
        },
        3: {
          text: '退款成功',
          status: 'Success'
        },
        4: {
          text: '退款失败',
          status: 'Error'
        }
      },
      ellipsis: true,
      width: 120
    }
  ];

  const getData = async (xnxq?: string) => {
    const resAll = await getAllKHXSTK({
      LX: 1,
      TKZT: [3],
      XXJBSJId: id,
      XNXQId: xnxq,
      page: 0,
      pageSize: 0
    });
    if (resAll.status === 'ok') {
      setDataSource(resAll?.data?.rows);
    }
  };

  const termChange = (val: string) => {
    getData(val);
  };

  return (
    <>
      <div className={styles.SchoolRefund}>
        <div>
          <ProTable<any>
            actionRef={actionRef}
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
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
                <SemesterSelect XXJBSJId={state?.id} onChange={termChange} />
              </SearchLayout>
            }
          />
        </div>
      </div>
    </>
  );
};
ServiceRefund.wrappers = ['@/wrappers/auth'];
export default ServiceRefund;
