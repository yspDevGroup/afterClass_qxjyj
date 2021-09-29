/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-29 11:17:44
 * @LastEditTime: 2021-09-29 11:19:23
 * @LastEditors: Sissle Lynn
 */
import React from 'react';
import { Col, Row } from 'antd';

import styles from '../index.less';

const List = (props: { data: any, col?: number, }) => {
  const { data, col = 2, } = props;
  return (
    <Row className={styles.serviceList}>
      {data.map((item: any, index: number) => {
        return <Col span={24 / col} key={item.title} style={{ marginTop: index >= col ? 24 : 0 }}>
          <p>{item}</p>
        </Col>
      })}
    </Row>
  );
};
export default List;
