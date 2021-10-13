import ListComp from '../components/ListComponent';
import styles from '../index.less';

const AllNotice = (props: any) => {
const { allDataSource } = props.location.state

  return (
    <div className={styles.allNotice}>
        <ListComp listData={allDataSource} />
    </div>
  );
};

export default AllNotice;
