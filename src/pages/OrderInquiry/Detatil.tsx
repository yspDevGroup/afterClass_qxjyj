/*
 * @description:
 * @author: gxh
 * @Date: 2021-09-23 10:48:13
 * @LastEditTime: 2021-09-30 18:53:51
 * @LastEditors: Sissle Lynn
 */
import { Button, Tabs } from 'antd';
const { TabPane } = Tabs;
import { LeftOutlined } from '@ant-design/icons';
import StateTab from './component/StateTab';
const Detatil = (props: any) => {
  const { id } = props.location.state;
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
      <Tabs style={{ background: '#fff', padding: 24 }}>
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
    </>
  );
};
export default Detatil;
