import React, { useEffect, useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Input, Rate, Space, Tag } from 'antd';
import { Link, useModel } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import { getSchoolCoursesEvaluation } from '@/services/after-class-qxjyj/jyjgsj';
import styles from '../index.less';
import EllipsisHint from '@/components/EllipsisHint';
import { getTableWidth } from '@/utils';
import SearchLayout from '@/components/Search/Layout';
import Semester from '@/components/Semester';

const { Search } = Input;
// 点击查询按钮
const OrderInquiry = (props: any) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { state } = props.location;
  const { KCId, KCMC, SSJGLX } = state.data;
  // 列表对象引用，可主动执行刷新等操作
  const actionRef = useRef<ActionType>();
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  const [curSchool, setCurSchool] = useState<string>();
  const [XNXQ, setXNXQ] = useState<string>('');

  const columns: ProColumns<any>[] | undefined = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'index',
      fixed: 'left',
      width: 50,
      valueType: 'index'
    },
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      fixed: 'left',
      width: 160,
      align: 'center'
    },
    {
      title: '所属学段',
      key: 'XD',
      dataIndex: 'XD',
      align: 'center',
      width: 140,
      search: false,
      render: (_: any, record: any) => {
        const data = record?.XD?.split(/,/g);
        return (
          <EllipsisHint
            width="100%"
            text={
              data?.length &&
              data?.map((item: any) => {
                return <Tag key={item}>{item}</Tag>;
              })
            }
          />
        );
      }
    },
    {
      title: '联系人',
      key: 'LXR',
      dataIndex: 'LXR',
      align: 'center',
      width: 130,
      search: false
    },
    {
      title: '联系电话',
      key: 'LXDH',
      dataIndex: 'LXDH',
      align: 'center',
      width: 120,
      search: false
    },
    {
      title: '课程评分',
      dataIndex: 'PJFS',
      key: 'PJFS',
      align: 'center',
      width: 180,
      render: (_: any, record: any) => {
        const fs = Number(Number(record.PJFS).toFixed(1)) || 0;
        return <Rate allowHalf defaultValue={fs} disabled={true} />;
      }
    },
    {
      title: '操作',
      align: 'center',
      search: false,
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space>
            <Link
              to={{
                pathname: '/statistics/MutualEvaluation/class',
                state: {
                  XXJBSJId: record?.id,
                  KHKCSJId: KCId,
                  XXMC: record?.XXMC,
                  KCMC: KCMC
                }
              }}
            >
              详情
            </Link>
          </Space>
        );
      }
    }
  ];
  const ChoseSelect = async () => {
    const res = await getSchoolCoursesEvaluation({
      XZQHM: currentUser?.XZQHM,
      XXMC: curSchool || '',
      KHKCSJId: KCId,
      SSJGLX,
      XN: XNXQ.substring(0, 9),
      XQ: XNXQ.substring(10, 14),
      page: 0,
      pageSize: 0
    });
    if (res.status === 'ok') {
      setDataSource(res?.data?.rows);
    }
  };
  useEffect(() => {
    if (XNXQ) {
      ChoseSelect();
    }
  }, [curSchool, XNXQ]);

  const onSelectChange = (value: string) => {
    setXNXQ(value);
  };
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
      <ProTable
        columns={columns}
        actionRef={actionRef}
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        scroll={{ x: getTableWidth(columns) }}
        dataSource={dataSource}
        headerTitle={
          <SearchLayout>
            <div>
              <span style={{ fontSize: 14 }}>
                学年学期：
                <Semester onChange={onSelectChange} />
              </span>
            </div>
            <div>
              <label htmlFor="xxmc">学校名称：</label>
              <Search
                allowClear
                onSearch={(val) => {
                  setCurSchool(val);
                }}
              />
            </div>
          </SearchLayout>
        }
      />
    </>
  );
};
export default OrderInquiry;
