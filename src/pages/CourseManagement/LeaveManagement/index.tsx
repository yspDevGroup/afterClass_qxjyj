import { useEffect, useRef, useState } from 'react';
// import { message } from 'antd';
import { Link, useModel } from 'umi';
import Style from './index.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getTableWidth } from '@/utils';
import { getSchoolsQJ } from '@/services/after-class-qxjyj/jyjgsj';
import SchoolSelect from '@/components/Search/SchoolSelect';
import SearchLayout from '@/components/Search/Layout';

const LeaveManagement = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const actionRef = useRef<ActionType>();

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
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      align: 'center',
      width: 150,
      fixed: 'left',
      ellipsis: true
    },
    {
      title: '联系人',
      dataIndex: 'LXR',
      key: 'LXR',
      align: 'center',
      width: 100,
      ellipsis: true
    },
    {
      title: '联系电话',
      dataIndex: 'LXDH',
      key: 'LXDH',
      align: 'center',
      width: 150,
      ellipsis: true
    },
    {
      title: '教师请假人次',
      dataIndex: 'js_count',
      key: 'js_count',
      align: 'center',
      width: 100
    },
    {
      title: '学生请假人次',
      dataIndex: 'xs_count',
      key: 'xs_count',
      align: 'center',
      width: 100
    },
    {
      title: '操作',
      dataIndex: 'JSSJ',
      key: 'JSSJ',
      align: 'center',
      width: 160,
      fixed: 'right',
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <Link
            key="kcxq"
            to={{
              pathname: '/courseManagement/leaveManagement/tabs',
              state: {
                id: record.id,
                xzqhm: currentUser?.XZQHM,
                xxmc: record.XXMC
              }
            }}
          >
            详情
          </Link>
        );
      }
    }
  ];

  const [curSchool, setCurSchool] = useState<string>();
  const [dataSource, setDataSourse] = useState<any>();

  const getData = async () => {
    const resAll = await getSchoolsQJ({
      XZQHM: currentUser?.XZQHM,
      XXJBSJId: curSchool,
      page: 0,
      pageSize: 0
    });
    if (resAll.status === 'ok') {
      setDataSourse(resAll.data?.rows);
    }
  };

  const schoolChange = (val: string, auth: any) => {
    setCurSchool(auth.key);
  }

  useEffect(()=>{
    getData();
  },[curSchool])

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
          headerTitle={
            <SearchLayout>
              <SchoolSelect onChange={schoolChange} />
            </SearchLayout>
          }
          search={false}
        />
      </div>
    </>
  );
};
LeaveManagement.wrappers = ['@/wrappers/auth'];
export default LeaveManagement;
