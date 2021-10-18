/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-08-26 16:24:39
 * @LastEditTime: 2021-09-10 11:30:40
 * @LastEditors: wsl
 */
import React from 'react';
import CustomForm from '@/components/CustomForm';
import { basicForm } from './FormItems';
import defaultImg from '@/assets/vector.png';
import { history } from 'umi';
import styles from './index.less';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: { flex: '7em' },
  wrapperCol: { flex: 'auto' }
};
const SchoolInfo = (props: any) => {
  const { state } = props.location;
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          history.goBack();
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
              <img src={state?.XXJBSJ.XH || defaultImg} alt="logo" />
            </div>
            <div className={styles.schoolInfoTitleHeader}>
              <p>{state?.XXJBSJ.XXMC}</p>
            </div>
          </div>
          <div className={styles.schoolInfoBasic}>
            <CustomForm
              values={state.XXJBSJ}
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
