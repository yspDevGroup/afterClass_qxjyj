import { useEffect, useRef, useState } from 'react';
// import { queryXNXQList } from '@/services/local-services/xnxq';
import { getAllTK } from '@/services/after-class-qxjyj/khtksj';
import { useModel } from 'umi';
import type { ColumnsType } from 'antd/lib/table';
import { Select, Table, Popconfirm, Divider, message } from 'antd';
import Style from './index.less';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';
import WWOpenDataCom from '@/components/WWOpenDataCom';
// import { text } from 'express';
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
  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 50,
      fixed:'left'
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      fixed:'left',
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
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      align: 'center',
      width: 130,
      ellipsis: true,
      render: (text: any, record: any) => {
        return record?.KHBJSJ?.XQSJ?.XXJBSJ?.XXMC;
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
      render: (text: any) => {
        return text?.KHKCSJ?.KCMC;
      }
    },
    {
      title: '课程班名称  ',
      dataIndex: 'KHBJSJ',
      key: 'KHBJSJ',
      align: 'center',
      width: 150,
      ellipsis: true,
      render: (text: any) => {
        return text?.BJMC;
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
      title: '状态',
      dataIndex: 'ZT',
      key: 'ZT',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (record: any) => {
        return record.ZT === 0 ? '申请中' : '退课';
      }
    },
    {
      title: '申请时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      ellipsis: true,
      align: 'center'
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
            defaultCurrent: 1,
          }}
          scroll={{ x: 1300 }}
          request={async () => {
            const resAll = await getAllTK({
              XNXQId: '',
              XZQHM: currentUser?.XZQHM,
              XXJBSJId: XXId || null
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
