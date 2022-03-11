/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-10-12 14:46:08
 * @LastEditTime: 2021-11-23 10:28:17
 * @LastEditors: Sissle Lynn
 */
import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { useModel, Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Input, Tag } from 'antd';
import { getClassesByCourse } from '@/services/after-class-qxjyj/jyjgsj';
import styles from './index.less';
import EllipsisHint from '@/components/EllipsisHint';
import { getTableWidth } from '@/utils';
import SearchLayout from '@/components/Search/Layout';
import Semester from '@/components/Semester';

const { Search } = Input;
const School = (props: any) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { state } = props.location;
  const { KCId, KCMC } = state.data;
  const [XXMC, setXXMC] = useState<string>('');
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  const [XNXQ, setXNXQ] = useState<string>('');
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
      title: '学校名称',
      dataIndex: 'XXMC',
      key: 'XXMC',
      width: 120,
      fixed: 'left',
      ellipsis: true,
      align: 'center',
      render: (_, record) => {
        return record?.XXJBSJ?.XXMC;
      }
    },
    {
      title: '学段',
      dataIndex: 'XD',
      key: 'XD',
      width: 150,
      ellipsis: true,
      align: 'center',
      render: (_: any, record: any) => {
        const data = record?.XXJBSJ?.XD?.split(/,/g);
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
      title: '课程班数量',
      dataIndex: 'bj_count',
      key: 'bj_count',
      align: 'center',
      width: 100,
      ellipsis: true
    },
    {
      title: '报名人数',
      dataIndex: 'BMXSS',
      key: 'BMXSS',
      align: 'center',
      width: 100,
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
      title: '退课比例',
      dataIndex: 'TKBL',
      key: 'TKBL',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (test: any, record: any) => {
        const num =
          Number(record.TKXSS) !== 0 ? ((Number(record.TKXSS) / Number(record.BMXSS)) * 100).toFixed(1) + '%' : 0;
        return num;
      }
    },
    {
      title: '操作',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      width: 120,
      fixed: 'right',
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
  const ChoseSelect = async () => {
    const res3 = await getClassesByCourse({
      XZQHM: currentUser?.XZQHM,
      KHKCSJId: KCId,
      isFW: 0,
      XN: XNXQ.substring(0, 9),
      XQ: XNXQ.substring(10, 14),
      XXMC
    });
    if (res3.status === 'ok') {
      setDataSource(res3?.data?.rows);
    }
  };
  useEffect(() => {
    if (XNXQ) {
      ChoseSelect();
    }
  }, [XXMC, XNXQ]);

  const onSelectChange = (value: string) => {
    setXNXQ(value);
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
            <>
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
                      setXXMC(val);
                    }}
                  />
                </div>
              </SearchLayout>
              <p className={styles.courseName}>课程名称：{KCMC}</p>
            </>
          }
        />
      </div>
    </>
  );
};

School.wrappers = ['@/wrappers/auth'];
export default School;
