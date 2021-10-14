import React from 'react';
import { Access, useAccess, useModel, history } from 'umi';
import { Carousel } from 'antd';
import IndexComp from '@/components/IndexComp';
import Register from '@/components/IndexComp/Register';
import { envjudge } from '@/utils';

const Index = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  if (!currentUser?.XZQHM) {
    return <Register />;
  }
  const ej = envjudge();
  if (ej === 'mobile' || ej === 'wx-mobile' || ej === 'com-wx-mobile') {
    history.replace('/mobile/homepage')
    return '';
  }
  return <IndexComp />;
};
Index.title = ENV_title;
Index.access = '管理员';
Index.wrappers = ['@/wrappers/auth'];

export default Index;
