import React, { useEffect, useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import { Button, Input, Rate,Space } from 'antd';
import { Link, useModel } from 'umi';
import { LeftOutlined, } from '@ant-design/icons';
import { getSchoolCoursesEvaluation } from '@/services/after-class-qxjyj/jyjgsj';
import styles from '../index.less';
import { TableListParams } from '@/constant';

const { Search } = Input;
// 点击查询按钮
const OrderInquiry = (props: any) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { state } = props.location;
  const { KCId, KCMC,SSJGLX } = state.data;
  // 列表对象引用，可主动执行刷新等操作
  const actionRef = useRef<ActionType>();
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  const [curSchool, setCurSchool] = useState<string>();

  const columns: ProColumns<any>[] | undefined = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'index',
      width: 60,
      valueType: 'index'
    },
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      width: 160,
      align: 'center'
    },
    {
      title: '所属学段',
      key: 'XD',
      dataIndex: 'XD',
      align: 'center',
      width: 120,
      search: false
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
      width: 180,
      search: false
    },
    {
      title: '课程评分',
      dataIndex: 'PJFS',
      key: 'PJFS',
      align: 'center',
      width: 200,
      render: (text: any) => <Rate count={5} defaultValue={text} disabled={true} />,
    },
    {
      title: '操作',
      align: 'center',
      search: false,
      width: 150,
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
      XXMC: curSchool || "",
      KHKCSJId: KCId,
      SSJGLX,
      page: 0,
      pageSize: 0
    });
    if (res.status === 'ok') {
      setDataSource(res?.data?.rows);
    }
  };
  useEffect(() => {
    ChoseSelect();
  }, [curSchool])
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          history.go(-1);
        }}
        style={{
          marginBottom: '24px',
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
                setCurSchool(val);
              }}
            />
        </span>
      </div>
      <ProTable
        headerTitle={KCMC}
        columns={columns}
        actionRef={actionRef}
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
        dataSource={dataSource}
      />
    </>
  );
};
export default OrderInquiry;
