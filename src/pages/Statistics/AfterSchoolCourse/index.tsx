import PageContainer from '@/components/PageContainer';
import { useEffect, useState } from 'react';
// import { message } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';

import { useModel, Link } from 'umi';
import { Select } from 'antd';
import { getCourses } from '@/services/after-class-qxjyj/reports';
import { queryXNXQList } from '@/services/local-services/xnxq';
import ProTable from '@ant-design/pro-table';

import Style from './index.less';

const { Option } = Select;

const AfterSchoolCourse: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // 选择学年学期
  const [curXNXQId, setCurXNXQId] = useState<any>();
  // 学年学期列表数据
  const [termList, setTermList] = useState<any>();
  // 学期学年没有数据时提示的开关
  // 表格数据源
  const [dataSource, setDataSource] = useState<any>([]);
  /// table表格数据
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
      render: (test: any,) => {
        return test;
      },
    },
    {
      title: '课程来源',
      dataIndex: 'KCLY',
      key: 'KCLY',
      align: 'center',
      render: (test: any,) => {
        return test;
      },
    },
    {
      title: '课程类型',
      dataIndex: 'KCLX',
      key: 'KCLX',
      align: 'center',
      render: (test: any,) => {
        return test;
      },
    },
    {
      title: '班级数量',
      dataIndex: 'BJS',
      key: 'BJS',
      align: 'center',
      render: (test: any,) => {
        return test;
      },
    },
    {
      title: '报名人数',
      dataIndex: 'BMRS',
      key: 'BMRS',
      align: 'center',
      render: (test: any,) => {
        return test;
      },
    },
    {
      title: '所属学校',
      dataIndex: 'XXMC',
      key: 'XXMC',
      align: 'center',
      render: (test: any,) => {
        return test;
      },
    },
    {
      title: '退课人数',
      dataIndex: 'TKRS',
      key: 'TKRS',
      align: 'center',
      render: (test: any,) => {
        return test;
      },
    },
    {
      title: '退课比例',
      dataIndex: 'TKBL',
      key: 'TKBL',
      align: 'center',
      render: (test: any,) => {
        return test + '%';
      },
    },
    {
      title: '收款总额',
      dataIndex: 'SKJE',
      key: 'SKJE',
      align: 'center',
      render: (test: any,) => {
        return test;
      },
    },
    {
      title: '操作',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      render: (_, record) => (
        <>
          <Link
            to={{
              pathname: 'afterSchoolCourse/detail',
              state: {
                type: 'detail',
                data: record,
              },
            }}
          >
            详情
          </Link>
        </>
      ),
    },
  ];
  useEffect(() => {
    // 获取学年学期数据的获取
    (async () => {
      const res = await queryXNXQList(currentUser?.jyjId);
      // const res = await queryXNXQList("53091f16-e723-4910-aca9-9741cd75a14f");

      // 获取到的整个列表的信息
      const newData = res.xnxqList;
      const curTerm = res.current;
      if (newData?.length) {
        if (curTerm) {
          setCurXNXQId(curTerm.id);
          setTermList(newData);
        }
      } else {
      }
    })();
  }, []);
  // 学年学期变化
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if(curXNXQId){
      ChoseSelect(curXNXQId);
    }
  }, [curXNXQId]);
  // 学年学期选相框触发的函数
  const ChoseSelect = async (SelectData: string) => {
    const res3 = await getCourses({
      XNXQId: SelectData,
      XXJBSJId: currentUser?.jyjId
      // XXJBSJId: "53091f16-e723-4910-aca9-9741cd75a14f"
    });
    if (res3.status === 'ok') {
      setDataSource(res3?.data?.rows);
    }
  };

  return (
    <>
      <div className={Style.TopSearchss}>
        <span>
          所属学年学期：
          <Select
            value={curXNXQId}
            style={{ width: 200 }}
            onChange={(value: string) => {
              // 选择不同学期从新更新页面的数据
              setCurXNXQId(value);
            }}
          >
            {termList?.map((item: any) => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.text}
                </Option>
              );
            })}
          </Select>
        </span>
        <span>
          所属学校：
          <Select
            value={curXNXQId}
            style={{ width: 200 }}
            onChange={(value: string) => {
              // 选择不同学期从新更新页面的数据
              setCurXNXQId(value);
            }}
          >
            {termList?.map((item: any) => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.text}
                </Option>
              );
            })}
          </Select>
        </span>
      </div>
      <div>
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
    </>
  );
};
export default AfterSchoolCourse;
