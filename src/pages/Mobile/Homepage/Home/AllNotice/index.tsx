import { Button } from 'antd';
import ListComp from '../components/ListComponent';
import styles from '../index.less';
import { history } from 'umi';
import { LeftOutlined } from '@ant-design/icons';

const AllNotice = (props: any) => {
const { allDataSource } = props.location.state

  return (
    <div className={styles.allNotice}>
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
        <ListComp listData={allDataSource} />
    </div>
  );
};

export default AllNotice;
