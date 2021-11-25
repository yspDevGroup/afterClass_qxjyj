import { useEffect, useRef, useState } from 'react';
// import { queryXNXQList } from '@/services/local-services/xnxq';
import { getAllTK, getKHTKSJ } from '@/services/after-class-qxjyj/khtksj';
import { Select, message, Button } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getAllXNXQ } from '@/services/after-class-qxjyj/xnxq';
import { getCurrentXQ } from '@/utils';
import SemesterSelect from '@/components/Search/SemesterSelect';
import SearchLayout from '@/components/Search/Layout';
import { getTableWidth } from '@/utils';

import Style from './index.less';

// 退课
const ServiceUnsubscribe = (props: { state: any }) => {
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
      width: 50,
      fixed: 'left'
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
        const showWXName = record?.XSJBSJ?.XM === '未知' && record?.XSJBSJ?.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={record?.XSJBSJ?.WechatUserId} />;
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
      title: '服务类型',
      dataIndex: 'KHZZFW',
      key: 'KHZZFW',
      align: 'center',
      width: 120,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return record?.KHXXZZFW?.KHZZFW?.FWMC;
      }
    },
    {
      title: '服务名称  ',
      dataIndex: 'KHXXZZFW',
      key: 'KHXXZZFW',
      align: 'center',
      width: 150,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return record?.KHXXZZFW?.FWMC;
      }
    },
    {
      title: '服务开始日期',
      dataIndex: 'KSRQ',
      key: 'KSRQ',
      align: 'center',
      render: (_, record) => {
        return record?.KHXXZZFW?.KSRQ;
      },
      width: 150
    },
    {
      title: '服务结束日期',
      dataIndex: 'JSRQ',
      key: 'JSRQ',
      align: 'center',
      render: (_, record) => {
        return record?.KHXXZZFW?.JSRQ;
      },
      width: 150
    },
    {
      title: '申请时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (_, record) => {
        return record?.createdAt?.substring(0, 16);
      },
      width: 150
    },
    {
      title: '审批人',
      dataIndex: 'SPR',
      key: 'SPR',
      align: 'center',
      ellipsis: true,
      width: 100,
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
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      ellipsis: true,
      render: (_, record) => {
        return record?.updatedAt?.replace(/T/, ' ').substring(0, 16);
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
      title: '状态',
      dataIndex: 'ZT',
      key: 'ZT',
      align: 'center',
      valueEnum: {
        0: {
          text: '申请中',
          status: 'Processing'
        },
        1: {
          text: '已完成',
          status: 'Success'
        },
        2: {
          text: '已驳回',
          status: 'Error'
        }
      },
      width: 90
    }
  ];

  const getData = async (xnxq?: string) => {
    const resAll = await getKHTKSJ({
      XXJBSJId: id,
      XNXQId: xnxq,
      LX: 1,
      ZT: [0, 1, 2],
      page: 0,
      pageSize: 0
    });
    if (resAll.status === 'ok') {
      setDataSource(resAll?.data?.rows);
    }
  };

  const termChange = (val: string) => {
    getData(val);
  }

  return (
    <>
      <div className={Style.bodyContainer}>
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
    </>
  );
};
ServiceUnsubscribe.wrappers = ['@/wrappers/auth'];
export default ServiceUnsubscribe;
