import { useEffect, useRef, useState } from 'react';
import { Link, useModel } from 'umi';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { getSchoolsTK } from '@/services/after-class-qxjyj/jyjgsj';
import Style from './index.less';
import { getTableWidth } from '@/utils';
import SchoolSelect from '@/components/Search/SchoolSelect';
import SearchLayout from '@/components/Search/Layout';
import Semester from '@/components/Semester';

// 退课
const ReimbursementClass = () => {
  // 获取到当前学校的一些信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const actionRef = useRef<ActionType>();
  const [XNXQ, setXNXQ] = useState<string>('');
  const [curSchool, setCurSchool] = useState<string>();
  const [dataSource, setDataSourse] = useState<any>();

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
      title: '课后服务退订数',
      dataIndex: 'khfwtd_count',
      key: 'khfwtd_count',
      align: 'center',
      width: 120
    },
    {
      title: '课程退订数',
      dataIndex: 'kctd_count',
      key: 'kctk_count',
      align: 'center',
      width: 100
    },
    {
      title: '增值服务退订数',
      dataIndex: 'fwtd_count',
      key: 'fwtk_count',
      align: 'center',
      width: 120
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
              pathname: '/courseManagement/reimbursementClass/tabs',
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

  const getData = async () => {
    const resAll = await getSchoolsTK({
      XZQHM: currentUser?.XZQHM || '',
      XXJBSJId: curSchool,
      // isTK: false,
      XN: XNXQ.substring(0, 9),
      XQ: XNXQ.substring(10, 14),
      pageSize: 0,
      page: 0
    });
    if (resAll.status === 'ok') {
      setDataSourse(resAll.data?.rows);
    }
  };

  const schoolChange = (val: string, auth: any) => {
    setCurSchool(auth?.key);
  };

  useEffect(() => {
    if (XNXQ) {
      getData();
    }
  }, [curSchool, XNXQ]);

  const onSelectChange = (value: string) => {
    setXNXQ(value);
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
          headerTitle={
            <SearchLayout>
              <div>
                <span style={{ fontSize: 14 }}>
                  学年学期：
                  <Semester onChange={onSelectChange} />
                </span>
              </div>
              <SchoolSelect onChange={schoolChange} />
            </SearchLayout>
          }
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
ReimbursementClass.wrappers = ['@/wrappers/auth'];
export default ReimbursementClass;
