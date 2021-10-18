import { useEffect, useState } from 'react';
// import { message } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';

import { useModel, history } from 'umi';
import { Button, message, Select, Tag } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getClasses } from '@/services/after-class-qxjyj/reports';
import ProTable from '@ant-design/pro-table';

import EllipsisHint from '@/components/EllipsisHint';
import { getCurrentXQ } from '@/utils/utils';
import { getAllXNXQ } from '@/services/after-class-qxjyj/xnxq';
import styles from './index.less';

const { Option } = Select;

const AfterSchoolClass = (props: any) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // 选择学年学期
  const [term, setTerm] = useState<string>();
  // 学年学期列表数据
  const [termList, setTermList] = useState<any>();
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  const { state } = props.location;
  const { KCMC, XXMC, KHKCSJId, XXJBSJId } = state.data;
  const getCourseList = async (kcdm: string, xnxq?: string) => {
    const res = await getClasses({
      XNXQId: xnxq,
      KHKCSJId: kcdm,
    });
    if (res?.status === 'ok') {
      setDataSource(res?.data?.rows);
    }
  };
  const getXNXQ = async (xxdm: string) => {
    const res = await getAllXNXQ({
      XXJBSJId: xxdm,
    });
    if (res?.status === 'ok') {
      const { data = [] } = res;
      const currentXQ = getCurrentXQ(data);
      const term = [].map.call(data, (item: any) => {
        return {
          value: item.id,
          text: `${item.XN} ${item.XQ}`
        };
      });
      setTermList(term);
      setTerm(currentXQ?.id || data[0].id);
      getCourseList(KHKCSJId, currentXQ?.id || data[0].id);
    } else {
      message.error(res.message);
    }
  };
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
      title: '课程班名称',
      dataIndex: 'BJMC',
      key: 'BJMC',
      align: 'center',
      fixed: 'left',
      render: (test: any,) => {
        return test;
      },
      ellipsis: true,
      width: 140,
    },
    {
      title: '任课教师',
      dataIndex: 'RKJS',
      key: 'RKJS',
      align: 'center',
      render: (test: any,) => {
        return test;
      },
      width: 120,
      ellipsis: true,
    },
    {
      title: '开课时段',
      dataIndex: 'SKSD',
      key: 'SKSD',
      align: 'center',
      width: 180,
      render: (_, record: any) => {
        return moment(record?.KKSJ).format('YYYY.MM.DD') + '~' + moment(record?.JKSJ).format('YYYY.MM.DD');
      },
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
            text={text && text.split(',')?.map((item: any) => {
              return (
                <Tag key={item.id}>
                  {item}
                </Tag>
              );
            })}
          />
        );
      },
      width: 150,
    },
    {
      title: '课时数',
      dataIndex: 'KSS',
      key: 'KSS',
      align: 'center',
      width: 90,
      ellipsis: true,
    },
    {
      title: '报名人数',
      dataIndex: 'BMRS',
      key: 'BMRS',
      align: 'center',
      width: 90,
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
  ];
  useEffect(() => {
    getXNXQ(XXJBSJId);
  }, [])
  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={() => {
            history.goBack();
          }}
          style={{
            marginBottom: '24px'
          }}
        >
          <LeftOutlined />
          返回上一页
        </Button>
        <div className={styles.searchWrapper}>
          <span>
            所属学年学期：
            <Select
              value={term}
              style={{ width: 200 }}
              onChange={(value: string) => {
                setTerm(value);
                getCourseList(KHKCSJId, value);
              }}
            >
              {termList?.map((item: any) => {
                return <Option key={item.value} value={item.value}>{item.text}</Option>;
              })}
            </Select>
          </span>
        </div>
        <ProTable
          headerTitle={KCMC + ' / ' + XXMC}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
            defaultCurrent: 1,
          }}
          scroll={{ x: 1300 }}
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
AfterSchoolClass.wrappers = ['@/wrappers/auth'];
export default AfterSchoolClass;
