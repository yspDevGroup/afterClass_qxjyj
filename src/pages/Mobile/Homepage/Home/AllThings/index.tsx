import styles from '../index.less';
import ListComp from '../components/ListComponent';

const AllThings = (props: any) => {
const { allDataSource } = props.location.state
console.log('allDataSource: ', allDataSource);

  return (
    <div className={styles.allThings}>
        <ListComp listData={allDataSource} />
    </div>
  );
};

export default AllThings;
