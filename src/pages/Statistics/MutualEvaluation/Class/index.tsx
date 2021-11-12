import { useEffect, useState } from 'react';
import { Rate, Button, Input, Select, message } from 'antd';
import { Link } from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { LeftOutlined } from '@ant-design/icons';
import { getClassesEvaluation } from '@/services/after-class-qxjyj/khbjsj';
import styles from '../index.less';
import { getAllXNXQ } from '@/services/after-class-qxjyj/xnxq';
import { getCurrentXQ } from '@/utils';
import WWOpenDataCom from '@/components/WWOpenDataCom';

const { Search } = Input;
const { Option } = Select;
const Class = (props: any) => {
  const { state } = props.location;
  const { XXJBSJId, KHKCSJId, XXMC, KCMC } = state;
  // 选择学年学期
  const [term, setTerm] = useState<string>();
  // 学年学期列表数据
  const [termList, setTermList] = useState<any>();
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);
  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '课程班名称',
      dataIndex: 'BJMC',
      key: 'BJMC',
      width: 160,
      fixed: 'left',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '主班',
      dataIndex: 'KHBJJs',
      key: 'KHBJJs',
      width: 100,
      align: 'center',
      render: (_, record) => {
        return record?.KHBJJs.map((item: any) => {
          const showWXName = item?.JZGJBSJ?.XM === '未知' && item.WechatUserId;
          if (showWXName) {
            return <WWOpenDataCom type="userName" openid={item.WechatUserId} />;
          }
          return <div key={item.id}>{item?.JZGJBSJ?.XM}</div>;
        });
      }
    },
    {
      title: '评价人数',
      dataIndex: 'pj_count',
      key: ' pj_count',
      align: 'center',
      width: 100
    },
    {
      title: '课程班人数',
      dataIndex: 'pj_count',
      key: 'pj_count ',
      align: 'center',
      width: 110
    },
    {
      title: '课程班评分',
      dataIndex: 'pj_avg',
      key: 'pj_avg',
      align: 'center',
      width: 180,
      render: (text: any, record: any) => {
        const fs = Number(Number(record.pj_avg).toFixed(1)) || 0;
        return <Rate allowHalf defaultValue={fs} disabled={true} />;
      }
    },
    {
      title: '操作',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <>
          <Link
            to={{
              pathname: '/statistics/MutualEvaluation/Details',
              state: {
                type: 'detail',
                data: {
                  ...record,
                  XXJBSJId,
                  XNXQId: term
                }
              }
            }}
          >
            详情
          </Link>
        </>
      )
    }
  ];
  const getCourseList = async (kcdm: string, xnxq?: string) => {
    const res = await getClassesEvaluation({
      XNXQId: xnxq,
      KHKCSJId: kcdm
    });
    if (res?.status === 'ok') {
      setDataSource(res?.data?.rows);
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
      getCourseList(KHKCSJId, currentXQ?.id || data[0].id);
    } else {
      message.error(res.message);
    }
  };
  useEffect(() => {
    getXNXQ(XXJBSJId);
  }, []);
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
      <div className={styles.searchs}>
        {/* <span>
          课程班名称:
          <Search
            allowClear
            style={{ width: 200, marginLeft: 16 }}
          />
        </span> */}
        <span>
          所属学年学期：
          <Select
            value={term}
            style={{ width: 200 }}
            onChange={(value: string) => {
              setTerm(value);
              getCourseList(KHKCSJId, value);
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
      <ProTable
        headerTitle={KCMC + ' / ' + XXMC}
        columns={columns}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        scroll={{ x: 950 }}
        dataSource={dataSource}
        rowKey="id"
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
      />
    </>
  );
};
Class.wrappers = ['@/wrappers/auth'];
export default Class;
