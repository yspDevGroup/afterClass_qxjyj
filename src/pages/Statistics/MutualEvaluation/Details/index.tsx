import { Button, Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
import TabList from './compoents/TableList';
import styles from './index.less';

const Details = (props: any) => {
  const { state } = props.location;
  console.log(props.location, ' props.location------');
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          history.go(-1);
        }}
        style={{
          marginBottom: '24px'
        }}
      >
        <LeftOutlined />
        返回上一页
      </Button>

      <div className={styles.TopSearchss}>
        <span>学校名称：{state?.XXMC}</span>
        <span style={{ marginLeft: '20px' }}>课程名称：{state?.data?.KHKCSJ?.KCMC}</span>
        <span style={{ marginLeft: '20px' }}>班级名称：{state?.data?.BJMC}</span>
      </div>
      <Tabs className={styles.details}>
        <TabPane tab="课程反馈" key="1">
          <TabList ListData={{ ListName: '课程反馈', ListState: state.data, XXJBSJId: state?.XXJBSJId }}></TabList>
        </TabPane>
        <TabPane tab="学生评价" key="2">
          <TabList ListData={{ ListName: '学生评价', ListState: state.data, XXJBSJId: state?.XXJBSJId }}></TabList>
        </TabPane>
      </Tabs>
    </>
  );
};

Details.wrappers = ['@/wrappers/auth'];
export default Details;
