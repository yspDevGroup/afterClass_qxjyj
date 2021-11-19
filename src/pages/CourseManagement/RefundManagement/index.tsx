import { useEffect, useRef, useState } from 'react';
import { getAllAbsences } from '@/services/after-class-qxjyj/khxsqj';
// import { message } from 'antd';
import { Link, useModel } from 'umi';
import { Select } from 'antd';
import Style from './index.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAllSchools, getSchoolsTK } from '@/services/after-class-qxjyj/jyjgsj';

const { Option } = Select;
const RefundManagement = () => {
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
      title: '课程退款次数',
      dataIndex: 'kctk_count',
      key: 'kctk_count',
      align: 'center',
      width: 100
    },
    {
      title: '服务退款次数',
      dataIndex: 'fwtk_count',
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
              pathname: '/courseManagement/refundManagement/tabs',
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
          scroll={{ x: 900 }}
          request={async () => {
            const resAll = await getSchoolsTK({
              XZQHM: currentUser?.XZQHM,
              XXJBSJId: XXId,
              isTK: true,
              page: 0,
              pageSize: 0
            });
            if (resAll.status === 'ok') {
              return {
                data: resAll?.data?.rows,
                success: true,
                total: resAll?.data?.count?.length
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
RefundManagement.wrappers = ['@/wrappers/auth'];
export default RefundManagement;
