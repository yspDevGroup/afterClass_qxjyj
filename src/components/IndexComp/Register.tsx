/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-01 08:49:11
 * @LastEditTime: 2021-09-08 20:47:52
 * @LastEditors: wsl
 */
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Button, Form, message, Select } from 'antd';
import img from '@/assets/Company.png';
import { createJYJGSJ, updateJYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import styles from './index.less';
import BasicInfoModal from '../BasicInfoModal';

const { Option } = Select;

const Register = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOk = async (cityAdcode: any) => {
    const res = await updateJYJGSJ({ id: currentUser!.jyjId! }, cityAdcode);
    if (res.status === 'ok') {
      message.success('保存成功');
      setShowModal(false);
      await refresh();
    } else {
      message.error('保存失败，请联系管理员或稍后再试');
    }
  };

  return (
    <div className={styles.Index}>
      <img src={img} alt="" />
      <p className={styles.hello}>您好，欢迎使用课后服务平台</p>
      <p className={styles.apply}>请先完善本教育局相关基本信息</p>
      <Button
        type="primary"
        onClick={() => {
          setShowModal(true);
        }}
      >
        完善基本信息
      </Button>
      <BasicInfoModal showModal={showModal} setShowModal={setShowModal} handleOk={handleOk} form={form} />
    </div>
  );
};
export default Register;
function refresh() {
  throw new Error('Function not implemented.');
}
