/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-01 11:07:27
 * @LastEditTime: 2021-09-01 18:53:09
 * @LastEditors: Sissle Lynn
 */
import { Form, Input, Modal } from 'antd';
import React from 'react';
import styles from './index.less';

const { TextArea } = Input;

const BasicInfoModal = (props: { showModal: boolean, handleOk: any, form: any }) => {
  const { showModal, handleOk, form } = props;

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };

  return (
    <Modal
      title="基本信息维护"
      visible={showModal}
      onOk={handleOk}
      // confirmLoading={confirmLoading}
      onCancel={handleOk}
    >
      <Form
        form={form}//挂载form
        name="userForm"
        {...layout}
      >
        <Form.Item
          label="单位名称"
          name="unitName"
          rules={[{ required: true, message: '请确保输入框不为空' }]}
          wrapperCol = {{offset: 0, span: 6 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="logo"
          name="logo"
          rules={[{ required: true, message: '请确保输入框不为空' }]}
          wrapperCol = {{offset: 0, span: 10 }}
        >
        </Form.Item>
        <Form.Item
          label="所属行政区域"
          name="area"
          rules={[{ required: true, message: '请确保输入框不为空' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="单位简介"
          name="introduction"
          rules={[{ required: true, message: '请确保输入框不为空' }]}
          wrapperCol = {{ span: 16 }}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BasicInfoModal;
