import { useState } from 'react';
// import { message } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';

import { useModel, history } from 'umi';
import { Button, Tag } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getClasses } from '@/services/after-class-qxjyj/reports';
import ProTable from '@ant-design/pro-table';
import EllipsisHint from '@/components/EllipsisHint';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getTableWidth } from '@/utils';
import SemesterSelect from '@/components/Search/SemesterSelect';
import SearchLayout from '@/components/Search/Layout';
import styles from './index.less';

const AfterSchoolClass = (props: any) => {
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  const { state } = props.location;
  const { KHKCSJId, XXJBSJId } = state.data;
  const getCourseList = async (kcdm: string, xnxq?: string) => {
    const res = await getClasses({
      XNXQId: xnxq,
      KHKCSJId: kcdm,
      isFW: 0
    });
    if (res?.status === 'ok') {
      setDataSource(res?.data?.rows);
    }
  };
  // / table表格数据
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
      align: 'center',
      ellipsis: true,
      fixed: 'left',
      width: 140
    },
    {
      title: '任课教师',
      dataIndex: 'RKJS',
      key: 'RKJS',
      align: 'center',
      render: (test: any, record: any) => {
        return (
          <>
            {record?.KHBJSJ ? (
              <EllipsisHint
                width="100%"
                text={record?.KHBJSJ?.KHBJJs?.map((item: any) => {
                  const showWXName = item?.JZGJBSJ?.XM === '未知' && item?.JZGJBSJ?.WechatUserId;
                  if (showWXName) {
                    return <WWOpenDataCom type="userName" openid={item?.JZGJBSJ?.WechatUserId} />;
                  }
                  return <Tag key={item.id}>{item?.JZGJBSJ?.XM}</Tag>;
                })}
              />
            ) : (
              '-'
            )}
          </>
        );
      },
      width: 120,
      ellipsis: true
    },
    {
      title: '适用年级',
      dataIndex: 'KKFW',
      key: 'KKFW',
      align: 'center',
      render: (text: any) => {
        return (
          <EllipsisHint
            width="100%"
            text={
              text &&
              text.split(',')?.map((item: any) => {
                return <Tag key={item.id}>{item}</Tag>;
              })
            }
          />
        );
      },
      width: 150
    },
    {
      title: '课时数',
      dataIndex: 'KSS',
      key: 'KSS',
      align: 'center',
      width: 90,
      ellipsis: true
    },
    {
      title: '报名人数',
      dataIndex: 'BMXSS',
      key: 'BMXSS',
      align: 'center',
      width: 90,
      ellipsis: true
    },
    {
      title: '报名人次',
      dataIndex: 'BMRS',
      key: 'BMRS',
      align: 'center',
      width: 90,
      ellipsis: true
    },
    {
      title: '退课人数',
      dataIndex: 'TKXSS',
      key: 'TKXSS',
      align: 'center',
      width: 100,
      ellipsis: true
    },
    {
      title: '退课人次',
      dataIndex: 'TKRS',
      key: 'TKRS',
      align: 'center',
      width: 100,
      ellipsis: true
    }
  ];

  const termChange = (val: string) => {
    getCourseList(KHKCSJId, val);
  };

  return (
    <>
      <div>
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
        <ProTable
          className={styles.XxList}
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1
          }}
          scroll={{ x: getTableWidth(columns) }}
          columns={columns}
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
            <>
              <SearchLayout>
                <SemesterSelect XXJBSJId={XXJBSJId} onChange={termChange} />
              </SearchLayout>
              <p className={styles.courseName}>
                课程名称：{state?.data?.KCMC} <span>学校名称：{state?.data?.XXMC}</span>
              </p>
            </>
          }
        />
      </div>
    </>
  );
};
AfterSchoolClass.wrappers = ['@/wrappers/auth'];
export default AfterSchoolClass;
