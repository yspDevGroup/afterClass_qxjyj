import React, { useState, useEffect } from 'react';
import { Image, Row, Col, Button } from 'antd';
import styles from './index.less';
import { history } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import defaultImg from '@/assets/vector.png';

import { KHJYJG } from '@/services/after-class-qxjyj/khjyjg';

const AgencyDetails = (props: any) => {
  const { state } = props.history.location;
  const [data, setData] = useState<any>({});

  const getData = async () => {
    console.log('state', state);

    const res = await KHJYJG({ id: state?.value?.id });
    if (res?.status === 'ok') {
      console.log('res', res);

      setData(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      <div className={styles.AgencyDetails}>
        <Row className={styles.wrap}>
          <Col span={12}>
            <div className={styles.header}>
              <Image width={60} src={data?.QYTB || defaultImg} />
              <p style={{ marginLeft: '20px' }}> {data?.QYMC}</p>
            </div>
          </Col>
          <Col span={12} />
        </Row>

        <Row className={styles.wrap}>
          <Col span={12}>
            <p>
              <span>法人姓名：</span>
              {data?.FRDBXM}
            </p>
            <p>
              <span>法人身份证号：</span>
              {data?.FRDBSFZH}
            </p>
            <p>
              <span>组织机构代码：</span>
              {data?.ZZJGDM}
            </p>

            <p>
              <span>办公地址：</span>
              {data?.QYJGDZ}
            </p>
            <p>
              <span>联系人：</span>
              {data?.LXRXM}
            </p>
            <p>
              <span>联系电话：</span>
              {data?.LXDH}
            </p>
            <p>
              <span>行政区编号：</span>
              {data?.XZQHM}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <span>行政区域：</span>
              {data?.XZQ}
            </p>
            <p>
              <span>所属学段：</span>
              {data?.XD}
            </p>
            <p>
              <span>服务范围：</span>
              {data?.JGFWFW}
            </p>
            <p style={{ display: 'flex' }}>
              <span>机构简介：</span>
              <div style={{ width: '300px' }}>{data?.JGJJ}</div>
            </p>
            <p>
              <span>营业执照：</span>
              <Image width={60} src={data?.YYZZ} />
            </p>
            <p>
              <span>办学许可证：</span>
              <Image width={60} src={data?.BXXKZ} />
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

AgencyDetails.wrappers = ['@/wrappers/auth'];
export default AgencyDetails;
