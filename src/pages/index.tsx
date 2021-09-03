import React from 'react';
import { Access, useAccess } from 'umi';
import { Carousel } from 'antd';
import IndexComp from '@/components/IndexComp';


const Index = () => {
  return <IndexComp />;
};
Index.title = '主页';
Index.access = '管理员';
Index.wrappers = ['@/wrappers/auth'];

export default Index;
