import styles from '../index.less';
import ListComp from '../components/ListComponent';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { history } from 'umi';

const AllThings = (props: any) => {
const { allDataSource } = props.location.state
console.log('allDataSource: ', allDataSource);

  return (
    <div className={styles.allThings}>
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

export default AllThings;
