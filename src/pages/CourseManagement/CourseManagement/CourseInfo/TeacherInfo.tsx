/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-26 16:24:39
 * @LastEditTime: 2021-09-10 16:23:29
 * @LastEditors: wsl
 */
import React, { useEffect, useState } from 'react';
import { useModel, history } from 'umi';
import moment from 'moment';
import { Button, FormInstance, message } from 'antd';
import CustomForm from '@/components/CustomForm';
import { FormItemType } from '@/components/CustomForm/interfice';
import { createKHJSSJ, updateKHJSSJ } from '@/services/after-class-qxjyj/khjssj';
import { LeftOutlined } from '@ant-design/icons';

import 'antd/es/modal/style';
import styles from './index.less';

const formItemLayout = {
  labelCol: { flex: '7em' },
  wrapperCol: { flex: 'auto' }
};
type PropsType = {
  values: any;
  setForm: React.Dispatch<React.SetStateAction<FormInstance<any> | undefined>>;
  readonly?: boolean;
};
const TeacherInfo = (props: any) => {
  const { state } = props.location;
  const values = state?.data;
  const { setForm, readonly = true } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [info, setInfo] = useState<any>();
  const [zpUrl, setZPUrl] = useState('');
  const [zgzsUrl, setZGZSUrl] = useState('');
  useEffect(() => {
    if (values) {
      setZPUrl(values.ZP ? values.ZP : '');
      setZGZSUrl(values.ZGZS ? values.ZGZS : '');
      setInfo(values);
    }
  }, [values]);
  // 文件状态改变的回调
  const imageChange = (type: string, e?: any) => {
    if (e.file.status === 'done') {
      const mas = e.file.response.message;
      if (typeof e.file.response === 'object' && e.file.response.status === 'error') {
        message.error(`上传失败，${mas}`);
      } else {
        const res = e.file.response;
        if (res.status === 'ok') {
          message.success(`上传成功`);
          type === 'ZP' ? setZPUrl(res.data) : setZGZSUrl(res.data);
        }
      }
    } else if (e.file.status === 'error') {
      const mass = e.file.response.message;
      message.error(`上传失败，${mass}`);
    }
  };
  const basicForm: FormItemType[] = [
    {
      type: 'input',
      label: 'id',
      name: 'id',
      key: 'id',
      hidden: true
    },
    {
      type: 'input',
      label: 'KHJYJGId',
      name: 'KHJYJGId',
      key: 'KHJYJGId',
      hidden: true
    },
    {
      type: 'group',
      key: 'group1',
      groupItems: [
        {
          type: 'uploadImage',
          label: '个人照片',
          name: 'ZP',
          key: 'ZP',
          imageurl: zpUrl,
          upurl: '/api/upload/uploadFile?type=badge&plat=agency',
          accept: '.jpg, .jpeg, .png',
          imagename: 'image',
          handleImageChange: (value: any) => {
            imageChange('ZP', value);
          }
        },
        {
          type: 'uploadImage',
          label: '资格证书',
          name: 'ZGZS',
          key: 'ZGZS',
          imageurl: zgzsUrl,
          upurl: '/api/upload/uploadFile?type=badge&plat=agency',
          accept: '.jpg, .jpeg, .png',
          imagename: 'image',
          handleImageChange: (value: any) => {
            imageChange('ZGZS', value);
          }
        }
      ]
    },
    {
      type: 'group',
      key: 'group2',
      groupItems: [
        {
          type: 'input',
          label: '姓名',
          name: 'XM',
          key: 'XM',
          rules: [{ required: true, message: '请输入姓名' }],
          placeholder: readonly ? '——' : ''
        },
        {
          type: 'input',
          label: '资格证书编号',
          name: 'ZGZSBH',
          key: 'ZGZSBH',
          placeholder: readonly ? '——' : ''
        }
      ]
    },
    {
      type: 'group',
      key: 'group3',
      groupItems: [
        {
          type: 'input',
          label: '性别',
          name: 'XB',
          key: 'XB',
          placeholder: readonly ? '——' : ''
        },
        {
          type: 'input',
          label: '学历',
          name: 'XL',
          key: 'XL',
          placeholder: readonly ? '——' : ''
        }
      ]
    },
    {
      type: 'group',
      key: 'group4',
      groupItems: [
        {
          type: 'input',
          label: '民族',
          name: 'MZ',
          key: 'MZ',
          placeholder: readonly ? '——' : ''
        },
        {
          type: 'input',
          label: '毕业院校',
          name: 'BYYX',
          key: 'BYYX',
          placeholder: readonly ? '——' : ''
        }
      ]
    },
    {
      type: 'group',
      key: 'group6',
      groupItems: [
        {
          type: 'input',
          subtype: 'date',
          label: '出生日期',
          name: 'CSRQ',
          key: 'CSRQ',
          placeholder: '——'
        },
        {
          type: 'input',
          label: '专业',
          name: 'SXZY',
          key: 'ZY',
          placeholder: readonly ? '——' : ''
        }
      ]
    },
    {
      type: 'group',
      key: 'group7',
      groupItems: [
        {
          type: 'input',
          label: '联系电话',
          name: 'LXDH',
          key: 'LXDH',
          placeholder: readonly ? '——' : '',
          rules: [{ required: true, message: '请输入联系电话' }]
        },
        {
          type: 'inputNumber',
          label: '教龄（年）',
          name: 'JL',
          key: 'JL',
          placeholder: readonly ? '-' : '',
          formatter: (value) => `${Math.round(value)}`,
          tooltip: '注意：教龄四舍五入，只能填写整数'
        }
      ]
    },
    {
      type: 'group',
      key: 'group8',
      groupItems: [
        {
          type: 'input',
          key: 'SFZJLX',
          name: 'SFZJLX',
          label: '证件类型',
          placeholder: readonly ? '——' : ''
        },
        {
          type: 'input',
          label: '教授科目',
          name: 'JSKM',
          key: 'JSKM',
          placeholder: readonly ? '——' : ''
        }
      ]
    },
    {
      type: 'group',
      key: 'group9',
      groupItems: [
        {
          type: 'input',
          key: 'SFZJH',
          name: 'SFZJH',
          label: '证件号码',
          placeholder: readonly ? '——' : ''
        },
        {
          type: 'input',
          label: '电子邮箱',
          name: 'DZXX',
          key: 'DZXX',
          placeholder: readonly ? '——' : ''
        }
      ]
    },
    {
      type: 'group',
      key: 'group10',
      groupItems: [
        {},
        {
          type: 'textArea',
          label: '个人简介',
          name: 'BZ',
          key: 'BZ',
          placeholder: readonly ? '——' : ''
        }
      ]
    }
  ];
  const onFinish = async (values: any) => {
    let res;
    values.CSRQ = values.CSRQ ? moment(values.CSRQ).format('YYYY-MM-DD') : undefined;
    values.ZGZS = zgzsUrl ? zgzsUrl : values.ZGZS;
    values.ZP = zpUrl ? zpUrl : values.ZP;

    if (values.id) {
      res = await updateKHJSSJ(
        {
          id: values.id
        },
        values
      );
    } else {
      res = await createKHJSSJ(values);
    }
    if (res.status === 'ok') {
      message.success('保存成功');
      history.go(-1);
    } else {
      let msg = res.message;
      message.error(msg);
    }
  };
  return (
    <>
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
      <div className={styles.teacherWrapper}>
        <div className={styles.teacherInfoBody}>
          <CustomForm
            values={(() => {
              if (info) {
                const { CSRQ, XB, ...rest } = info;
                return {
                  CSRQ: CSRQ ? moment(CSRQ) : '',
                  XB: XB === '男性' ? '男' : '女',
                  ...rest
                };
              }
              return {
                XB: '男',
                KHJYJGId: currentUser?.jgId
              };
            })()}
            formDisabled={readonly}
            setForm={setForm}
            formItems={basicForm}
            formLayout={formItemLayout}
            onFinish={onFinish}
            hideBtn={true}
          />
        </div>
      </div>
    </>
  );
};
TeacherInfo.wrappers = ['@/wrappers/auth'];
export default TeacherInfo;