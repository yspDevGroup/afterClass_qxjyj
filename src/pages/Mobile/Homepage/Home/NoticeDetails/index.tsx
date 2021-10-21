import { Col, Row } from 'antd';
import { JYJGTZGG } from '@/services/after-class-qxjyj/jyjgtzgg';
import { useEffect, useState } from 'react';
import TopNav from './../components/TopNav'

const NoticeDetails = (props: any) => {
  const { allDataSource, index } = props.location.state
  const [nrInfo, setNrInfo] = useState<any>();

  useEffect(() => {
    if(allDataSource[index].KCMC){
      return;
    }
    getData();
  }, [allDataSource[index].id])

  const getData = async () => {
    const result = await JYJGTZGG({ id: allDataSource[index].id });
    setNrInfo(result.data.NR);
  }

  return (
    <div>
      <TopNav />
      <div style={{padding: '65px 10px' }}>
        <Row gutter={[0, 32]}>
          <Col span={20} offset={2}>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{allDataSource[index].BT || allDataSource[index].KCMC}</h2>
          </Col>
        </Row>
        <Row gutter={[0, 32]}>
          <Col span={10} offset={7}>
            {allDataSource[index].RQ || allDataSource[index].createdAt}
          </Col>
        </Row>
        <Row gutter={[0, 32]}>
          <Col span={20} offset={2}>
            <div dangerouslySetInnerHTML={{ __html: nrInfo || allDataSource[index].KCMS}}></div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NoticeDetails;
