import { defineConfig } from 'umi';
import theme from './theme';

export default defineConfig({
  define: {
    ENV_title: '课后服务平台',
    ENV_subTitle: '课后服务平台',
    ENV_copyRight: '2021 版权所有：陕西五育汇智信息技术有限公司',
    ENV_host: 'http://afterclassQxjyj.test.xianyunshipei.com',
    ENV_backUrl: 'http://api.test.xianyunshipei.com',
    ssoHost: 'http://sso.test.xianyunshipei.com',
    authType: 'wechat',
    clientId: 'ww2b4b964ba635948b',
    clientSecret: 'BwDHyfEiuBjdz18aR6Int96FxGZQ2d_UeJcVSBnkGvU'
  },
  proxy: {
    '/api': {
      target: 'http://api.test.xianyunshipei.com',
      // target: 'http://192.168.0.113:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },
});
