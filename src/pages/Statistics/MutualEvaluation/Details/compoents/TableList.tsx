import { useEffect, useState } from 'react';
import { Rate, Modal } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getKHBJPJ } from '@/services/after-class-qxjyj/khbjpj';
import { getAllKHXSPJ } from '@/services/after-class-qxjyj/khxspj';
import WWOpenDataCom from '@/components/WWOpenDataCom';

const TabList = (props: any) => {
  const { ListName, ListState,XXJBSJId } = props.ListData;
  const { KHBJJs } = ListState;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const teacher: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      fixed:'left',
      align: 'center'
    },
    {
      title: '评价人',
      dataIndex: 'PJR',
      key: 'PJR',
      fixed:'left',
      align: 'center',
      width: 150,
      ellipsis: true,
    },
    {
      title: '课程评分',
      dataIndex: 'PJFS',
      key: 'PJFS',
      align: 'center',
      width: 180,
      render: (_, record) => <Rate count={5} defaultValue={record?.PJFS} disabled={true} />
    },
    {
      title: '评价时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 160
    },
    {
      title: '评价内容',
      dataIndex: 'PY',
      key: 'PY',
      align: 'center',
      width: 240,
      ellipsis: true
    }
  ];

  const student: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 50,
      fixed:'left',
      align: 'center'
    },
    {
      title: '学生姓名',
      dataIndex: 'XSXM',
      key: 'XSXM',
      align: 'center',
      width: 110,
      fixed:'left',
      render: (text: any, record: any) => {
        const showWXName = record.XSJBSJ?.XM === '未知' && record.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={record.WechatUserId} />;
        }
        return record.XSJBSJ?.XM;
      }
    },
    {
      title: '行政班名称',
      dataIndex: 'XZBJSJ',
      key: 'XZBJSJ',
      align: 'center',
      width: 130,
      ellipsis: true,
      render: (_text: any, record: any) => {
        return `${record?.XSJBSJ?.BJSJ?.NJSJ?.NJMC}${record?.XSJBSJ?.BJSJ?.BJ}`;
      }
    },
    {
      title: '课程班名称',
      dataIndex: 'BJMC',
      key: 'BJMC',
      width: 130,
      ellipsis: true,
      align: 'center',
      render: () => {
        return <span>{ListState.BJMC}</span>;
      }
    },
    {
      title: '评价教师',
      dataIndex: 'JZGJBSJ',
      key: 'JZGJBSJ',
      align: 'center',
      width: 130,
      render: (_, record) => {
        const showWXName = record?.JZGJBSJ?.XM === '未知' && record.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={record.WechatUserId} />;
        }
        return <span>{record?.JZGJBSJ?.XM}</span>;
      }
    },
    {
      title: '评价时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 160
    },
    {
      title: '课程评分',
      dataIndex: 'PJFS',
      key: 'PJFS',
      align: 'center',
      width: 180,
      render: (_, record) => <Rate count={5} defaultValue={record?.PJFS} disabled={true} />
    },
    {
      title: '该学生课堂表现',
      dataIndex: 'PY',
      key: 'PY',
      align: 'center',
      width: 130,
      render: (text: any) => {
        return (
          <a
            onClick={() => {
              setDetailsValue(text);
              setIsModalVisible(true);
            }}
          >
            课堂表现
          </a>
        );
      }
    }
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
          XNXQId: ListState?.XNXQId,
          JSId: KHBJJs[0].JZGJBSJ.id,
          page: 0,
          pageSize: 0
        });
        if (res2.status === 'ok') {
          // 老师给学生的评语
          setStuList(res2.data?.rows);
        }
      })();
    } else {
      (async () => {
        const res = await getKHBJPJ({
          // 班级ID
          KHBJSJId: ListState.id,
          // 学年学期
          XNXQId: ListState?.XNXQId,
          XXJBSJId,
          page: 0,
          pageSize: 0
        });
        if (res?.data?.rows) {
          // 家长给老师的评价
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
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          defaultCurrent: 1,
        }}
        scroll={{ x: ListName === '学生评价' ? 1200 : 1000 }}
        rowKey="id"
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
      />
      <Modal visible={isModalVisible} onCancel={handleCancel} title="表现详情" footer={null}>
        <span>{DetailsValue}</span>
      </Modal>
    </div>
  );
};

export default TabList;
