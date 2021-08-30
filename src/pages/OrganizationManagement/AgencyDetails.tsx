import React, { useState } from 'react';
import { Modal, Image, Row, Col, Divider } from 'antd';
import styles from './index.less';

const AgencyDetails = (props: any) => {
  const { state } = props.history.location;
  return (
    <div className={styles.AgencyDetails}>
      <div className={styles.header}>
        <Image width={100} src="https://img2.baidu.com/it/u=171918543,1850609786&fm=26&fmt=auto&gp=0.jpg" />
        <p> {state.value?.QYMC}</p>
      </div>
      <Divider />
      <Row className={styles.wrap}>
        <Col span={12}>
          <p>
            <span>组织机构代码：</span>
            {state.value?.FRDBSFZH}
          </p>
          <p>
            <span>法人代表姓名：</span>
            {state.value?.FRDBXM}
          </p>
          <p>
            <span>法人代表身份证号：</span>
            {state.value?.FRDBSFZH}
          </p>
          <p>
            <span>企业机构地址：</span>
            {state.value?.QYJGDZ}
          </p>
          <p>
            <span>联系人姓名：</span>
            {state.value?.LXRXM}
          </p>
          <p>
            <span>联系人电话：</span>
            {state.value?.LXDH}
          </p>
          <p>
            <span>行政区编号：</span>
            {state.value?.XZQHM}
          </p>
        </Col>
        <Col span={12}>
          <p>
            <span>机构服务范围：</span>
            {state.value?.JGFWFW}
          </p>
          <p style={{ display: 'flex' }}>
            <span>机构简介：</span>
            <div style={{ width: '300px' }}>{state.value?.JGJJ}</div>
          </p>
          <p>
            <span>营业执照：</span>
            <Image width={100} src="https://img0.baidu.com/it/u=3950425853,3989742947&fm=26&fmt=auto&gp=0.jpg" />
          </p>
          <p>
            <span>办学许可证：</span>
            <Image width={100} src="https://img0.baidu.com/it/u=3950425853,3989742947&fm=26&fmt=auto&gp=0.jpg" />
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default AgencyDetails;
