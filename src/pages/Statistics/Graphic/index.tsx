import { Row, Col, Divider } from 'antd';
import bgImg from '@/assets/dispalyBgc.png';
import headerImg from '@/assets/headLine.png';

import styles from './index.less';
import NumberCollect from './component/NumberCollect';
import { mock, textColor1, textColor2 } from './component/utils';
import PieChart from './component/PieChart';

const ChartsPage = (props: any) => {
  return (
    <div className={styles.diaplayBox} style={{ backgroundImage: `url(${bgImg})` }}>
      {/* 头部 */}
      <div className={styles.diaplayTop} style={{ backgroundImage: `url(${headerImg})` }} />
      <div className={styles.content} style={{ marginTop: 24, padding: '0 12px', }}>
        <Row className={styles.bodyRow}>
          <Col span={7} className={styles.diaplay1} >
            <div>
              <span className={styles.boxfoot} />
              <header>
                课后服务情况
              </header>
              <div className={styles.container}>
                <NumberCollect data={mock.serviceNum} color={textColor1} />
              </div>
            </div>
            <div>
              <span className={styles.boxfoot} />
              <header>
                各类课程开设情况
              </header>
              <div className={styles.container}>
                <PieChart data={mock.courseCollect} />
              </div>
            </div>
            <div>
              <span className={styles.boxfoot} />
              <header>
                今日学生出勤情况
              </header>
              <div className={styles.container}>
                <NumberCollect data={mock.checkOut} col={3} color={textColor2} />
              </div>
            </div>
          </Col>
          <Col span={10} className={styles.diaplay2} >
            <div>
              <span className={styles.boxfoot} />
              <div className={styles.container}>
                <NumberCollect data={mock.numCollect} col={3} reverse={true} />
              </div>
            </div>
            <div>
              <span className={styles.boxfoot} />
              <header>
                开设服务学校
              </header>
              <div className={styles.container}>
              </div>
            </div>
            <div>
              <span className={styles.boxfoot} />
              <header>
                本学期各校开课情况
              </header>
              <div className={styles.container}>
              </div>
            </div>
          </Col>
          <Col span={7} className={styles.diaplay3} >
            <div>
              <span className={styles.boxfoot} />
            </div>
            <div>
              <span className={styles.boxfoot} />
            </div>
          </Col>
        </Row>

      </div>

    </div>

  )
}
ChartsPage.wrappers = ['@/wrappers/auth'];
export default ChartsPage
