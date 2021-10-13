import { useEffect, useState } from 'react';
import { Rate, Modal } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getKHBJPJ } from '@/services/after-class-qxjyj/khbjpj';
import { getAllKHXSPJ } from '@/services/after-class-qxjyj/khxspj';

const TabList = (props: any) => {
  const { ListName, ListState } = props.ListData;
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const teacher: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '评价人',
      dataIndex: 'PJR',
      key: 'PJR',
      align: 'center',
      width: 150,
    },
    {
      title: '评价时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 200,
    },
    {
      title: '课程评分',
      dataIndex: 'PJFS',
      key: 'PJFS',
      align: 'center',
      width: 200,
      render: (_, record) => <Rate count={5} defaultValue={record?.PJFS} disabled={true} />,
    },
    {
      title: '评价内容',
      dataIndex: 'PY',
      key: 'PY',
      align: 'center',
      width: 240,
      ellipsis: true
    },
  ];

  const student: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 58,
      align: 'center'
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      render: (text: any, record: any) => {
        return record?.XSJBSJ?.XM
      },
    },
    {
      title: '课程班',
      dataIndex: 'BJMC',
      key: 'BJMC',
      align: 'center',
      render: () => {
        return <span>{ListState.BJMC}</span>;
      },
    },
    {
      title: '评价教师',
      dataIndex: 'JZGJBSJ',
      key: 'JZGJBSJ',
      align: 'center',
      width: 200,
      render: (_,record) => {
        return <span>{record?.JZGJBSJ?.XM}</span>;
      },
    },
    {
      title: '评价时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 200,
    },
    {
      title: '课程评分',
      dataIndex: 'PJFS',
      key: 'PJFS',
      align: 'center',
      width: 200,
      render: (_, record) => <Rate count={5} defaultValue={record?.PJFS} disabled={true} />,
    },
    {
      title: '该学生课堂表现',
      dataIndex: 'PY',
      key: 'PY',
      align: 'center',
      render: (text: any) => {
        return (
          <a
            onClick={() => {
              setDetailsValue(text)
              setIsModalVisible(true)
            }}
          >
            课堂表现
          </a>
        );
      },
    },
  ];
  // 弹出框显示隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [DetailsValue, setDetailsValue] = useState('');
  // 学生详情评价列表
  const [StuList, setStuList] = useState<API.KHXSDD[] | undefined>([]);
  // 老师列表
  const [teacherList, setTeacherList] = useState<API.KHXSDD[] | undefined>([]);
  useEffect(() => {
    if (ListName === '学生评价') {
      (async () => {
        const res2 = await getAllKHXSPJ({
          KHBJSJId: ListState.id,
          XNXQId:ListState?.XNXQId,
          JSId: '',
          page: 0,
          pageSize: 0,
        });
        if (res2.status === 'ok') {
          // 老师给学生的评语
          setStuList(res2.data?.rows)
        }
      })()
    } else {
      (async () => {
        const res = await getKHBJPJ({
          // 课后课程班数据
          KHBJSJId: ListState.id,
          XSJBSJId: '',
          XXJBSJId: '',
          XNXQId:ListState?.XNXQId,
          page: 0,
          pageSize: 0,
        });
        if (res?.data?.rows) {
          //家长给老师的评价
          setTeacherList(res.data.rows);
        }
      })();
    }
  }, []);
  return (
    <div>
      <ProTable
        columns={ListName === '学生评价' ? student : teacher}
        dataSource={ListName === '学生评价' ? StuList : teacherList}
        rowKey="id"
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false,
        }}
      />
      <Modal visible={isModalVisible} onCancel={handleCancel} title='表现详情'
        footer={null}
      >
        <span>{DetailsValue}</span>
      </Modal>
    </div>
  )
}

export default TabList;
