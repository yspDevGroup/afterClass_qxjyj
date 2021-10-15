import { Button, Tabs } from 'antd';
import Expired from './expired';
import { LeftOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const Index = (props: any) => {
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
        <TabPane tab="已付款" key="2">
          <Expired TabState={{ DDZT: '已付款', id }} />
        </TabPane>
        <TabPane tab="待付款" key="1">
          <Expired TabState={{ DDZT: '待付款', id }} />
        </TabPane>
        <TabPane tab="已过期" key="3">
          <Expired TabState={{ DDZT: '已过期', id }} />
        </TabPane>
      </Tabs>
    </>
  );
};
export default Index;
