import { useEffect, useRef, useState } from 'react';
// import { queryXNXQList } from '@/services/local-services/xnxq';
import { getAllTK } from '@/services/after-class-qxjyj/khtksj';
import { Select, message, Button } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getAllXNXQ } from '@/services/after-class-qxjyj/xnxq';
import { getCurrentXQ } from '@/utils';
import { LeftOutlined } from '@ant-design/icons';

import Style from './index.less';

const { Option } = Select;
// 退课
const SchoolReimbursement = (props: any) => {
  const actionRef = useRef<ActionType>();
  const { state } = props.location;
  const { id, xzqhm, xxmc } = state;
  // 选择学年学期
  const [term, setTerm] = useState<string>();
  // 学年学期列表数据
  const [termList, setTermList] = useState<any>();
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  const getList = async (xnxq?: string) => {
    const resAll = await getAllTK({
      XNXQId: xnxq,
      XZQHM: xzqhm,
      XXJBSJId: id,
      page: 0,
      pageSize: 0
    });
    if (resAll.status === 'ok') {
      setDataSource(resAll?.data?.rows);
    }
  };
  const getXNXQ = async (xxdm: string) => {
    const res = await getAllXNXQ({
      XXJBSJId: xxdm
    });
    if (res?.status === 'ok') {
      const { data = [] } = res;
      const currentXQ = getCurrentXQ(data);
      const term = [].map.call(data, (item: any) => {
        return {
          value: item.id,
          text: `${item.XN} ${item.XQ}`
        };
      });
      setTermList(term);
      setTerm(currentXQ?.id || data[0].id);
      getList(currentXQ?.id);
    } else {
      message.error(res.message);
    }
  };
  useEffect(() => {
    getXNXQ(id);
  }, []);
  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 50,
      fixed: 'left'
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      fixed: 'left',
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
      render: (_text: any, record: any) => {
        return record?.KHBJSJ?.KHKCSJ?.KCMC;
      }
    },
    {
      title: '课程班名称  ',
      dataIndex: 'KHBJSJ',
      key: 'KHBJSJ',
      align: 'center',
      width: 150,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return record?.KHBJSJ?.BJMC;
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
      render: (_, record) => {
        return record.ZT === 0 ? '申请中' : record.ZT === 1 ? '已退课' : '已驳回';
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
      <div className={Style.bodyContainer}>
        <div className={Style.TopSearchs}>
          <span>
            所属学年学期：
            <Select
              value={term}
              style={{ width: 200 }}
              onChange={(value: string) => {
                setTerm(value);
                getList(value);
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
        <ProTable<any>
          actionRef={actionRef}
          columns={columns}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1
          }}
          scroll={{ x: 1300 }}
          dataSource={dataSource}
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
SchoolReimbursement.wrappers = ['@/wrappers/auth'];
export default SchoolReimbursement;
