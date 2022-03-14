import { useRef, useState } from 'react';
// import { queryXNXQList } from '@/services/local-services/xnxq';
import { getKHTKSJ } from '@/services/after-class-qxjyj/khtksj';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import SemesterSelect from '@/components/Search/SemesterSelect';
import SearchLayout from '@/components/Search/Layout';
import { getTableWidth } from '@/utils';

import Style from './index.less';
import ShowName from '@/components/ShowName';

// 退课
const SchoolReimbursement = (props: { state: any }) => {
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
      title: '课后服务名称',
      dataIndex: 'XSJBSJ',
      key: 'XSJBSJ',
      align: 'center',
      width: 180,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return `${record?.XSFWBJ?.KHFWBJ?.FWMC}`;
      }
    },
    {
      title: '服务开始日期',
      dataIndex: 'KSRQ',
      key: 'KSRQ',
      align: 'center',
      render: (_, record) => {
        return record?.XSFWBJ?.KHFWSJPZ?.KSRQ;
      },
      width: 150
    },
    {
      title: '服务结束日期',
      dataIndex: 'JSRQ',
      key: 'JSRQ',
      align: 'center',
      render: (_, record) => {
        return record?.XSFWBJ?.KHFWSJPZ?.JSRQ;
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
      render: (_, record) => (
        <ShowName type="userName" openid={record?.JZGJBSJ?.WechatUserId} XM={record?.JZGJBSJ?.XM} />
      )
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
      title: '退订状态',
      dataIndex: 'ZT',
      key: 'ZT',
      align: 'center',
      filters: true,
      onFilter: true,
      valueType: 'select',
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
      width: 120
    },
    {
      title: '退款状态',
      dataIndex: 'TKZT',
      key: 'TKZT',
      align: 'center',
      ellipsis: true,
      width: 120,
      render: (_, record) => {
        let TKZT: any = '';
        switch (record?.KHXSTKs?.[0]?.TKZT) {
          case '0':
            TKZT = '申请中';
            break;
          case '1':
            TKZT = '已通过';
            break;
          case '2':
            TKZT = '已驳回';
            break;
          case '3':
            TKZT = '退款成功';
            break;

          default:
            TKZT = '-';
            break;
        }
        return TKZT;
      }
    }
  ];

  const getData = async (xnxq?: string) => {
    const resAll = await getKHTKSJ({
      XXJBSJId: id,
      XNXQId: xnxq,
      LX: 2,
      ZT: [1],
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
SchoolReimbursement.wrappers = ['@/wrappers/auth'];
export default SchoolReimbursement;
