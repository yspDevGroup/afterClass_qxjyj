import { useEffect, useRef, useState } from 'react';
import { Link, useModel } from 'umi';
import { Select } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { getAllSchools, getSchoolsTK } from '@/services/after-class-qxjyj/jyjgsj';
import Style from './index.less';

const { Option } = Select;
// 退课
const ReimbursementClass = () => {
  // 获取到当前学校的一些信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const actionRef = useRef<ActionType>();
  const [XXId, setXXId] = useState<any>();
  const [XXMC, setXXMC] = useState<string>();
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
      title: '课程退订数',
      dataIndex: 'kctd_count',
      key: 'kctk_count',
      align: 'center',
      width: 100
    },
    {
      title: '服务退订数',
      dataIndex: 'fwtd_count',
      key: 'fwtk_count',
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
  return (
    <>
      <div className={Style.bodyContainer}>
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
                if (value === '') {
                  setXXId(null);
                }
                actionRef?.current?.reload();
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
        <ProTable<any>
          actionRef={actionRef}
          columns={columns}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1
          }}
          scroll={{ x: 800 }}
          request={async () => {
            const resAll = await getSchoolsTK({
              XZQHM: currentUser?.XZQHM,
              XXJBSJId: XXId,
              isTK: false,
              pageSize: 0,
              page: 0
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
ReimbursementClass.wrappers = ['@/wrappers/auth'];
export default ReimbursementClass;
