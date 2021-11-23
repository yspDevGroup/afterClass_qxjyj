import { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import styles from './index.less';
import { getAllKHXSTK } from '@/services/after-class-qxjyj/khxstk';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import SemesterSelect from '@/components/Search/SemesterSelect';
import SearchLayout from '@/components/Search/Layout';
import { getTableWidth } from '@/utils';

// 退款
const SchoolRefund = (props: { state: any }) => {
  const { state } = props;
  // 获取到当前学校的一些信息
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<any>([]);
  // table表格数据
  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 60
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      fixed: 'left',
      align: 'center',
      width: 100,
      render: (_text: any, record: any) => {
        const showWXName = record?.XSJBSJ?.XM === '未知' && record?.XSJBSJ?.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={record?.XSJBSJ?.WechatUserId} />;
        }
        return record?.XSJBSJ?.XM;
      }
    },
    {
      title: '订单编号',
      dataIndex: 'TKBH',
      key: 'TKBH',
      align: 'center',
      ellipsis: true,
      width: 150
    },
    {
      title: '行政班名称',
      dataIndex: 'XZBJSJ',
      key: 'XZBJSJ',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return `${record?.XSJBSJ?.BJSJ?.NJSJ?.NJMC}${record?.XSJBSJ?.BJSJ?.BJ}`;
      }
    },
    {
      title: '课程名称',
      dataIndex: 'KHBJSJ',
      key: 'KHBJSJ',
      align: 'center',
      render: (text: any, record: any) => {
        return record?.KHBJSJ?.KHKCSJ?.KCMC;
      },
      ellipsis: true,
      width: 100
    },
    {
      title: '课程班名称',
      dataIndex: 'KHBJSJ',
      key: 'KHBJSJ',
      align: 'center',
      render: (text: any, record: any) => {
        return record?.KHBJSJ?.BJMC;
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
      dataIndex: 'SPSJ',
      key: 'SPSJ',
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
    }
  ];

  const getData = async (xnxq?: string) => {
    const resAll = await getAllKHXSTK({
      XXJBSJId: state?.id,
      XNXQId: xnxq,
      TKZT: [3],
      LX: 0,
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
SchoolRefund.wrappers = ['@/wrappers/auth'];
export default SchoolRefund;
