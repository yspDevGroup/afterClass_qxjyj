import { useEffect, useState } from 'react';
import { Button, Input, message, Select } from 'antd';
import { useModel, Link } from 'umi';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAllCoursesInfo } from '@/services/after-class-qxjyj/jyjgsj';
import { getAllKHKCLX } from '@/services/after-class-qxjyj/khkclx';
import styles from './index.less';
import { getTableWidth } from '@/utils';
import amountImg from '@/assets/amount.png';
import personImg from '@/assets/person.png';
import classImg from '@/assets/class.png';
import courseImg from '@/assets/course.png';
import refundImg from '@/assets/refund.png';
import SearchLayout from '@/components/Search/Layout';
import { recalculateBJTJInfo, recalculateKCTJInfo } from '@/services/after-class-qxjyj/reports';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';

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
  // 表头数据源
  const [TitleData, setTitleData] = useState<any>();
  const [SchoolList, setSchoolList] = useState<any>([]);
  const [XXMC, setXXMC] = useState<any>('');
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
      ellipsis: true
    },
    {
      title: '课程来源',
      dataIndex: 'KCLY',
      key: 'KCLY',
      align: 'center',
      width: 100,
      ellipsis: true
    },
    {
      title: '课程类型',
      dataIndex: 'KCLX',
      key: 'KCLX',
      align: 'center',
      width: 120,
      ellipsis: true
    },
    {
      title: '所属机构/学校',
      dataIndex: 'JGMC',
      key: 'JGMC',
      align: 'center',
      width: 120,
      ellipsis: true,
      render: (_, record) => {
        return record.KCLY === '校内课程' ? record.XXMC : record.JGMC;
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
        return record.KCLY === '校内课程' ? 1 : record.xx_count;
      }
    },
    {
      title: '课程班数量',
      dataIndex: 'KCBSL',
      key: 'KCBSL',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (_, record) => {
        const num = Number(record.BJS) + Number(record?.FWBJS);
        return num;
      }
    },
    {
      title: '报名人数',
      dataIndex: 'BMRS',
      key: 'BMRS',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (test: any, record: any) => {
        const num = Number(record.BMXSS) + Number(record?.FWBBMXSS);
        return num;
      }
    },
    {
      title: '退课人数',
      dataIndex: 'TKRS',
      key: 'TKRS',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (test: any, record: any) => {
        const num = Number(record.TKXSS) + Number(record?.FWBTKXSS);
        return num;
      }
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
          record.TKRS != 0
            ? (
                (Number(Number(record.TKXSS) + Number(record?.FWBTKXSS)) /
                  (Number(record.BMXSS) + Number(record?.FWBBMXSS))) *
                100
              ).toFixed(1) + '%'
            : 0;
        return num;
      }
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

  const getData = async () => {
    const res = await getAllSchools({
      XZQHM: currentUser?.XZQHM,
      page: 0,
      pageSize: 0
    });
    if (res.data?.rows?.length) {
      setSchoolList(res.data.rows);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const ChoseSelect = async () => {
    const res3 = await getAllCoursesInfo({
      XZQHM: currentUser?.XZQHM,
      XXMC,
      KCMC,
      KCLY,
      KCLX
    });
    if (res3.status === 'ok') {
      setDataSource(res3?.data?.rows);
      setTitleData(res3?.data);
    }
  };
  useEffect(() => {
    (async () => {
      const res = await getAllKHKCLX({});
      if (res.status === 'ok') {
        setKCLXData(res.data);
      }
    })();
  }, []);
  useEffect(() => {
    ChoseSelect();
  }, [KCLX, KCLY, KCMC, XXMC]);

  const submit = async () => {
    const res = await recalculateBJTJInfo();
    if (res?.status === 'ok') {
      const result = await recalculateKCTJInfo();
      if (result?.status === 'ok') {
        message.success('刷新完成');
      }
    }
  };
  return (
    <>
      <div className={styles.AfterSchoolCourse}>
        <ProTable
          columns={columns}
          dataSource={dataSource}
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
          headerTitle={
            <>
              <div>
                <SearchLayout>
                  <div>
                    <label htmlFor="kctype">学校名称：</label>
                    <Select
                      allowClear
                      onChange={(value: string) => {
                        setXXMC(value);
                      }}
                    >
                      {SchoolList?.map((item: any) => {
                        return (
                          <Option key={item.id} value={item.XXMC}>
                            {item.XXMC}
                          </Option>
                        );
                      })}
                    </Select>
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
              </div>
              <div className={styles.TopCards}>
                <div>
                  <div>
                    <span>
                      <img src={courseImg} />
                    </span>
                    <div>
                      <h3>{TitleData?.kc_count || 0}</h3>
                      <p>课程累计数</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span>
                      <img src={classImg} />
                    </span>
                    <div>
                      <h3>{Number(TitleData?.bjs_count) + Number(TitleData?.fwbjs_count) || 0}</h3>
                      <p>课程班累计数</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span>
                      <img src={personImg} />
                    </span>
                    <div>
                      <h3>{Number(TitleData?.fwbbmxss_count) + Number(TitleData?.bmxss_count) || 0}</h3>
                      <p>报名累计人数</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span>
                      <img src={personImg} />
                    </span>
                    <div>
                      <h3>{Number(TitleData?.fwbtkxss_count) + Number(TitleData?.tkxss_count) || 0}</h3>
                      <p>退课累计人数</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className={styles.title}>
                <span>系统每天凌晨自动更新一次，如需立即更新，请点击【刷新】按钮</span>
                <Button type="primary" onClick={submit}>
                  刷新
                </Button>
              </p>
            </>
          }
        />
      </div>
    </>
  );
};

AfterSchoolCourse.wrappers = ['@/wrappers/auth'];
export default AfterSchoolCourse;
