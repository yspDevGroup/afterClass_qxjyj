/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-17 19:55:27
 * @LastEditTime: 2021-09-02 12:03:28
 * @LastEditors: Sissle Lynn
 */
import { Empty } from 'antd';
import { Pie } from '@ant-design/charts';
import noData from '@/assets/noData.png';

import styles from './index.less';
import { pieConfig } from './utils';



const PieChart = (props: { data?: any, noDataImg?: any, noDataText?: string }) => {
  const { data,  noDataImg = noData, noDataText = '暂无信息' } = props;
  pieConfig.data = data;

  return (
    <div className={styles.chartWrapper}>
      {data?.length ? <Pie {...pieConfig} /> : <Empty
        image={noDataImg}
        imageStyle={{
          height: 80,
        }}
        description={noDataText} />}
    </div>
  );
};

export default PieChart;
