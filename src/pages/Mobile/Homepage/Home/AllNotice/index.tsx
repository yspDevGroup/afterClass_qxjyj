import { Button } from 'antd';
import ListComp from '../components/ListComponent';
import styles from '../index.less';
import { history } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import { JYJGTZGG } from '@/services/after-class-qxjyj/jyjgtzgg';
import TopNav from './../components/TopNav'

const AllNotice = (props: any) => {
const { allDataSource , type } = props.location.state

  return (
    <div>
      <TopNav title="全部公告" state={true}/>
      <div className={styles.allNotice}>

      <div style={{marginTop: 50}}>
        <ListComp listData={allDataSource} />
      </div>
    </div>
    </div>

  );
};

export default AllNotice;
