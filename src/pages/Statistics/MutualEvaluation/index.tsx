import { useEffect, useState } from 'react';
import { Link, useModel } from 'umi';
import { Rate, message, Input, Select } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { getCoursesEvaluation } from '@/services/after-class-qxjyj/jyjgsj';

import styles from './index.less';
import { getAllKHKCLX } from '@/services/after-class-qxjyj/khkclx';
import { getTableWidth } from '@/utils';
import SearchLayout from '@/components/Search/Layout';
import Semester from '@/components/Semester';

const { Search } = Input;
const { Option } = Select;
const MutualEvaluation = (data: any) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [KCMC, setKCMC] = useState<string>('');
  const [KCLX, setKCLX] = useState<string>('');
  const [KCLY, setKCLY] = useState<string>('');
  const [KCLXData, setKCLXData] = useState<any>();
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);
  const [XNXQ, setXNXQ] = useState<string>();
  useEffect(() => {
    (async () => {
      const res = await getAllKHKCLX({});
      if (res.status === 'ok') {
        setKCLXData(res.data);
      }
    })();
  }, []);
  useEffect(() => {
    if (XNXQ) {
      (async () => {
        const res = await getCoursesEvaluation({
          XZQHM: currentUser?.XZQHM,
          KCMC,
          KCLX,
          KCLY,
          XN: XNXQ?.substring(0, 9),
          XQ: XNXQ.substring(10, 14)
        });
        if (res.status === 'ok' && res?.data) {
          setDataSource(res?.data?.rows);
        } else {
          message.error(res.message || '数据获取失败，请联系系统管理员或稍后再试');
        }
      })();
    }
  }, [KCMC, KCLX, KCLY, XNXQ]);
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
      align: 'center',
      width: 150,
      fixed: 'left',
      ellipsis: true
    },
    {
      title: '课程来源',
      dataIndex: 'KHJYJG',
      key: 'KHJYJG',
      width: 120,
      ellipsis: true,
      align: 'center',
      render: (test: any, record: any) => {
        return record.SSJGLX ? record?.SSJGLX : '-';
      }
    },
    {
      title: '课程类型',
      dataIndex: 'KHKCLX',
      key: 'KHKCLX',
      align: 'center',
      width: 120,
      ellipsis: true,
      render: (_, record) => {
        return record?.KHKCLX?.KCTAG;
      }
    },
    {
      title: '所属机构/学校',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      width: 160,
      ellipsis: true,
      render: (_, record) => {
        return record.SSJGLX === '校内课程' ? record?.XXJBSJ?.XXMC : record?.KHJYJG?.QYMC;
      }
    },
    {
      title: '开设课程学校数量',
      dataIndex: 'HZXXS',
      key: 'HZXXS',
      align: 'center',
      width: 160,
      ellipsis: true,
      render: (_, record) => {
        return record.SSJGLX === '校内课程' ? 1 : record.xx_count;
      }
    },
    {
      title: '课程评分',
      dataIndex: 'PJFS',
      key: 'PJFS',
      align: 'center',
      width: 180,
      ellipsis: true,
      render: (_: any, record: any) => {
        const fs = Number(Number(record.PJFS).toFixed(1)) || 0;
        return <Rate allowHalf defaultValue={fs} disabled={true} />;
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      ellipsis: true,
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <>
          <Link
            to={{
              pathname: '/statistics/MutualEvaluation/school',
              state: {
                type: 'detail',
                data: {
                  KCId: record?.id,
                  KCMC: record?.KCMC,
                  SSJGLX: record?.SSJGLX
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
  const onSelectChange = (value: string) => {
    setXNXQ(value);
  };

  return (
    <div>
      <ProTable
        columns={columns}
        dataSource={dataSource}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        scroll={{ x: getTableWidth(columns) }}
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
              <div>
                <span style={{ fontSize: 14 }}>
                  学年学期：
                  <Semester onChange={onSelectChange} />
                </span>
              </div>
              <div>
                <label htmlFor="kcname">课程名称：</label>
                <Search
                  placeholder="课程名称"
                  allowClear
                  onSearch={(value: string) => {
                    setKCMC(value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="kcly">课程来源：</label>
                <Select
                  allowClear
                  placeholder="课程来源"
                  onChange={(value) => {
                    setKCLY(value);
                  }}
                  value={KCLY}
                >
                  <Option value="校内课程" key="校内课程">
                    校内课程
                  </Option>
                  <Option value="机构课程" key="机构课程">
                    机构课程
                  </Option>
                </Select>
              </div>
              <div>
                <label htmlFor="kctype">课程类型：</label>
                <Select
                  allowClear
                  onChange={(value: string) => {
                    setKCLX(value);
                  }}
                >
                  {KCLXData?.map((item: any) => {
                    return (
                      <Option key={item.id} value={item.KCTAG}>
                        {item.KCTAG}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </SearchLayout>
          </>
        }
      />
    </div>
  );
};
MutualEvaluation.wrappers = ['@/wrappers/auth'];
export default MutualEvaluation;
