/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-10-12 14:46:08
 * @LastEditTime: 2021-10-18 10:37:32
 * @LastEditors: Sissle Lynn
 */
import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { useModel, Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Input, Select } from 'antd';
import { getAllSchools, getClassesByCourse, getCoursesInfo } from '@/services/after-class-qxjyj/jyjgsj';

import styles from './index.less';

const { Search } = Input;
const School = (props: any) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { state } = props.location;
  const { KCId, KCMC } = state.data;
  const [XXMC, setXXMC] = useState<string>('');
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  // table表格数据
  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      width: 120,
      ellipsis: true,
      align: 'center',
      render:(_,record)=>{
        return record?.XXJBSJ?.XXMC
      }
    },
    {
      title: '学段',
      dataIndex: 'XD',
      key: 'XD',
      width: 100,
      ellipsis: true,
      align: 'center',
      render:(_,record)=>{
        return record?.XXJBSJ?.XD
      }
    },
    {
      title: '课程班数量',
      dataIndex: 'bj_count',
      key: 'bj_count',
      align: 'center',
      width: 100,
      ellipsis: true,
    },
    {
      title: '报名人数',
      dataIndex: 'BMRS',
      key: 'BMRS',
      align: 'center',
      width: 100,
      ellipsis: true,
    },
    {
      title: '退课人数',
      dataIndex: 'TKRS',
      key: 'TKRS',
      align: 'center',
      width: 100,
      ellipsis: true,
    },
    {
      title: '退课比例',
      dataIndex: 'TKBL',
      key: 'TKBL',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (test: any,record: any) => {
        const num =  record.TKRS!=0 ? (record.TKRS/ record.BMRS)*100 + '%':0;
        return num;
      },
    },
    {
      title: '收款金额',
      dataIndex: 'SKJE',
      key: 'SKJE',
      align: 'center',
      width: 100,
      ellipsis: true,
    },
    {
      title: '退款金额',
      dataIndex: 'TKJE',
      key: 'TKJE',
      align: 'center',
      width: 100,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      width: 120,
      ellipsis: true,
      render: (_, record) => (
        <>
          <Link
            to={{
              pathname: '/statistics/afterSchoolCourse/detail',
              state: {
                type: 'detail',
                data: {
                  XXJBSJId: record?.XXJBSJId,
                  KHKCSJId: KCId,
                  XXMC: record?.XXJBSJ?.XXMC,
                  KCMC: KCMC
                },
              },
            }}
          >
            详情
          </Link>
        </>
      ),
    },
  ];
  const ChoseSelect = async () => {
    const res3 = await getClassesByCourse({
      XZQHM: currentUser?.XZQHM,
      KHKCSJId: KCId,
      XXMC
    });
    if (res3.status === 'ok') {
      setDataSource(res3?.data?.rows);
    }
  };
  useEffect(() => {
    ChoseSelect();
  }, [XXMC])
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
        <div className={styles.searchs}>
          <span>
            学校名称：
            <Search
              allowClear
              style={{ width: 200 }}
              onSearch={(val) => {
                setXXMC(val)
              }}
            />
          </span>
        </div>
        <ProTable
          headerTitle={KCMC}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          search={false}
          options={{
            setting: false,
            fullScreen: false,
            density: false,
            reload: false,
          }}
        />
      </div>
    </>
  );
};

School.wrappers = ['@/wrappers/auth'];
export default School;
