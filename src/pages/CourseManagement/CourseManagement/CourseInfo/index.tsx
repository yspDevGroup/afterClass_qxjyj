/* eslint-disable max-nested-callbacks */
import React, { useEffect, useState } from 'react';
import { Button, FormInstance, message, Table } from 'antd';
import { history, useModel } from 'umi';
import classes from './index.less';
import { LeftOutlined } from '@ant-design/icons';
import CustomForm from '@/components/CustomForm';
import { FormItemType } from '@/components/CustomForm/interfice';
import WWOpenDataCom from '@/components/WWOpenDataCom';
import { getKHKCSJ } from '@/services/after-class-qxjyj/khkcsj';
/**
 * 课程详情
 * @returns
 */
const formItemLayout = {
  labelCol: { flex: '12em' },
  wrapperCol: { span: 16 }
};
const CourseInfo = (props: any) => {
  const { state } = props.location;

  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [forms, setForm] = useState<FormInstance<any>>();
  const [KCLXOptions, setKCLXOptions] = useState<any>([]);
  const [JSSJOptions, setJSSJOptions] = useState<any>([]);
  const [NJDataOption, setNJDataOption] = useState<any>([]);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [formValues, setFormValues] = useState<any>({});
  const [teacherData, setTeacherData] = useState<any>([]);
  const getData = async () => {
    const res = await getKHKCSJ({ kcId: state.id });
    if (res?.status === 'ok') {
      console.log('res', res);
      const { data } = res;
      let flag = false;
      // 老师表格数据
      if (data?.SSJGLX === '机构课程') {
        const thData: any[] = [];
        data?.KHKCJs?.forEach((item: any) => {
          thData.push(item);
        });
        setTeacherData(thData);
        flag = true;
      }
      setDisabled(true);

      if (data?.id) {
        // form详情
        const params = {
          KCMC: data?.KCMC || '',
          KCMS: data?.KCMS || '',
          njIds: data?.NJSJs?.map((item: any) => `${item.XD}${item?.NJMC}`) || '',
          jsIds: data?.KHKCJs?.map((item: any) => item?.JZGJBSJ?.XM) || '',
          KCTP: data?.KCTP || '',
          KHKCLX: data?.KHKCLX?.KCTAG || '',
          flag
        };
        setImageUrl(data?.KCTP || '');
        setFormValues(params);
      }
    }
  };

  useEffect(() => {
    console.log('state', state);

    getData();
  }, []);

  const basicForm: FormItemType[] = [
    {
      type: 'group',
      key: 'group1',
      groupItems: [
        {
          type: 'input',
          label: '课程名称',
          placeholder: '—',
          name: 'KCMC',
          key: 'KCMC',
          disabled,
        },
        {}
      ]
    },
    {
      type: 'group',
      key: 'group2',
      groupItems: [
        {
          type: 'input',
          label: '课程类型',
          placeholder: '—',
          name: 'KHKCLX',
          key: 'KHKCLX',
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
          type: 'select',
          label: '适用年级',
          placeholder: '—',
          name: 'njIds',
          disabled,
          mode: 'multiple',
          key: 'njIds',
          items: NJDataOption
        },
        {}
      ]
    },
    {
      type: 'group',
      key: 'group4',
      groupItems: [
        {
          type: 'select',
          label: '任课教师',
          placeholder: '—',
          key: 'jsIds',
          name: 'jsIds',
          disabled,
          hidden: disabled,
          mode: 'multiple',
          items: JSSJOptions
        },
        {}
      ]
    },
    {
      type: 'uploadImage',
      label: '课程封面',
      name: 'KCTP',
      disabled,
      key: 'KCTP',
      imageurl: imageUrl,
      upurl: '/upload/uploadFile?type=badge',
      accept: '.jpg, .jpeg, .png',
      imagename: 'image'
    },
    {
      type: 'textArea',
      rows: 6,
      label: '课程简介',
      placeholder: '—',
      name: 'KCMS',
      disabled,
      key: 'KCMS'
    }
  ];
  const columns: any = [
    {
      title: '姓名',
      dataIndex: 'XM',
      key: 'XM',
      align: 'center',
      render: (text: any, record: any) => {
        const showWXName = record?.JZGJBSJ?.XM === '未知' && record?.JZGJBSJ?.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={record?.JZGJBSJ?.WechatUserId} />;
        }
        return record?.JZGJBSJ?.XM;
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
      title: '邮箱',
      dataIndex: 'DZXX',
      key: 'DZXX',
      align: 'center',
      render: (text: any, record: any) => {
        return record?.JZGJBSJ?.DZXX;
      }
    },
    {
      title: '操作',
      dataIndex: 'opthion',
      key: 'opthion',
      align: 'center',
      render: (text: any, record: any) => {
        return (
          <a
            onClick={() => {
              history.push({
                pathname: `/courseManagement/courseManagement/courseInfo/teacherInfo`,
                state: {
                  type: 'detail',
                  data: record?.JZGJBSJ
                }
              });
            }}
          >
            详情
          </a>
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
      <div className={classes.content}>
        <div style={{ width: '85%', minWidth: '850px', margin: '0 auto' }} className={classes.formType}>
          <CustomForm values={formValues || {}} formItems={basicForm} formLayout={formItemLayout} hideBtn={true} />
          {formValues?.flag ? (
            <Table
              title={() => '任课教师列表'}
              columns={columns}
              dataSource={teacherData}
              pagination={false}
              size="small"
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

CourseInfo.wrappers = ['@/wrappers/auth'];
export default CourseInfo;
