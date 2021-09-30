import ProTable from '@ant-design/pro-table';
import { Link, useModel } from 'umi';

import { useEffect, useState } from 'react';
import { Select,Rate } from 'antd';
import {getClassesEvaluation}from '@/services/after-class-qxjyj/khbjsj'
// import styles from './index.less'


const { Option } = Select;

const Class =(props:any)=>{
   const{id,KCMC}=props.location.state.data
   
    
    const columns: ProColumns<TermItem>[]=[
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            width: 58,
            align: 'center'
          },
          {
            title: '班级名称',
            dataIndex: 'BJMC',
            key: 'BJMC',
            align: 'center',
            // render:(text:any)=>text.BJMC
          
          },
          {
            title: '主讲师',
            dataIndex: '',
            key: '',
            align: 'center',
            render:(_,record)=>{
              return record.KHBJJs.map((item) => {
                return <div>{item.KHJSSJ.XM}</div>;
              });
              }
            },
            {
              title: '评价人数',
              dataIndex: 'pj_count',
              key: ' pj_count',
              align: 'center',
              render:(text:any)=>text
             
            },
  
          // {
          //   title: '教育机构',
          //   dataIndex: 'KHJYJG',
          //   key: 'KHJYJG',
          //   align: 'center',
          //   // render:(text:any,record:any)=>record.KHKCSJ.KHJYJG.QYMC

          
          
          // },
          {
            title: '班级评分',
            dataIndex: 'pj_avg',
            key: 'pj_avg',
            align: 'center',
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
                    pathname: '/statistics/MutualEvaluation/Details',
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
    ]
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState || {};
  const [classList, SetclassList] = useState<any>();
  const [dataSource, setDataSource] = useState<API.KHXSDD[] | undefined>([]);

const choseclass=()=>{
    
}
useEffect(()=>{
  (async()=>{
    const res =await getClassesEvaluation({XNXQId:currentUser?.XNXQId})
    console.log(res);
    
    setDataSource(res.data.rows)
     })()

},[])
    return(
        <>
           <div >
             <div style={{fontWeight:'bold',fontSize:'25px',padding:'24px 0'}}>课程名称:{KCMC}</div>
        <span>
          班级名称:
          <Select
            // value={}
            style={{ width: 200 }}
            onChange={(value: string) => {
              // 选择不同课程
              choseclass(value);
            }}
          >
            {classList?.map((item: any) => {
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
export default Class