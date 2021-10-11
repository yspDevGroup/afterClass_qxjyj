import { Select,Rate } from 'antd';
import { useEffect, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import{getCoursesEvaluation} from '@/services/after-class-qxjyj/jyjgsj'
import { Link, useModel } from 'umi';
import { await } from '@umijs/deps/compiled/signale';
import { Button,} from 'antd';
import { LeftOutlined,} from '@ant-design/icons';


import styles from'../index.less'



const { Option } = Select;

const MutualEvaluation=(data:any)=>{
  const {id}=data.location.state
  console.log(data);
  
    const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  
  // 学年学期列表数据
  const [termList, setTermList] = useState<any>();
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);

  useEffect(()=>{
      (async()=>{
        // XXJBSJId:id
          const res=await getCoursesEvaluation({XZQHM:currentUser?.XZQHM,XXJBSJId:id})
          console.log(res.data);
          
          setDataSource(res.data.rows)
          
   })()

  },[])
  const columns: ProColumns<TermItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 58,
      align: 'center'
    },
    {
      title: '课程名称',
      dataIndex: 'KCMC',
      key: 'KCMC',
      align: 'center',
    
    },
    {
      title: '课程类型',
      dataIndex: 'KHKCLX',
      key: 'KHKCLX',
      align: 'center',
      render: (test: any) => {
        return test?.KCTAG;
      },
    },
    {
      title: '课程来源',
      dataIndex: 'KHJYJG',
      key: 'KHJYJG',
      align: 'center',
      render: (test:any,record:any) =>{
       return  record.SSJGLX?record?.SSJGLX:'-'
      }
      
  },
    {
        title: '所属学校',
        dataIndex: 'XXJBSJ',
        key: 'XXJBSJ',
        align: 'center',
         render:(test:any,record: any)=>{
             return record.XXJBSJ ? record?.XXJBSJ.XXMC : '—'
            }

    },
  
    {
      title: '课程评分',
      dataIndex: 'PJFS',
      key: 'PJFS',
      align: 'center',
      width: 200,
      render: (text:any) => <Rate count={5} defaultValue={text} disabled={true} />,
    },
   
    {
      title: '操作',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      render: (_, record) => (
        <>
          <Link
            to={{
              pathname: '/statistics/MutualEvaluation/Class',
              state: {
                type: 'detail',
                data: record,
              },
            }}
          >
            详情
          </Link>
        </>
      ),
    },
  ];
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
         <div className={styles.TopBoxserch}>
        <span >
          课程名称:
          <Select
            // value={}
            style={{ width: 200 }}
            onChange={(value: string) => {
              // 选择不同学期从新更新页面的数据
            //   setCurXNXQId(value);
            }}
          >
            {termList?.map((item: any) => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.text}
                </Option>
              );
            })}
          </Select>
        </span>
      </div>
      <ProTable
       columns={columns}
       dataSource={dataSource}
       rowKey="id"
       search={false}
       options={{
         setting: false,
         fullScreen: false,
         density: false,
         reload: false,
       }}

      />
        </>
    )
   
}
MutualEvaluation.wrappers = ['@/wrappers/auth'];
export default MutualEvaluation