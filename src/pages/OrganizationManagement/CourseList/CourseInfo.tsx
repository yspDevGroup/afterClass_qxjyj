/* eslint-disable max-nested-callbacks */
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { history } from 'umi';
import classes from './index.less';
import { LeftOutlined } from '@ant-design/icons';
import CustomForm from '@/components/CustomForm';
import { FormItemType } from '@/components/CustomForm/interfice';
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
  const [JSSJOptions, setJSSJOptions] = useState<any>([]);
  const [NJDataOption, setNJDataOption] = useState<any>([]);
  const [formValues, setFormValues] = useState({});
  const [teacherData, setTeacherData] = useState<any>([]);
  useEffect(() => {
    setDisabled(true);
    // 老师表格数据
    const thData: any[] = [];
    state?.KHKCJs?.forEach((item: any) => {
      thData.push(item?.KHJSSJ);
    });
    setTeacherData(thData);
    if (state?.id) {
      // form详情
      const params = {
        KCMC: state?.KCMC || '',
        KCMS: state?.KCMS || '',
        njIds: state?.NJSJs?.map((item: any) => (item.XD === '初中' ? item?.NJMC : `${item.XD}${item?.NJMC}`)) || '',
        jsIds: state?.KHKCJs?.map((item: any) => item?.KHJSSJ?.XM) || '',
        KCTP: state?.KCTP || '',
        KHKCLX: state?.KHKCLX?.KCTAG || ''
      };
      setImageUrl(state?.KCTP || '');
      setFormValues(params);
    }
  }, []);

  const basicForm: FormItemType[] = [
    {
      type: 'group',
      key: 'group1',
      groupItems: [
        {
          type: 'input',
          label: '课程名称',
          placeholder: '',
          name: 'KCMC',
          key: 'KCMC',
          disabled
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
          placeholder: '',
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
          placeholder: '',
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
          label: '代课老师',
          placeholder: '',
          key: 'jsIds',
          name: 'jsIds',
          disabled,
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
      label: '课程简介',
      placeholder: '',
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
      align: 'center'
    },
    {
      title: '联系电话',
      dataIndex: 'LXDH',
      key: 'LXDH',
      align: 'center'
    },
    {
      title: '邮箱',
      dataIndex: 'DZXX',
      key: 'DZXX',
      align: 'center'
    }
  ];
  return (
    <div className={classes.content}>
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
      <div style={{ width: '85%', minWidth: '850px', margin: '0 auto' }} className={classes.formType}>
        <CustomForm values={formValues || {}} formItems={basicForm} formLayout={formItemLayout} hideBtn={true} />
        <Table
          title={() => '代课老师列表'}
          columns={columns}
          dataSource={teacherData}
          pagination={false}
          size="small"
        />
      </div>
    </div>
  );
};

CourseInfo.wrappers = ['@/wrappers/auth'];
export default CourseInfo;
