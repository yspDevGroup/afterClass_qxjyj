import React from 'react';
import { Access, useAccess, useModel } from 'umi';
import { Carousel } from 'antd';
import IndexComp from '@/components/IndexComp';
import Register from '@/components/IndexComp/Register';

const Index = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  console.log(typeof currentUser?.XZQHM);
  return <>{currentUser?.XZQHM ? <IndexComp /> : <Register />}</>;
};
Index.title = ENV_title;
Index.access = '管理员';
Index.wrappers = ['@/wrappers/auth'];

export default Index;
