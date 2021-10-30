import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import { Button, Select } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { queryXNXQList } from '@/services/local-services/xnxq';
import { LeftOutlined } from '@ant-design/icons';
import styles from './index.less';
import { getAllKHXSTK } from '@/services/after-class-qxjyj/khxstk';
import WWOpenDataCom from '@/components/WWOpenDataCom';

const { Option } = Select;
// 退款
const SchoolRefund = (props: any) => {
  const { state } = props.location;
  // 获取到当前学校的一些信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const actionRef = useRef<ActionType>();
  // 学年学期列表数据
  const [termList, setTermList] = useState<any>();
  // 选择学年学期
  const [curXNXQId, setCurXNXQId] = useState<any>();
  useEffect(() => {
    // 获取学年学期数据的获取
    (async () => {
      const res = await queryXNXQList(state?.id);
      // 获取到的整个列表的信息
      const newData = res.xnxqList;
      const curTerm = res.current;
      if (newData?.length) {
        if (curTerm) {
          setCurXNXQId(curTerm.id);
          setTermList(newData);
        }
      }
    })();
  }, []);
  useEffect(() => {
    actionRef.current?.reload();
  }, [curXNXQId]);
  // table表格数据
  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 60
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
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      width: 100,
      render: (_text: any, record: any) => {
        return record?.XSJBSJ?.XM;
      }
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
        const showWXName = record?.JZGJBSJ?.XM === '未知' && record?.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={record?.WechatUserId} />;
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

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          history.go(-1);
        }}
        style={{
          marginBottom: '24px'
        }}
      >
        <LeftOutlined />
        返回上一页
      </Button>
      <div className={styles.SchoolRefund}>
        <div className={styles.TopSearchs}>
          <span>
            所属学年学期：
            <Select
              value={curXNXQId}
              style={{ width: 200 }}
              onChange={(value: string) => {
                // 更新多选框的值
                setCurXNXQId(value);
              }}
            >
              {termList?.map((item: any) => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.text}
                  </Option>
                );
              })}
            </Select>
          </span>
        </div>
        <div>
          <ProTable<any>
            actionRef={actionRef}
            columns={columns}
            headerTitle={state?.xxmc}
            rowKey="id"
            request={async () => {
              const resAll = await getAllKHXSTK({
                XXJBSJId: state?.id,
                XNXQId: curXNXQId,
                TKZT: [3],
                LX: 0,
                page: 0,
                pageSize: 0
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
      </div>
    </>
  );
};
SchoolRefund.wrappers = ['@/wrappers/auth'];
export default SchoolRefund;
