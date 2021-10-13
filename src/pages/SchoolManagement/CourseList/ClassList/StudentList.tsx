/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-07 08:30:40
 * @LastEditTime: 2021-10-13 10:38:56
 * @LastEditors: Sissle Lynn
 */
import React, { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Card, Col, Avatar, Row, Empty } from 'antd';
import stuImg from '@/assets/stu.png';

import styles from '../index.less';

const { Meta } = Card;
const StudentList = (props: any) => {
  const { state } = props.history.location;
  return (
    <div>
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
      <div>
        <div className={styles.courseWrappers}>
          <div className={styles.searchWrapper}>
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {state.xxmc}
              <span style={{ margin: '0 8px' }}>/</span>
              {state.kcmc}
              <span style={{ margin: '0 8px' }}>/</span>
              {state.value.BJMC}
            </span>
          </div>
          <div style={{ padding: '0 24px 24px' }}>
            {state?.value.KHXSBJs.length ? (
              <Row gutter={[24, 24]}>
                {state?.value.KHXSBJs?.map((item: any) => {
                  return (
                    <Col span={4} key={item.XSId}>
                      <Card style={{ display: 'flex' }}>
                        <Meta
                          avatar={<Avatar src={stuImg} />}
                          style={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          title={item?.XSJBSJ?.XM}
                        />
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

StudentList.wrappers = ['@/wrappers/auth'];

export default StudentList;
