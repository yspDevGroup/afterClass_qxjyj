import { useEffect, useRef, useState } from 'react';
// import { queryXNXQList } from '@/services/local-services/xnxq';
import { getAllAbsences } from '@/services/after-class-qxjyj/khxsqj';
// import { message } from 'antd';
import { useModel } from 'umi';
import { Button, message, Select, Tag, Tooltip } from 'antd';
import Style from './index.less';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getAllXNXQ } from '@/services/after-class-qxjyj/xnxq';
import { getCurrentXQ } from '@/utils/utils';
import { LeftOutlined } from '@ant-design/icons';
import EllipsisHint from '@/components/EllipsisHint';

const { Option } = Select;
const SchoolLeave = (props: any) => {
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
    const resAll = await getAllAbsences({
      XNXQId: xnxq,
      XZQHM: xzqhm,
      XXJBSJId: id
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
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      fixed: 'left',
      width: 120,
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
      width: 120,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return `${record?.XSJBSJ?.BJSJ?.NJSJ?.NJMC}${record?.XSJBSJ?.BJSJ?.BJ}`;
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
            text={record.KHQJKCs?.map((item: any) => {
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
            text={record.KHQJKCs?.map((item: any) => {
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
      render: (text: any) => (text ? '已取消' : '已通过')
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
      width: 160,
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
          headerTitle={xxmc}
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
SchoolLeave.wrappers = ['@/wrappers/auth'];
export default SchoolLeave;
