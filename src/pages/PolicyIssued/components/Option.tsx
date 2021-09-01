/** !
 * @description: 表格操作列
 * @author: zpl
 * @Date: 2020-09-12 17:13:00
 * @LastEditTime: 2020-09-12 17:31:45
 * @LastEditors: zpl
 */
import React from 'react';
import { Divider, Popconfirm, message, Tooltip } from 'antd';
import { history } from 'umi';
import styles from '../index.module.less';
import { TableListItem } from '../data';

import moment from 'moment';
// import editorImg from '@/assets/editor.png';
// import ashbinImg from '@/assets/ashbin.png';
// import huifu from '@/assets/huifu.png';
// import chegao from '@/assets/chegao.png';
// import fabu from '@/assets/fabu.png';
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { deleteJYJGTZGG, updateJYJGTZGG } from '@/services/after-class-qxjyj/jyjgtzgg';
import { ClearOutlined } from '@ant-design/icons';

type OptType = {
  id: string;
  refreshHandler: () => void;
  record?: TableListItem;
};

const EditOpt = ({ id }: { id: string }) => (
  <a
    onClick={() => {
      history.push(`/policyIssued/editArticle?id=${id}`);
    }}
  >
    <Tooltip title="编辑">
      <a>
        <div className={styles.editImg} />
      </a>
    </Tooltip>
  </a>
);

const PubOpt = ({ id, refreshHandler, record }: OptType) => (
  <a
    onClick={async () => {
      const data = {
        ...record,
        ZT: '已发布',
        RQ: moment(record?.RQ).format()
      };
      try {
        const resupdateJYJGTZGG = await updateJYJGTZGG({ id: record!.id }, data);
        if (resupdateJYJGTZGG.status === 'ok') {
          message.success('发布成功');
          refreshHandler();
        } else {
          message.error('发布失败，请联系管理员或稍后重试。');
        }
      } catch (err) {
        message.error('发布失败，请联系管理员或稍后重试。');
      }
    }}
  >
    <Tooltip title="发布">
      <a>
        <div className={styles.submitImg} />
      </a>
    </Tooltip>
  </a>
);

const UnPubOpt = ({ id, refreshHandler, record }: OptType) => (
  <a
    onClick={async () => {
      const data = {
        ...record,
        ZT: '草稿',
        RQ: moment(record!.RQ).format()
      };
      try {
        const resupdateJYJGTZGG = await updateJYJGTZGG({ id: record!.id }, data);
        if (resupdateJYJGTZGG.status === 'ok') {
          message.success('撤稿成功');
          refreshHandler();
        } else {
          message.error('撤稿失败，请联系管理员或稍后重试。');
        }
      } catch (err) {
        message.error('撤稿失败，请联系管理员或稍后重试。');
      }
    }}
  >
    <Tooltip title="撤稿">
      <a>
        <ClearOutlined className={styles.chegao} />
      </a>
    </Tooltip>
  </a>
);

const UnDelOpt = ({ id, refreshHandler, record }: OptType) => (
  <a
    href="#"
    onClick={async () => {
      const data = {
        ...record,
        ZT: '草稿',
        RQ: moment(record!.RQ).format()
      };
      try {
        const resupdateJYJGTZGG = await updateJYJGTZGG({ id: record!.id }, data);
        if (resupdateJYJGTZGG.status === 'ok') {
          message.success('恢复成功');
          refreshHandler();
        } else {
          message.error('恢复失败，请联系管理员或稍后重试。');
        }
      } catch (err) {
        message.error('恢复失败，请联系管理员或稍后重试。');
      }
    }}
  >
    <Tooltip title="恢复">
      <a>
        <div className={styles.recoveryImg} />
      </a>
    </Tooltip>
  </a>
);

const DelOpt = ({ id, refreshHandler, record }: OptType) => (
  <Popconfirm
    title="确定要删除吗?"
    onConfirm={async () => {
      const data = {
        ...record,
        ZT: '已删除',
        RQ: moment(record!.RQ).format()
      };
      try {
        const resupdateJYJGTZGG = await updateJYJGTZGG({ id: id }, data);
        if (resupdateJYJGTZGG.status === 'ok') {
          message.success('删除成功');
          refreshHandler();
        } else {
          message.error('删除失败，请联系管理员或稍后重试。');
        }
      } catch (err) {
        message.error('删除失败，请联系管理员或稍后重试。');
      }
    }}
    okText="Yes"
    cancelText="No"
    placement="topLeft"
  >
    <Tooltip title="删除">
      <a>
        <div className={styles.delectImg} />
      </a>
    </Tooltip>
  </Popconfirm>
);

const RealDelOpt = ({ id, refreshHandler }: OptType) => (
  <Popconfirm
    title="彻底删除后数据将不可恢复，是否删除?"
    onConfirm={async () => {
      try {
        const result = await deleteJYJGTZGG({ id: id });
        if (result.status === 'ok') {
          message.success('删除成功');
          refreshHandler();
        } else {
          message.error('删除失败，请联系管理员或稍后重试。');
        }
      } catch (err) {
        message.error('删除失败，请联系管理员或稍后重试。');
      }
    }}
    okText="Yes"
    cancelText="No"
    placement="topLeft"
  >
    <a href="#" style={{ color: 'red' }}>
      <Tooltip title="彻底删除">
        <a>
          <div className={styles.delectImg} />
        </a>
      </Tooltip>
    </a>
  </Popconfirm>
);

type Props = {
  id: string;
  ZT: string;
  refreshHandler: () => void;
  record?: TableListItem;
};

const Option: React.FC<Props> = (props) => {
  const { id, ZT, refreshHandler, record } = props;
  switch (ZT) {
    case '已发布':
      return <UnPubOpt id={id} refreshHandler={refreshHandler} record={record} />;
    case '已删除':
      return (
        <>
          <UnDelOpt id={id} refreshHandler={refreshHandler} record={record} />
          <Divider type="vertical" />
          <RealDelOpt id={id} refreshHandler={refreshHandler} record={record} />
        </>
      );
    default:
      return (
        <>
          <EditOpt id={id} />
          <Divider type="vertical" />
          <PubOpt id={id} refreshHandler={refreshHandler} record={record} />
          <Divider type="vertical" />
          <DelOpt id={id} refreshHandler={refreshHandler} record={record} />
        </>
      );
  }
};

export default Option;
