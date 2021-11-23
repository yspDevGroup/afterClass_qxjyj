

import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useEffect, useRef, useState } from 'react';
import { Select, Space } from 'antd';
import { Link, useModel } from 'umi';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';
import { getTableWidth } from '@/utils';
import SearchLayout from '@/components/Search/Layout';

const { Option } = Select;
// 点击查询按钮
const PatrolClass = () => {
  const SubmitTable = () => { };
  const columns: ProColumns<any>[] | undefined = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'index',
      valueType: 'index'
    },
    {
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      align: 'center'
    },
    {
      title: '所属学段',
      key: 'XD',
      dataIndex: 'XD',
      align: 'center',
      search: false
    },
    {
      title: '联系人',
      key: 'LXR',
      dataIndex: 'LXR',
      align: 'center',
      width: 110,
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
      title: '课程数量',
      key: 'KHKCSQs',
      dataIndex: 'KHKCSQs',
      align: 'center',
      width: 90,
      search: false,
      render: (_, record) => {
        const num1 = record.KHKCSQs?.length;
        const num2 = record.KHKCSJs?.length;
        const num = num1! + num2!;
        return <div>{num}</div>;
      }
    },
    {
      title: '巡课详情',
      align: 'center',
      search: false,
      render: (_, record) => {
        return (
          <Space>
            <Link
              to={{
                pathname: '/PatrolClassManagement/PatrolClass/Detail',
                state: record
              }}
            >
              详情
            </Link>

          </Space>
        );
      }
    }
  ];
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // 列表对象引用，可主动执行刷新等操作
  const actionRef = useRef<ActionType>();
  const [SchoolList, setSchoolList] = useState<any>([]);
  const [curSchool, setCurSchool] = useState<string>();
  const [dataSource, setDataSourse] = useState<any[]>([]);

  const getData = async () => {
    const res = await getAllSchools({
      XZQHM: currentUser?.XZQHM,
      XXMC: curSchool || "",
      page: 0,
      pageSize: 0
    });
    if (res.status === 'ok') {
      setDataSourse(res.data?.rows);
    }
  };

  useEffect(() => {
    (async () => {
      const res2 = await getAllSchools({
        XZQHM: currentUser?.XZQHM,
        page: 0,
        pageSize: 0
      });
      if (res2.data?.rows?.length) {
        setSchoolList(res2.data.rows);
      }
    })();
  }, []);

  useEffect(()=>{
    getData();
  },[curSchool])

  return (
    <>
      <ProTable
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onSubmit={SubmitTable}
        columns={columns}
        dataSource={dataSource}
        actionRef={actionRef}
        scroll={{ x: getTableWidth(columns) }}
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
        headerTitle={
          <SearchLayout>
            <label htmlFor='xxmc'>学校名称：</label>
            <Select
              onChange={(value: string) => {
                setCurSchool(value);
              }}
              allowClear
            >
              {SchoolList.map((item: any) => {
                return (
                  <Option value={item.XXMC} key={item.XXMC}>
                    {item.XXMC}
                  </Option>
                );
              })}
            </Select>
          </SearchLayout>
        }
      />
    </>
  );
};
PatrolClass.wrappers = ['@/wrappers/auth'];
export default PatrolClass;
