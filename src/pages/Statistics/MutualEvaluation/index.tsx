

import { useEffect, useState } from 'react';
import { Link, useModel } from 'umi';
import { Rate, message, Input } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { getCoursesEvaluation } from '@/services/after-class-qxjyj/jyjgsj'

import styles from './index.less';

const { Search } = Input;
const MutualEvaluation = (data: any) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [KCMC, setKCMC] = useState<string>('');
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);
  useEffect(() => {
    (async () => {
      const res = await getCoursesEvaluation({ XZQHM: currentUser?.XZQHM, });
      if (res.status === 'ok' && res?.data) {
        setDataSource(res?.data?.rows);
      } else {
        message.error(res.message || '数据获取失败，请联系系统管理员或稍后再试');
      }
    })()
  }, [])
  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 58,
      align: 'center'
    },
    {
      title: '课程名称',
      dataIndex: 'KCMC',
      key: 'KCMC',
      align: 'center',
      width: 150,
      ellipsis: true
    },
    {
      title: '课程来源',
      dataIndex: 'KHJYJG',
      key: 'KHJYJG',
      width: 150,
      ellipsis: true,
      align: 'center',
      render: (test: any, record: any) => {
        return record.SSJGLX ? record?.SSJGLX : '-'
      }
    },
    {
      title: '课程类型',
      dataIndex: 'KHKCLX',
      key: 'KHKCLX',
      align: 'center',
      width: 150,
      ellipsis: true,
      render: (_, record) => {
        return record?.KHKCLX?.KCTAG;
      },
    },
    {
      title: '所属机构/学校',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      width: 180,
      ellipsis: true,
      render: (_, record) => {
        return record.SSJGLX === '校内课程' ? record?.XXJBSJ?.XXMC : record?.KHJYJG?.QYMC
      }
    },
    {
      title: '开设课程学校数量',
      dataIndex: 'HZXXS',
      key: 'HZXXS',
      align: 'center',
      width: 180,
      ellipsis: true,
      render: (_, record) => {
        return record.SSJGLX === '校内课程' ? 1 : record.HZXXS
      }
    },
    {
      title: '课程评分',
      dataIndex: 'PJFS',
      key: 'PJFS',
      align: 'center',
      width: 200,
      ellipsis: true,
      render: (text: any) => <Rate count={5} defaultValue={text} disabled={true} />,
    },
    {
      title: '操作',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      ellipsis: true,
      width: 150,
      render: (_, record) => (
        <>
          <Link
            to={{
              pathname: '/statistics/MutualEvaluation/school',
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
  return (
    <div>
      <div className={styles.searchs}>
        <span >
          课程名称:
          <Search
            allowClear
            style={{ width: 200,marginLeft:16 }}
            onSearch={(val) => {
              setKCMC(val)
            }}
          />
        </span>
      </div>
      <ProTable
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
  )
}
MutualEvaluation.wrappers = ['@/wrappers/auth'];
export default MutualEvaluation;
