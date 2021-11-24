import Expired from './expired';
import styles from './../index.less'

const Index = (props: any) => {
  const { id } = props.state;
  return (
    <>
      <div style={{ background: '#fff'}} className={styles.pd0}>
          <Expired TabState={{ DDZT: ['已付款'], id }} />
      </div>
    </>
  );
};
export default Index;
