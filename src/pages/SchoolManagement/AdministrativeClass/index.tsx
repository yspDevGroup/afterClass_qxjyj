import ProTable from '@ant-design/pro-table';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Select, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'umi';
import styles from './index.less';
import { getAllBJSJ, getKHFWBJXSbm } from '@/services/after-class-qxjyj/bjsj';
import { queryXNXQList } from '@/services/local-services/xnxq';
import { getAllXQSJ } from '@/services/after-class-qxjyj/xqsj';
import SearchLayout from '@/components/Search/Layout';
import { getGradesByCampus } from '@/services/after-class-qxjyj/njsj';
import { QuestionCircleOutlined, LeftOutlined } from '@ant-design/icons';

type selectType = { label: string; value: string };

const { Option } = Select;
const AdministrativeClass = (props: any) => {
  const { state } = props.location;
  console.log(state);
  const actionRef = useRef<ActionType>();
  const [NjId, setNjId] = useState<any>();
  const [NjData, setNjData] = useState<any>();
  // 校区
  const [campusId, setCampusId] = useState<string>();
  const [campusData, setCampusData] = useState<any[]>();
  const [curXNXQId, setCurXNXQId] = useState<string | undefined>(undefined);
  const [curXNXQData, setCurXNXQData] = useState<any[]>();
  const [bjData, setBJData] = useState<selectType[] | undefined>([]);
  const [BJId, setBJId] = useState<string | undefined>(undefined);
  const [XQData, setXQData] = useState<any | undefined>();

  const getCampusData = async () => {
    const res = await getAllXQSJ({
      XXJBSJId: state?.id
    });
    if (res?.status === 'ok') {
      const arr = res?.data?.map((item: any) => {
        return {
          label: item.XQMC,
          value: item.id
        };
      });
      if (arr?.length) {
        let id = arr?.find((item: any) => item.label === '本校')?.value;
        if (!id) {
          id = arr[0].value;
        }
        setCampusId(id);
      }
      setCampusData(arr);
    }
  };

  useEffect(() => {
    (async () => {
      const result = await queryXNXQList(state.id);
      if (result?.current) {
        setXQData(result?.current);
        setCurXNXQId(result?.current?.id);
        setCurXNXQData(result?.data);
      }
    })();
    getCampusData();
  }, []);

  const getNJSJ = async () => {
    if (campusId) {
      const res = await getGradesByCampus({
        XQSJId: campusId
      });
      if (res.status === 'ok') {
        setNjData(res.data);
      }
    }
  };

  useEffect(() => {
    if (campusId) {
      getNJSJ();
      setBJId(undefined);
      setNjId(undefined);
      actionRef.current?.reloadAndRest?.();
    }
  }, [campusId]);

  const onBjChange = async (value: any) => {
    setBJId(value);
    actionRef.current?.reloadAndRest?.();
  };
  const onNjChange = async (value: any) => {
    setNjId(value);
    setBJData([]);
    setBJId(undefined);
    actionRef.current?.reloadAndRest?.();
  };

  const getBJSJ = async () => {
    const res = await getAllBJSJ({ XQSJId: campusId, njId: NjId, page: 0, pageSize: 0 });
    if (res.status === 'ok') {
      const data = res.data?.rows?.map((item: any) => {
        return { label: item.BJ, value: item.id };
      });
      setBJData(data);
    }
  };

  useEffect(() => {
    if (NjId) {
      setBJId(undefined);
      getBJSJ();
    }
  }, [NjId, campusId, curXNXQId]);

  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 58,
      align: 'center'
    },
    {
      title: '年级名称',
      dataIndex: 'NJMC',
      key: 'NJMC',
      align: 'center',
      width: 160,
      render: (test: any, record: any) => {
        return `${record.NJSJ.XD}${record.NJSJ.NJMC}`;
      }
    },
    {
      title: '行政班名称',
      dataIndex: 'BJ',
      key: 'BJ',
      align: 'center',
      width: 160
    },
    {
      title: '班主任',
      dataIndex: 'BZR',
      key: 'BZR',
      align: 'center',
      width: 100,
      hideInTable: true
    },
    {
      title: '班级人数',
      dataIndex: 'xs_count',
      key: 'xs_count',
      align: 'center',
      width: 90
    },
    {
      title: (
        <span>
          报名人数&nbsp;
          <Tooltip overlayStyle={{ maxWidth: '30em' }} title={<>当前时段班级报名人数</>}>
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'xsfwbm_count',
      key: 'xsfwbm_count',
      align: 'center',
      width: 150
    },
    {
      title: '状态',
      dataIndex: 'ZT',
      key: 'ZT',
      align: 'center',
      width: 100,
      render: (_, record: any) => {
        if (record?.KHFWBJs?.length) {
          if (record?.KHFWBJs[0]?.ZT === 0) {
            return '未发布';
          }
          return '已发布';
        }
        return '待配置';
      }
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'center',
      width: 190,
      render: (_, record) => (
        <div className={styles.operation}>
          <Link
            to={{
              pathname: '/schoolManagement/administrativeClass/detail',
              state: { value: record, xnxqId: curXNXQId }
            }}
          >
            详情
          </Link>
        </div>
      )
    }
  ];

  const onCampusChange = (value: any) => {
    setCampusId(value);
    // actionRef.current?.reload();
  };

  // 学年学期筛选
  const onXNXQChange = (value: string) => {
    curXNXQData?.forEach((item: any) => {
      if (item.id === value) {
        setCurXNXQId(value);
        setXQData(item);
        actionRef.current?.reloadAndRest?.();
      }
    });
  };

  return (
    <div className={styles.AdministrativeClass}>
      <Button
        type="primary"
        onClick={() => {
          history.go(-1);
        }}
        style={{
          marginBottom: '24px',
          marginLeft: 24
        }}
      >
        <LeftOutlined />
        返回上一页
      </Button>
      <span style={{ fontSize: '18px', marginLeft: '24px', fontWeight: 'bold' }}>{state?.XXMC}</span>
      <span style={{ fontSize: '14px', color: '#4884ff', float: 'right', marginRight: 24, lineHeight: 32 }}>
        仅统计课后服务数据
      </span>
      <ProTable<any>
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1
        }}
        request={async (param) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          if (curXNXQId && campusId) {
            const obj = {
              XXJBSJId: state?.id,
              NJId: NjId ? [NjId] : undefined,
              BJSJId: BJId,
              XNXQId: curXNXQId,
              ISJD: true,
              FWZT: 1,
              page: param.current,
              pageSize: param.pageSize,
              XQSJId: campusId
            };
            const res = await getKHFWBJXSbm(obj);
            if (res.status === 'ok') {
              return {
                data: res.data.rows,
                success: true,
                total: res.data.count
              };
            }
          }
          return [];
        }}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
        search={false}
        headerTitle={
          <SearchLayout>
            <div>
              <label htmlFor="grade">校区名称：</label>
              <Select value={campusId} placeholder="请选择" onChange={onCampusChange}>
                {campusData?.map((item: any) => {
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div>
              <label htmlFor="grade">学年学期：</label>
              <Select value={curXNXQId} placeholder="请选择" onChange={onXNXQChange} style={{ width: 170 }}>
                {curXNXQData?.map((item: any) => {
                  return <Option key={item.id} value={item.id}>{`${item.XN}-${item.XQ}`}</Option>;
                })}
              </Select>
            </div>

            <div>
              <label htmlFor="grade">年级名称：</label>
              <Select value={NjId} allowClear placeholder="请选择" onChange={onNjChange}>
                {NjData?.map((item: any) => {
                  return <Option key={item.id} value={item.id}>{`${item.XD}${item.NJMC}`}</Option>;
                })}
              </Select>
            </div>
            <div>
              <label htmlFor="kcly">班级名称：</label>
              <Select value={BJId} allowClear placeholder="班级名称" onChange={onBjChange}>
                {bjData?.map((item: any) => {
                  return (
                    <Option value={item.value} key={item.value}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </SearchLayout>
        }
      />
    </div>
  );
};
AdministrativeClass.wrappers = ['@/wrappers/auth'];
export default AdministrativeClass;
