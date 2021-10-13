import ProTable, { ActionType, ProColumns, RequestData } from '@ant-design/pro-table';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Rate, Select, Space } from 'antd';
import { Link, useModel } from 'umi';
import { LeftOutlined, } from '@ant-design/icons';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';
import styles from '../index.less';
import { TableListParams } from '@/constant';

const { Option } = Select;
// 点击查询按钮
const OrderInquiry = (props: any) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { state } = props.location;
  const { KCId, KCMC } = state.data;
  // 列表对象引用，可主动执行刷新等操作
  const actionRef = useRef<ActionType>();
  const [SchoolList, setSchoolList] = useState<any>([]);
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
  useEffect(() => {
    (async () => {
      const res = await getAllSchools({
        XZQHM: currentUser?.XZQHM,
        page: 0,
        pageSize: 0
      });
      if (res.status === 'ok' && res.data) {
        setSchoolList(res.data.rows);
      }
    })();
  }, []);

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
          <Select
            style={{ width: 200 }}
            onChange={(value: string) => {
              setCurSchool(value);
              actionRef.current?.reload();
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
        request={async (
          params: any & {
            pageSize?: number;
            current?: number;
            keyword?: string;
          },
          sort,
          filter,
        ): Promise<Partial<RequestData<any>>> => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const opts: TableListParams = {
            ...params,
            sorter: sort && Object.keys(sort).length ? sort : undefined,
            filter,
          };
          const res = await getAllSchools({
            XZQHM: currentUser?.XZQHM,
            XXMC: curSchool || "",
            page: 0,
            pageSize: 0
          }, opts);
          if (res.status === 'ok') {
            return {
              data: res.data?.rows,
              total: res.data?.count,
              success: true,
            };
          }
          return {
            data: [],
            total: 0,
            success: true,
          };
        }}
      />
    </>
  );
};
export default OrderInquiry;
