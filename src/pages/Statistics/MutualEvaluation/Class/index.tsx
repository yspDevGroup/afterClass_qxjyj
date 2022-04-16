import { useState } from 'react';
import { Rate, Button } from 'antd';
import { Link } from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { LeftOutlined } from '@ant-design/icons';
import { getClassesEvaluation } from '@/services/after-class-qxjyj/khbjsj';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getTableWidth } from '@/utils';
import SemesterSelect from '@/components/Search/SemesterSelect';
import SearchLayout from '@/components/Search/Layout';
import styles from './index.less';

const Class = (props: any) => {
  const { state } = props.location;
  const { XXJBSJId, KHKCSJId, XXMC, KCMC } = state;
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
      title: '课程班人数',
      dataIndex: 'xs_count',
      key: 'xs_count ',
      align: 'center',
      width: 110
    },
    {
      title: '评价人数',
      dataIndex: 'pj_count',
      key: ' pj_count',
      align: 'center',
      width: 100
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
                XXJBSJId,
                XXMC,
                data: {
                  ...record
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

  const termChange = (val: string) => {
    getCourseList(KHKCSJId, val);
  };

  return (
    <div className={styles.ClassPJ}>
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
      <div className={styles.TopSearchss}>
        <span>学校名称：{XXMC}</span>
        <span style={{ marginLeft: '20px' }}>课程名称：{KCMC}</span>
      </div>
      <ProTable
        columns={columns}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        scroll={{ x: getTableWidth(columns) }}
        dataSource={dataSource}
        rowKey="id"
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
        headerTitle={
          <SearchLayout>
            <SemesterSelect XXJBSJId={XXJBSJId} onChange={termChange} />
          </SearchLayout>
        }
      />
    </div>
  );
};
Class.wrappers = ['@/wrappers/auth'];
export default Class;
