import { getKHFWBJ, getStudentListByBjid } from '@/services/after-class-qxjyj/khfwbj';
import { Button, Tabs, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import { DownloadOutlined, LeftOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import EllipsisHint from '@/components/EllipsisHint';
import { getTableWidth } from '@/utils';

const { TabPane } = Tabs;
const Details = (props: any) => {
  const { state } = props.location;
  const { value, xnxqId } = state;
  const [Data, setData] = useState<any>();
  const [dataSource, setDataSource] = useState<any>();
  const [SJId, setSJId] = useState<any>();

  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 58,
      align: 'center'
    },
    {
      title: '学号',
      dataIndex: 'XH',
      key: 'XH',
      align: 'center',
      width: 180
    },
    {
      title: '学生姓名',
      dataIndex: 'XM',
      key: 'XM',
      align: 'center',
      width: 120
    },
    {
      title: '辅导班',
      dataIndex: 'XSFWBJs',
      key: 'XSFWBJs',
      align: 'center',
      width: 300,
      render: (text: any) => {
        if (text?.length) {
          const list = text?.[0].XSFWKHBJs?.filter((item: any) => item?.KHBJSJ?.KCFWBJs?.[0]?.LX === 1).map(
            (item: any) => {
              return <Tag key={item?.KHBJSJ?.id}> {item?.KHBJSJ?.BJMC}</Tag>;
            }
          );

          if (list) {
            return <EllipsisHint width="100%" text={list} />;
          }
          return '待选课';
        }
        return '—';
      }
    },
    {
      title: '课程班',
      dataIndex: 'XSFWBJs',
      key: 'XSFWBJs',
      align: 'center',
      width: 300,
      render: (text: any) => {
        if (text?.length) {
          const list = text?.[0].XSFWKHBJs?.filter((item: any) => item?.KHBJSJ?.KCFWBJs?.[0]?.LX === 0).map(
            (item: any) => {
              return <Tag key={item?.KHBJSJ?.id}> {item?.KHBJSJ?.BJMC}</Tag>;
            }
          );
          if (list?.length) {
            return <EllipsisHint width="100%" text={list} />;
          }
          return '待选课';
        }
        return '—';
      }
    },
    {
      title: '报名状态',
      dataIndex: 'XSFWBJs',
      key: 'XSFWBJs',
      align: 'center',
      width: 120,
      render: (text: any) => {
        if (text?.length) {
          if (text?.[0]?.ZT === 2) {
            return '已退课';
          }
          if (text?.[0]?.ZT === 1) {
            return '退课中';
          }
          return '已报名';
        }
        return '未报名';
      }
    }
  ];
  useEffect(() => {
    (async () => {
      if (value?.id) {
        const res = await getKHFWBJ({
          BJSJId: value.id,
          XNXQId: xnxqId
        });
        if (res?.status === 'ok') {
          setData(res?.data);
          setSJId(res?.data?.KHFWSJPZs?.[0]?.id);
        }
      }
    })();
  }, []);
  useEffect(() => {
    if (SJId) {
      (async () => {
        const result = await getStudentListByBjid({
          BJSJId: value?.id,
          KHFWSJPZId: SJId,
          XSXMORXH: '',
          ZT: [0, 3],
          page: 0,
          pageSize: 0
        });
        if (result?.status === 'ok') {
          setDataSource(result?.data?.rows);
        }
      })();
    }
  }, [SJId]);

  const callback = (key: any) => {
    setSJId(key);
  };

  return (
    <div className={styles.Details}>
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
      <span style={{ fontSize: '18px', marginLeft: '24px', fontWeight: 'bold' }}>
        {`${value?.NJSJ?.XD}${value?.NJSJ?.NJMC}${value?.BJ}`}
      </span>
      <Tabs onChange={callback}>
        {Data?.KHFWSJPZs.map((values: any) => {
          return (
            <TabPane
              tab={
                <>
                  <span>{values?.SDBM}</span>{' '}
                  <span>
                    {moment(values?.KSRQ).format('MM-DD')}~{moment(values?.JSRQ).format('MM-DD')}
                  </span>
                </>
              }
              key={values?.id}
            />
          );
        })}
      </Tabs>
      <ProTable
        columns={columns}
        dataSource={dataSource}
        className={styles.details}
        rowKey="id"
        search={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        scroll={{ x: getTableWidth(columns) }}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
      />
    </div>
  );
};

export default Details;
