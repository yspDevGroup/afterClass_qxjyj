import { Button,Tabs} from 'antd';
import { LeftOutlined,} from '@ant-design/icons';
const { TabPane } = Tabs;
import  TabList from './compoents/TableList'
const Details=(props:any)=>{
  const { state } = props.location;
    return(
        <>
             <Button 
          type="primary"
          onClick={() => {
            history.go(-1);
          }}
          style={{
            marginBottom: '24px',
          }}
        >
          <LeftOutlined />
          返回上一页
        </Button>
        <Tabs>
        <TabPane tab="学生评价" key="1">
                 <TabList ListData={{ListName:'学生评价',ListState:state.data}}></TabList>
                </TabPane>
                <TabPane tab="课程反馈" key="2">
                 <TabList ListData={{ListName:'课程反馈',ListState:state.data}}></TabList>
                </TabPane>

        </Tabs>
            
        </>
    )
}
export default Details