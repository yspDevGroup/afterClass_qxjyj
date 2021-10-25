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
      <div style={{ background: '#fff', padding: '24px 0' }}>
          <Expired TabState={{ DDZT: '已付款', id }} />
      </div>
    </>
  );
};
export default Index;
