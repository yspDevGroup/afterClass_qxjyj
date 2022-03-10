import { useEffect, useState } from 'react';
import { Button, Input, message, Select, Spin } from 'antd';
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
import { DownloadOutlined } from '@ant-design/icons';
import SearchLayout from '@/components/Search/Layout';
import {
  exportEducationCoursesInfo,
  recalculateBJTJInfo,
  recalculateKCTJInfo
} from '@/services/after-class-qxjyj/reports';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';
import Semester from '@/components/Semester';

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
  const [loading, setLoading] = useState<boolean>(false);
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
      dataIndex: 'BJS',
      key: 'BJS',
      align: 'center',
      width: 130,
      ellipsis: true,
      render: (_, record) => {
        return record.KCLY === '校内课程' ? 1 : record.xx_count;
      }
    },
    {
      title: '课程班数量',
      dataIndex: 'BJS',
      key: 'BJS',
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
      KCLX,
      XN: XNXQ.substring(0, 9),
      XQ: XNXQ.substring(10, 14)
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
    if (XNXQ) {
      ChoseSelect();
    }
  }, [KCLX, KCLY, KCMC, XXMC, XNXQ]);

  const submit = async () => {
    const res = await recalculateBJTJInfo();
    if (res?.status === 'ok') {
      const result = await recalculateKCTJInfo();
      if (result?.status === 'ok') {
        message.success('刷新完成');
      }
    }
  };

  const onExportClick = () => {
    setLoading(true);
    (async () => {
      const res = await exportEducationCoursesInfo({
        XZQHM: currentUser?.XZQHM,
        XXMC,
        KCMC,
        KCLX,
        KCLY
      });
      if (res.status === 'ok') {
        window.location.href = res.data;
        setLoading(false);
      } else {
        message.error(res.message);
        setLoading(false);
      }
    })();
  };
  const onSelectChange = (value: string) => {
    setXNXQ(value);
  };
  return (
    <>
      <div className={styles.AfterSchoolCourse}>
        <Spin spinning={loading}>
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
                      <span style={{ fontSize: 14 }}>
                        学年学期：
                        <Semester onChange={onSelectChange} />
                      </span>
                    </div>
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
                        <h3>{TitleData?.bjs_count || 0}</h3>
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
                        <h3>{TitleData?.bmxss_count || 0}</h3>
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
                        <h3>{TitleData?.tkxss_count || 0}</h3>
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
                  <Button icon={<DownloadOutlined />} type="primary" onClick={onExportClick}>
                    导出
                  </Button>
                </p>
              </>
            }
          />
        </Spin>
      </div>
    </>
  );
};

AfterSchoolCourse.wrappers = ['@/wrappers/auth'];
export default AfterSchoolCourse;
