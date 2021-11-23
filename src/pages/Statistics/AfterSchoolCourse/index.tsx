import { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { useModel, Link } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAllCoursesInfo, } from '@/services/after-class-qxjyj/jyjgsj';
import { getAllKHKCLX } from '@/services/after-class-qxjyj/khkclx';
import styles from './index.less';
import { getTableWidth } from '@/utils';
import SearchLayout from '@/components/Search/Layout';

const { Option } = Select;
const { Search } = Input;
const AfterSchoolCourse = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [KCMC, setKCMC] = useState<string>('');
  const [KCLY, setKCLY] = useState<string>('');
  const [KCLX, setKCLX] = useState<string>('');
  const [KCLXData, setKCLXData] = useState<any>();
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  // table表格数据
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
      title: '课程名称',
      dataIndex: 'KCMC',
      key: 'KCMC',
      fixed: 'left',
      align: 'center',
      width: 120,
      ellipsis: true,
    },
    {
      title: '课程来源',
      dataIndex: 'KCLY',
      key: 'KCLY',
      align: 'center',
      width: 100,
      ellipsis: true,
    },
    {
      title: '课程类型',
      dataIndex: 'KCLX',
      key: 'KCLX',
      align: 'center',
      width: 120,
      ellipsis: true,
    },
    {
      title: '所属机构/学校',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      width: 120,
      ellipsis: true,
      render: (_, record) => {
        return record.KCLY === '校内课程' ? record.XXMC : record.JGMC
      }
    },
    {
      title: '开设课程学校数量',
      dataIndex: 'HZXXS',
      key: 'HZXXS',
      align: 'center',
      width: 130,
      ellipsis: true,
      render: (_, record) => {
        return record.KCLY === '校内课程' ? 1 : record.xx_count
      }
    },
    {
      title: '报名人次',
      dataIndex: 'BMRS',
      key: 'BMRS',
      align: 'center',
      width: 100,
      ellipsis: true,
    },
    {
      title: '退课人次',
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
      render: (test: any, record: any) => {
        const num = record.TKRS != 0 ? (Number((record.TKRS / record.BMRS))*100).toFixed(1) + '%' : 0;
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
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      width: 120,
      ellipsis: true,
      fixed: 'right',
      render: (_, record) => (
        <>
          <Link
            to={{
              pathname: '/statistics/afterSchoolCourse/school',
              state: {
                type: 'detail',
                data: {
                  KCId: record?.KHKCSJId,
                  KCMC: record?.KCMC
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
    const res3 = await getAllCoursesInfo({
      XZQHM: currentUser?.XZQHM,
      KCMC,
      KCLY,
      KCLX
    });
    if (res3.status === 'ok') {
      setDataSource(res3?.data?.rows);
    }
  };
  useEffect(() => {
    (async () => {
      const res = await getAllKHKCLX({});
      if (res.status === 'ok') {
        setKCLXData(res.data);
      }
    })();
  }, [])
  useEffect(() => {
    ChoseSelect();
  }, [KCLX, KCLY, KCMC])
  return (
    <>
      <div>
        <ProTable
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          search={false}
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1,
          }}
          scroll={{ x: getTableWidth(columns) }}
          options={{
            setting: false,
            fullScreen: false,
            density: false,
            reload: false,
          }}
          headerTitle={
            <>
              <SearchLayout>
                <div>
                  <label htmlFor='kcname'>课程名称：</label>
                  <Search placeholder="课程名称" allowClear onSearch={(value: string) => {
                    setKCMC(value);
                  }} />
                </div>
                <div>
                  <label htmlFor='kcly'>课程来源：</label>
                  <Select
                    allowClear
                    placeholder="课程来源"
                    onChange={(value) => {
                      setKCLY(value);
                    }}
                    value={KCLY}
                  >
                    <Option value='校内课程' key='校内课程'>
                      校内课程
                    </Option>
                    <Option value='机构课程' key='机构课程'>
                      机构课程
                    </Option>
                  </Select>
                </div>
                <div>
                  <label htmlFor='kctype'>课程类型：</label>
                  <Select
                    allowClear
                    onChange={(value: string) => {
                      setKCLX(value);
                    }}
                  >
                    {KCLXData?.map((item: any) => {
                      return <Option key={item.id} value={item.KCTAG}>
                        {item.KCTAG}
                      </Option>
                    })}
                  </Select>
                </div>
              </SearchLayout>
            </>
          }
        />
      </div>
    </>
  );
};

AfterSchoolCourse.wrappers = ['@/wrappers/auth'];
export default AfterSchoolCourse;
