import { Row, Col, Divider } from 'antd';
import Bars from './component/Bar'
import PieChart from '@/components/IndexComp/PieChart';
import styles from './index.less'
const ChartsPage = (props: any) => {
  const Piedata = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const style = { height: '900px', }
  return (
    <div className={styles.diaplayBox}>
      {/* 头部 */}
      <div className={styles.diaplayTop}/>
      <div className={ styles.content}>
      <Row gutter={[20, 0]}>
        <Col span={7} style={style} className={styles.diaplayCol} >
          <div>

            <span className='boxfoot' />
          </div>
          <div>
            <span className='boxfoot' />


          </div>
          <div>3
            <span className='boxfoot' />
          </div>
        </Col>
        <Col span={9} style={style} className={styles.diaplayCol} >
          <span>
            <p />
          </span>
          <span>
            <p />
          </span>
          <span>
            <p />
          </span>

        </Col>
        <Col span={7} style={style} className={styles.diaplayCol} >
          <p>
            <span/>
          </p>
          <p>
          <span/>
           
          </p>
        </Col>
      </Row>

      </div>
  
    </div>

  )
}
ChartsPage.wrappers = ['@/wrappers/auth'];
export default ChartsPage