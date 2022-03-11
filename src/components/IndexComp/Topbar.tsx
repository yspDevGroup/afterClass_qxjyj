/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-01 10:53:07
 * @LastEditTime: 2021-09-01 18:30:48
 * @LastEditors: Sissle Lynn
 */
import React from 'react';
import { Col, Row } from 'antd';
import { bgColor, topNum } from './utils';

import styles from './index.less';

const Topbar = (props: { data: any }) => {
  const { data } = props;
  console.log(data, '------');
  return (
    <Row gutter={[24, 24]} className={styles.topHeader}>
      {topNum.map((item, index) => {
        console.log(item, 'item');
        return (
          <Col span={4} key={item.title}>
            <div
              className={styles.headerItem}
              style={{ background: `linear-gradient(180deg, ${bgColor[index].begin} 0%, ${bgColor[index].end} 100%)` }}
            >
              {item.type === 'xsNum' && Number(data?.[item.type]) + Number(data?.khfwxs_count) ? (
                <h3>{Number(data?.[item.type]) + Number(data?.khfwxs_count)}</h3>
              ) : (
                <h3>{data?.[item.type]}</h3>
              )}
              <p title={item.title}>{item.title}</p>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
export default Topbar;
