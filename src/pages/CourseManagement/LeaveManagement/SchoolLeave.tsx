import { useRef, useState } from 'react';
import { getAllAbsences } from '@/services/after-class-qxjyj/khxsqj';
// import { message } from 'antd';
import { Tag, Tooltip } from 'antd';
import Style from './index.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getTableWidth } from '@/utils';
import EllipsisHint from '@/components/EllipsisHint';
import SemesterSelect from '@/components/Search/SemesterSelect';
import SearchLayout from '@/components/Search/Layout';

const SchoolLeave = (props: { state: any }) => {
  const actionRef = useRef<ActionType>();
  const { state } = props;
  const { id, xzqhm, xxmc } = state;
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  const getList = async (xnxq?: string) => {
    const resAll = await getAllAbsences({
      XNXQId: xnxq,
      XZQHM: xzqhm,
      XXJBSJId: id
    });
    if (resAll.status === 'ok') {
      setDataSource(resAll?.data?.rows);
    }
  };

  // table表格数据
  const columns: ProColumns<any>[] = [
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
      width: 120,
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
      width: 120,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return `${record?.XSJBSJ?.BJSJ?.NJSJ?.NJMC}${record?.XSJBSJ?.BJSJ?.BJ}`;
      }
    },
    {
      title: '课程名称',
      dataIndex: 'KHQJKCs',
      key: 'KHQJKCs',
      align: 'center',
      width: 160,
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={record.KHQJKCs?.map((item: any) => {
              return <Tag key={item.KCMC}>{item.KCMC}</Tag>;
            })}
          />
        );
      }
    },
    {
      title: '课程班名称',
      dataIndex: 'KHQJKCs',
      key: 'KHQJKCs_BJMC',
      align: 'center',
      width: 150,
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={record.KHQJKCs?.map((item: any) => {
              return <Tag key={item.KHBJSJ?.id}>{item.KHBJSJ?.BJMC}</Tag>;
            })}
          />
        );
      }
    },
    {
      title: '请假原因',
      dataIndex: 'QJYY',
      key: 'QJYY',
      align: 'center',
      ellipsis: true,
      width: 160,
      render: (_: any, record: any) => {
        return (
          <Tooltip placement="topLeft" title={record?.QJYY}>
            <span
              className="ant-typography ant-typography-ellipsis ant-typography-single-line"
              style={{ width: '100%', margin: '0px', padding: '0px' }}
            >
              {record?.QJYY}
            </span>
          </Tooltip>
        );
      }
    },
    {
      title: '请假状态',
      dataIndex: 'QJZT',
      key: 'QJZT',
      align: 'center',
      width: 100,
      render: (text: any) => (text ? '已取消' : '已通过')
    },
    {
      title: '请假开始时间',
      dataIndex: 'KSSJ',
      key: 'KSSJ',
      align: 'center',
      width: 160,
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <>
            {record.KHQJKCs?.[0].QJRQ} {record.KSSJ}
          </>
        );
      }
    },
    {
      title: '请假结束时间',
      dataIndex: 'JSSJ',
      key: 'JSSJ',
      align: 'center',
      width: 160,
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <>
            {record.KHQJKCs?.[0].QJRQ} {record.JSSJ}
          </>
        );
      }
    }
  ];

  const termChange = (val: string) => {
    getList(val);
  }
  return (
    <>
      <div className={Style.bodyContainer}>
        <ProTable<any>
          actionRef={actionRef}
          columns={columns}
          rowKey="id"
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
              <SemesterSelect XXJBSJId={id} onChange={termChange} />
            </SearchLayout>
          }
        />
      </div>
    </>
  );
};
SchoolLeave.wrappers = ['@/wrappers/auth'];
export default SchoolLeave;
