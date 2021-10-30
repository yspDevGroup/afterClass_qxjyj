/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-26 16:24:39
 * @LastEditTime: 2021-10-30 19:11:01
 * @LastEditors: Please set LastEditors
 */
import React, { useEffect, useState } from 'react';
import CustomForm from '@/components/CustomForm';
import { basicForm } from './FormItems';
import defaultImg from '@/assets/vector.png';
import { history } from 'umi';
import styles from './index.less';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { getXXJBSJ } from '@/services/after-class-qxjyj/xxjbsj';

const formItemLayout = {
  labelCol: { flex: '7em' },
  wrapperCol: { flex: 'auto' }
};

const SchoolInfo = (props: any) => {
  const { state } = props.location;
  const [data, setData] = useState<any>({});

  const getData = async () => {
    const res = await getXXJBSJ({ id: state?.XXJBSJ?.id });
    if (res?.status === 'ok') {
      console.log('res', res);

      setData(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      <div className={styles.schoolWrapper}>
        <div className={styles.schoolInfoBody}>
          {/* 学校基本信息标题 */}
          <div className={styles.schoolInfoTitle}>
            <div className={styles.schoolInfoLogo}>
              <img src={data?.XH || defaultImg} alt="logo" />
            </div>
            <div className={styles.schoolInfoTitleHeader}>
              <p>{data.XXMC}</p>
            </div>
          </div>
          <div className={styles.schoolInfoBasic}>
            <CustomForm
              values={data}
              formItems={basicForm}
              formLayout={formItemLayout}
              hideBtn={true}
              formDisabled={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

SchoolInfo.wrappers = ['@/wrappers/auth'];
export default SchoolInfo;
