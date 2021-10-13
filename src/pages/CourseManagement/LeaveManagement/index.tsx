import { useEffect, useRef, useState } from 'react';
// import { queryXNXQList } from '@/services/local-services/xnxq';
import { getAllAbsences } from '@/services/after-class-qxjyj/khxsqj';
// import { message } from 'antd';
import { useModel } from 'umi';
import { Select } from 'antd';
import Style from './index.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';

const { Option } = Select;
const LeaveManagement = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const actionRef = useRef<ActionType>();

  const [XXMC, setXXMC] = useState<string>();
  const [XXId, setXXId] = useState<any>();
  const [SchoolData, setSchoolData] = useState<any>();

  useEffect(() => {
    actionRef.current?.reload();
  }, [XXId]);

  useEffect(() => {
    (async () => {
      const res = await getAllSchools({
        XZQHM: currentUser?.XZQHM,
        page: 0,
        pageSize: 0
      });
      if (res.status === 'ok') {
        setSchoolData(res.data.rows);
      }
    })();
  }, []);

  // table表格数据
  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 50
    },
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      align: 'center',
      width: 130,
      ellipsis: true,
      render: (text: any, record: any) => record.KHQJKCs?.[0].KHBJSJ.XQSJ.XXJBSJ.XXMC
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      width: 80,
      render: (text: any, record: any)=>{
        return record?.XSJBSJ?.XM
      },
      ellipsis: true
    },
    {
      title: '课程名称',
      dataIndex: 'KHQJKCs',
      key: 'KHQJKCs',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (text: any, record: any) => {
        return record.KHQJKCs?.[0].KCMC;
      }
    },
    {
      title: '课程班名称',
      dataIndex: 'KHQJKCs',
      key: 'KHQJKCs_BJMC',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (text: any, record: any) => {
        return record.KHQJKCs?.[0].KHBJSJ.BJMC;
      }
    },
    {
      title: '请假原因',
      dataIndex: 'QJYY',
      key: 'QJYY',
      align: 'center',
      ellipsis: true,
      width: 120,
    },
    {
      title: '请假状态',
      dataIndex: 'QJZT',
      key: 'QJZT',
      align: 'center',
      width: 80,
      render: (text: any) => (text ? '已取消' : '已通过')
    },
    {
      title: '请假开始时间',
      dataIndex: 'KSSJ',
      key: 'KSSJ',
      align: 'center',
      width: 120,
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
      width: 120,
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
  return (
    <>
      <div className={Style.TopSearchs}>
        <span>
          学校名称：
          <Select
            value={XXMC || ''}
            showSearch
            style={{ width: 200 }}
            onChange={(value: string, key: any) => {
              setXXMC(value);
              setXXId(key?.key);
            }}
          >
            <Option key="" value="">
              全部
            </Option>
            {SchoolData?.map((item: any) => {
              return (
                <Option key={item.id} value={item.XXMC}>
                  {item.XXMC}
                </Option>
              );
            })}
          </Select>
        </span>
      </div>
      <div className={Style.leaveWrapper}>
        <ProTable<any>
          actionRef={actionRef}
          columns={columns}
          rowKey="id"
          request={async () => {
            const resAll = await getAllAbsences({
              XNXQId: '',
              XZQHM: currentUser?.XZQHM,
              XXJBSJId: XXId || ''
            });
            if (resAll.status === 'ok') {
              return {
                data: resAll?.data?.rows,
                success: true,
                total: resAll?.data?.count
              };
            }
            return {
              data: [],
              success: false,
              total: 0
            };
          }}
          options={{
            setting: false,
            fullScreen: false,
            density: false,
            reload: false
          }}
          search={false}
        />
      </div>
    </>
  );
};
LeaveManagement.wrappers = ['@/wrappers/auth'];
export default LeaveManagement;
