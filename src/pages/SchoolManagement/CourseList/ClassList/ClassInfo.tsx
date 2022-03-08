/*
 * @description:
 * @author: wsl
 * @Date: 2021-09-06 17:02:23
 * @LastEditTime: 2021-10-27 10:54:48
 * @LastEditors: Please set LastEditors
 */
/* eslint-disable max-nested-callbacks */
import React, { useEffect, useState } from 'react';
import { Button, message, Table } from 'antd';
import { history, Link } from 'umi';
import styles from '../index.less';
import { LeftOutlined } from '@ant-design/icons';
import CustomForm from '@/components/CustomForm';
import { FormItemType } from '@/components/CustomForm/interfice';
import moment from 'moment';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getKHBJSJ } from '@/services/after-class-qxjyj/khbjsj';
/**
 * 课程详情
 * @returns
 */
const formItemLayout = {
  labelCol: { flex: '12em' },
  wrapperCol: { span: 16 }
};
const ClassInfo = (props: any) => {
  const { state } = props.location;
  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [formValues, setFormValues] = useState({});
  const [teacherData, setTeacherData] = useState<any>([]);
  useEffect(() => {
    setDisabled(true);
    console.log('state', state);
    // 老师表格数据

    getDetail();
  }, []);

  const getDetail = async () => {
    const res = await getKHBJSJ({ id: state.id });
    if (res?.status === 'ok') {
      console.log('res', res);
      const { data } = res;
      const thData: any[] = [];
      data?.KHBJJs?.forEach((item: any) => {
        thData.push(item?.KHJSSJ);
      });
      setTeacherData(data?.KHBJJs);
      const jfData: any[] = [];
      data?.KHKCJCs?.forEach((item: any, index: number) => {
        jfData.push(`${index + 1}.${item.JCMC}，费用：${item.JCFY} ；\n`);
      });
      // eslint-disable-next-line prefer-regex-literals
      const reg = new RegExp(',', 'g');
      if (data?.id) {
        // form详情
        const params = {
          BJMC: data?.BJMC,
          KCMS: data?.KCMS || '',
          njIds: data?.NJSJs?.map((item: any) => `${item.XD}${item?.NJMC}`) || '',
          jsIds: data?.KHKCJs?.map((item: any) => item?.JZGJBSJ?.XM) || '',
          SSXQ: `${data?.XNXQ.XN}${data?.XNXQ.XQ}`,
          BMRS: `${data?.KHXSBJs.length} / ${data?.BJRS}`,
          SKSD: `${data?.KKRQ} - ${data?.JKRQ}`,
          BMSD: `${moment(data?.BMKSSJ).format('YYYY-MM-DD')} - ${moment(data?.BMJSSJ).format('YYYY-MM-DD')}`,
          BMFY: data?.FY,
          JF: jfData.toString().replace(reg, '') || ''
        };
        setImageUrl(data?.KCTP || '');
        setFormValues(params);
      }
    } else {
      message.error(res?.message);
    }
  };

  const basicForm: FormItemType[] = [
    {
      type: 'group',
      key: 'group1',
      groupItems: [
        {
          type: 'input',
          label: '课程班名称',
          placeholder: '——',
          name: 'BJMC',
          key: 'BJMC',
          disabled
        },
        {
          type: 'textArea',
          label: '教辅材料',
          placeholder: '——',
          name: 'JF',
          key: 'JF',
          disabled
        }
      ]
    },
    {
      type: 'group',
      key: 'group2',
      groupItems: [
        {
          type: 'input',
          label: '所属学期',
          placeholder: '——',
          name: 'SSXQ',
          key: 'SSXQ',
          disabled
        },
        {}
      ]
    },
    {
      type: 'group',
      key: 'group3',
      groupItems: [
        {
          type: 'input',
          label: '报名人数',
          placeholder: '——',
          name: 'BMRS',
          disabled,
          mode: 'multiple',
          key: 'BMRS'
        },
        {}
      ]
    },
    {
      type: 'group',
      key: 'group4',
      groupItems: [
        {
          type: 'input',
          label: '报名费用',
          placeholder: '——',
          name: 'BMFY',
          disabled,
          mode: 'multiple',
          key: 'BMFY'
        },
        {}
      ]
    },
    {
      type: 'group',
      key: 'group6',
      groupItems: [
        {
          type: 'input',
          label: '上课时段',
          placeholder: '——',
          key: 'SKSD',
          name: 'SKSD',
          disabled,
          mode: 'multiple'
        },
        {}
      ]
    }
  ];
  const columns: any = [
    {
      title: '姓名',
      dataIndex: 'JSXM',
      key: 'JSXM',
      align: 'center',
      render: (text: any, record: any) => {
        const showWXName = record.JZGJBSJ?.XM === '未知' && record.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={record.WechatUserId} />;
        }
        return record.JZGJBSJ?.XM;
      }
    },
    {
      title: '教师类型',
      dataIndex: 'JSLX',
      key: 'JSLX',
      align: 'center',
      render: (_: any, record: any) => {
        return record.JSLX === '主教师' ? '主班' : '副班';
      }
    },
    {
      title: '联系电话',
      dataIndex: 'LXDH',
      key: 'LXDH',
      align: 'center',
      render: (text: any, record: any) => {
        return record?.JZGJBSJ?.LXDH;
      }
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      align: 'center',
      width: 200,
      render: (text: any, record: any) => {
        return (
          <div className={styles.operation}>
            <Link
              key="xq"
              to={{
                pathname: '/schoolManagement/courseList/teacherInfo',
                state: record?.JZGJBSJ
              }}
            >
              详情
            </Link>
          </div>
        );
      }
    }
  ];
  return (
    <>
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
      <div className={styles.content}>
        <div style={{ width: '85%', minWidth: '850px', margin: '0 auto' }} className={styles.formType}>
          <CustomForm values={formValues || {}} formItems={basicForm} formLayout={formItemLayout} hideBtn={true} />
          <Table
            title={() => '任课教师列表'}
            columns={columns}
            dataSource={teacherData}
            pagination={false}
            size="small"
          />
        </div>
      </div>
    </>
  );
};

ClassInfo.wrappers = ['@/wrappers/auth'];
export default ClassInfo;
