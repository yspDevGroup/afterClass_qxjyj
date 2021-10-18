import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Select, Button, Tooltip } from 'antd';
import { getKHXKJL } from '@/services/after-class-qxjyj/khxkjl';
import { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import WWOpenDataCom from '@/components/WWOpenDataCom';

const Detail = (props: any) => {
  console.log(props.location.state);

  const { id, XXMC } = props.location.state;
  const columns: ProColumns<API.KHXSDD>[] | undefined = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 60,
      align: 'center'
    },
    {
      title: '巡课日期',
      dataIndex: 'RQ',
      key: 'RQ',
      align: 'center',
      width: 120
    },
    {
      title: '巡课教师',
      dataIndex: 'XKJS',
      key: 'XKJS',
      align: 'center',
      render: (text: any, record: any) => {
        const showWXName = text?.XM === '未知' && text.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={text.WechatUserId} />;
        }
        return text?.XM;
      },
      width: 120
    },
    {
      title: '授课教师',
      dataIndex: 'SKJS',
      key: 'SKJS',
      align: 'center',
      render: (text: any, record: any) => {
        const showWXName = text?.XM === '未知' && text.WechatUserId;
        if (showWXName) {
          return <WWOpenDataCom type="userName" openid={text.WechatUserId} />;
        }
        return text?.XM;
      },
      width: 120
    },
    {
      title: '是否准时上课',
      dataIndex: 'SFZSSK',
      key: 'SFZSSK',
      align: 'center',
      render: (text) => <span style={{ color: text ? 'black' : 'red' }}>{text ? '是' : '否'}</span>,
      width: 120
    },
    {
      title: '是否为原定教师',
      dataIndex: 'SFYDJS',
      key: ' SFYDJS',
      align: 'center',
      render: (text) => <span style={{ color: text ? 'black' : 'red' }}>{text ? '是' : '否'}</span>,
      width: 150
    },
    {
      title: '课堂点名',
      dataIndex: 'SFDM',
      key: ' SFDM',
      align: 'center',
      render: (text) => <span style={{ color: text ? 'black' : 'red' }}>{text ? '是' : '否'}</span>,
      width: 120
    },
    {
      title: '实到人数是否准确',
      dataIndex: 'RSSFZQ',
      key: ' RSSFZQ',
      align: 'center',
      render: (text) => <span style={{ color: text ? 'black' : 'red' }}>{text ? '是' : '否'}</span>,
      width: 150
    },
    {
      title: '应到人数',
      dataIndex: 'YDRS',
      key: 'YDRS',
      align: 'center',
      width: 120
    },
    {
      title: '实到人数',
      dataIndex: 'SDRS',
      key: 'SDRS',
      align: 'center',
      width: 120
    },
    {
      title: '巡课确认人数',
      dataIndex: 'QRRS',
      key: 'QRRS',
      align: 'center',
      width: 120
    },
    {
      title: '备注信息',
      dataIndex: 'BZXX',
      key: 'BZXX',
      align: 'center',
      width: 220,
      render: (text) => {
        return (
          <Tooltip title={text}>
            <div
              style={{
                textOverflow: 'ellipsis',
                width: '100px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textAlign: 'center',
                margin: '0 auto'
              }}
            >
              {text}
            </div>
          </Tooltip>
        );
      }
    }
  ];
  const [dataSource, setDataSource] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const res = await getKHXKJL({ XXJBSJId: id });
      setDataSource(res.data?.rows);
    })();
  }, []);
  return (
    <>
      <div style={{ fontSize: '24px', fontWeight: 'bold', padding: '20px 0' }}>{XXMC}</div>
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
      <ProTable
        columns={columns}
        dataSource={dataSource}
        search={false}
        options={{
          setting: false,
          fullScreen: false,
          density: false,
          reload: false
        }}
      />
    </>
  );
};
Detail.wrappers = ['@/wrappers/auth'];
export default Detail;
