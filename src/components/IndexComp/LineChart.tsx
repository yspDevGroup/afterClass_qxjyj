/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-17 19:55:27
 * @LastEditTime: 2021-09-09 11:49:37
 * @LastEditors: Sissle Lynn
 */
import { Empty } from 'antd';
import { Line } from '@ant-design/charts';
import noData from '@/assets/noData.png';

import styles from './index.less';
import { lineConfig } from './utils';

const LineChart = (props: { data?: any, noDataImg?: any, noDataText?: string }) => {
  const { data, noDataImg = noData, noDataText = '暂无信息' } = props;
  lineConfig.data = data;

  return (
    <div className={styles.chartContainer}>
      {data?.length ? <Line {...lineConfig} /> : <Empty
        image={noDataImg}
        imageStyle={{
          height: 80,
        }}
        description={noDataText} />}
    </div>
  );
};

export default LineChart;
