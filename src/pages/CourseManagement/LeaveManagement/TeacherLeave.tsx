import { useRef, useState } from 'react';
// import { message } from 'antd';
import { Tag, Tooltip } from 'antd';
import Style from './index.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getTableWidth } from '@/utils';
import EllipsisHint from '@/components/EllipsisHint';
import { getAllKHJSQJ } from '@/services/after-class-qxjyj/khjsqj';
import SemesterSelect from '@/components/Search/SemesterSelect';
import SearchLayout from '@/components/Search/Layout';

const TeacherLeave = (props: { state: any }) => {
  const actionRef = useRef<ActionType>();
  const { state } = props;
  const { id, xzqhm, xxmc } = state;
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  // 学年学期Id
  const getList = async (xnxq?: string) => {
    const resAll = await getAllKHJSQJ({
      XNXQId: xnxq,
      // XZQHM: xzqhm,
      XXJBSJId: id,
      QJZT: [1, 2]
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
      title: '教师姓名',
      dataIndex: 'JSXM',
      key: 'JSXM',
      align: 'center',
      fixed: 'left',
      width: 120,
      render: (text: any, record: any) => {
        const showWXName = record?.JZGJBSJ?.XM === '未知' && record?.JZGJBSJ?.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={record?.JZGJBSJ?.WechatUserId} />;
        }
        return record?.JZGJBSJ?.XM;
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
            text={record.KHJSQJKCs?.map((item: any) => {
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
            text={record.KHJSQJKCs?.map((item: any) => {
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
      render: (text: any, record: any) => {
        return record?.QJZT === 1 ? '已通过' : '已驳回';
      }
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
            {record.KHJSQJKCs?.[0].QJRQ} {record.KSSJ}
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
            {record.KHJSQJKCs?.[0].QJRQ} {record.JSSJ}
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
              <SemesterSelect XXJBSJId={id} onChange={termChange} />
            </SearchLayout>
          }
        />
      </div>
    </>
  );
};
TeacherLeave.wrappers = ['@/wrappers/auth'];
export default TeacherLeave;
