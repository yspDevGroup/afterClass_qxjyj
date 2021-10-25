/*
 * @description:
 * @author: gxh
 * @Date: 2021-09-23 10:48:13
 * @LastEditTime: 2021-10-25 11:45:06
 * @LastEditors: Sissle Lynn
 */
import { Button } from 'antd';
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
      <div style={{ background: '#fff', padding: '24px 0' }}>
        <StateTab TabState={{ DDZT: '已付款', id }} />
      </div>
    </>
  );
};
export default Detatil;
