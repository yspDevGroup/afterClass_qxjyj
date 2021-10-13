import IconFont from '@/components/CustomIcon';
import { Link } from '@umijs/runtime';
import { Col, Row } from 'antd';

import styles from '../index.less';

const ModuleTitle = (props: { data: any, col?: number, showRight?: boolean}) => {
  const { data, col = 2 ,showRight} = props;
  return (
    <Row>
      <Col span={15}>
        <div className={styles.moduleTitle}>{data}</div>
      </Col>
      <Col span={4} offset={5}>
        {
          showRight?<Link className={styles.allLinks} to={{ pathname: '/teacher/home/course', state: {} }}>
                      全部 <IconFont type="icon-gengduo" />
                    </Link> : ''
        }
      </Col>
    </Row>
  );
};
export default ModuleTitle;
