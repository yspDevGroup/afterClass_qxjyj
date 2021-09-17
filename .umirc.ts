import { defineConfig } from 'umi';
import theme from './theme';

export default defineConfig({
  mock: false,
  // mfsu: {},
  nodeModulesTransform: {
    type: 'none'
  },
  fastRefresh: {},
  define: {
    ENV_title: '课后服务平台',
    ENV_subTitle: '课后服务平台',
    ENV_copyRight: '2021 版权所有：陕西五育汇智信息技术有限公司',
    ENV_host: 'http://afterclassQxjyj.prod.xianyunshipei.com',
    ENV_backUrl: 'http://api.prod.xianyunshipei.com',
    ssoHost: 'http://platform.prod.xianyunshipei.com',
    authType: 'wechat',
    clientId: 'wwccc22183061ae39b',
    clientSecret: 'fyIAGkGZzBdoYun_Oka0NsGZqTmcovFTMMorCFrjRyg'
  },
  links: [{ rel: 'icon', href: './title.png' }],
  dynamicImport: {
    loading: '@/components/Loading'
  },
  theme,
  proxy: {
    '/api': {
      target: 'http://api.prod.xianyunshipei.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // schemaPath: 'http://192.168.0.113:3000/documentation/json',
      schemaPath: 'http://api.test.xianyunshipei.com/documentation/json',
      mock: false
    }
  ]
});
