import { useRef, useState } from 'react';
// import { queryXNXQList } from '@/services/local-services/xnxq';
import { getKHTKSJ } from '@/services/after-class-qxjyj/khtksj';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import SemesterSelect from '@/components/Search/SemesterSelect';
import SearchLayout from '@/components/Search/Layout';
import { getTableWidth } from '@/utils';

import Style from './index.less';

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
      title: '课程名称 ',
      dataIndex: 'KHBJSJ',
      key: 'KHBJSJ',
      align: 'center',
      width: 120,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return record?.KHBJSJ?.KHKCSJ?.KCMC;
      }
    },
    {
      title: '课程班名称  ',
      dataIndex: 'KHBJSJ',
      key: 'KHBJSJ',
      align: 'center',
      width: 150,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return record?.KHBJSJ?.BJMC;
      }
    },
    {
      title: '退课课时数',
      dataIndex: 'KSS',
      key: 'KSS',
      width: 100,
      ellipsis: true,
      align: 'center'
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
      width: 100,
      ellipsis: true,
      render: (_, record) => {
        return record.ZT === 0 ? '申请中' : record.ZT === 1 ? '已退课' : '已驳回';
      }
    }
  ];

  const getData = async (xnxq?: string) => {
    const resAll = await getKHTKSJ({
      XXJBSJId: id,
      XNXQId: xnxq,
      LX: 0,
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
