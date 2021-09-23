/*
 * @description:
 * @author: gxh
 * @Date: 2021-09-23 10:48:13
 * @LastEditTime: 2021-09-23 17:25:21
 * @LastEditors: gxh
 */
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import StateTab from './component/StateTab';
const Detatil = (props: any) => {
  const { id } = props.location.state;
  return (
    <Tabs>
      <TabPane tab="待付款" key="1">
        <StateTab TabState={{ DDZT: '待付款', id }} />
      </TabPane>
      <TabPane tab="已付款" key="2">
        <StateTab TabState={{ DDZT: '已付款', id }} />
      </TabPane>
      <TabPane tab="已过期" key="3">
        <StateTab TabState={{ DDZT: '已过期', id }} />
      </TabPane>
    </Tabs>
  );
};
export default Detatil;
