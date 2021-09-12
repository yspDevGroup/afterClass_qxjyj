import React, { useState } from 'react';
import { Image, Row, Col, Button } from 'antd';
import styles from './index.less';
import { history } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import defaultImg from '@/assets/vector.png';

const AgencyDetails = (props: any) => {
  const { state } = props.history.location;
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
      <div className={styles.AgencyDetails}>
        <Row className={styles.wrap}>
          <Col span={12}>
            <div className={styles.header}>
              <Image width={60} src={state.value?.QYTB || defaultImg} />
              <p style={{ marginLeft: '20px' }}> {state.value?.QYMC}</p>
            </div>
          </Col>
          <Col span={12} />
        </Row>

        <Row className={styles.wrap}>
          <Col span={12}>
            <p>
              <span>法人姓名：</span>
              {state.value?.FRDBXM}
            </p>
            <p>
              <span>法人身份证号：</span>
              {state.value?.FRDBSFZH}
            </p>
            <p>
              <span>组织机构代码：</span>
              {state.value?.ZZJGDM}
            </p>

            <p>
              <span>办公地址：</span>
              {state.value?.QYJGDZ}
            </p>
            <p>
              <span>联系人：</span>
              {state.value?.LXRXM}
            </p>
            <p>
              <span>联系电话：</span>
              {state.value?.LXDH}
            </p>
            <p>
              <span>行政区编号：</span>
              {state.value?.XZQHM}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <span>行政区域：</span>
              {state.value?.XZQ}
            </p>
            <p>
              <span>所属学段：</span>
              {state.value?.XD}
            </p>
            <p>
              <span>服务范围：</span>
              {state.value?.JGFWFW}
            </p>
            <p style={{ display: 'flex' }}>
              <span>机构简介：</span>
              <div style={{ width: '300px' }}>{state.value?.JGJJ}</div>
            </p>
            <p>
              <span>营业执照：</span>
              <Image width={60} src={state.value?.YYZZ} />
            </p>
            <p>
              <span>办学许可证：</span>
              <Image width={60} src={state.value?.BXXKZ} />
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

AgencyDetails.wrappers = ['@/wrappers/auth'];
export default AgencyDetails;
