import { useEffect, useRef, useState } from 'react';
import { getAllAbsences } from '@/services/after-class-qxjyj/khxsqj';
// import { message } from 'antd';
import { message, Select, Tag, Tooltip } from 'antd';
import Style from './index.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getAllXNXQ } from '@/services/after-class-qxjyj/xnxq';
import { getCurrentXQ } from '@/utils';
import EllipsisHint from '@/components/EllipsisHint';
import { getAllKHJSQJ } from '@/services/after-class-qxjyj/khjsqj';

const { Option } = Select;
const TeacherLeave = (props: { state: any }) => {
  const actionRef = useRef<ActionType>();
  const { state } = props;
  const { id, xzqhm, xxmc } = state;
  // 选择学年学期
  const [term, setTerm] = useState<string>();
  // 学年学期列表数据
  const [termList, setTermList] = useState<any>();
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  // 学年学期Id
  const [curXNXQId, setCurXNXQId] = useState<any>();
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
      setCurXNXQId(currentXQ?.id);
      getList(currentXQ?.id);
    } else {
      message.error(res.message);
    }
  };
  useEffect(() => {
    getXNXQ(id);
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
  return (
    <>
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
TeacherLeave.wrappers = ['@/wrappers/auth'];
export default TeacherLeave;
