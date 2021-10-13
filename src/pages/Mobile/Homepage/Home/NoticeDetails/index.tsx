import styles from '../index.less';
import { Button, Col, Row, Tabs } from 'antd';

const NoticeDetails = (props: any) => {
const { allDataSource, index } = props.location.state

  return (
    <div style={{marginTop: '20px'}}>
        <Row gutter={[0, 32]}>
          <Col span={20} offset={2}>
           <h2 style={{textAlign:'center'}}>{allDataSource[index].BT}</h2>
          </Col>
        </Row>
        <Row gutter={[0, 32]}>
          <Col span={10} offset={7}>
           {allDataSource[index].RQ}
          </Col>
        </Row>
        <Row gutter={[0, 32]}>
          <Col span={20} offset={2}>
            <div dangerouslySetInnerHTML={{__html: allDataSource[index].NR}}></div>
          </Col>
        </Row>
    </div>
  );
};

export default NoticeDetails;
