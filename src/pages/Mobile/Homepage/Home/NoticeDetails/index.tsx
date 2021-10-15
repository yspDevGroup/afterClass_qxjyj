import styles from '../index.less';
import { Button, Col, Row, Tabs } from 'antd';
import { JYJGTZGG } from '@/services/after-class-qxjyj/jyjgtzgg';
import { LeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { history } from 'umi';

const NoticeDetails = (props: any) => {
const { allDataSource, index } = props.location.state
const [nrInfo, setNrInfo] = useState<any>();

useEffect(()=>{
  getData();
},[allDataSource[index].id])

const getData = async () => {
  const result = await JYJGTZGG({ id: allDataSource[index].id });
  setNrInfo(result.data.NR);
}

  return (
    <div style={{marginTop: '20px',padding:'10px'}}>
      <Button
        type="primary"
        onClick={() => {
          history.goBack();
        }}
        style={{
          marginBottom: '24px'
        }}
      >
        <LeftOutlined />
        返回上一页
      </Button>
        <Row gutter={[0, 32]}>
          <Col span={20} offset={2}>
           <h2 style={{textAlign:'center',fontWeight:'bold'}}>{allDataSource[index].BT}</h2>
          </Col>
        </Row>
        <Row gutter={[0, 32]}>
          <Col span={10} offset={7}>
           {allDataSource[index].RQ}
          </Col>
        </Row>
        <Row gutter={[0, 32]}>
          <Col span={20} offset={2}>
            <div dangerouslySetInnerHTML={{__html: nrInfo}}></div>
          </Col>
        </Row>
    </div>
  );
};

export default NoticeDetails;
