import React from 'react';
import { Access, useAccess } from 'umi';
import { Carousel } from 'antd';
import IndexComp from '@/components/IndexComp';
import Register from '@/components/IndexComp/Register';

const Index = () => {
  return <IndexComp />;
};
Index.title = ENV_title;
Index.access = '管理员';
Index.wrappers = ['@/wrappers/auth'];

export default Index;
