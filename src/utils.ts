/*
 * @description: 工具类
 * @author: zpl
 * @Date: 2021-08-09 10:36:53
 * @LastEditTime: 2021-12-02 15:46:53
 * @LastEditors: Sissle Lynn
 */
import { history } from 'umi';
import { parse } from 'querystring';
import { getEnv } from '@/services/after-class-qxjyj/other';
import { getKHPKSJByBJID } from './services/after-class-qxjyj/khpksj';
import { getKHBJSJ } from './services/after-class-qxjyj/khbjsj';
import { message } from 'antd';
import moment from 'moment';
import { getAllKHXSCQ } from './services/after-class-qxjyj/khxscq';
import { DateRange, Week } from './utils/Timefunction';

/**
 * 实时获取部署环境信息
 *
 * @return {*}  {Promise<BuildOptions>}
 */
export const getBuildOptions = async (): Promise<BuildOptions> => {
  const { data = {} } = ENV_debug ? {} : await getEnv();
  const { yspAppEnv = 'local', nodeEnv } = data;
  console.log('nodeEnv: ', nodeEnv);

  switch (yspAppEnv) {
    case 'production':
      // 生产环境
      return {
        ENV_type: 'prod',
        ENV_copyRight: '2021 版权所有：陕西五育汇智信息技术有限公司',
        ENV_host: 'http://afterclassQxjyj.prod.xianyunshipei.com',
        ssoHost: 'http://sso.prod.xianyunshipei.com',
        authType: 'wechat',
        clientId: 'wwccc22183061ae39b',
        clientSecret: 'fyIAGkGZzBdoYun_Oka0NsGZqTmcovFTMMorCFrjRyg'
      };
    case 'chanming':
      // 禅鸣环境
      return {
        ENV_type: 'chanming',
        ENV_copyRight: '2021 版权所有：蝉鸣科技（西安）有限公司',
        ENV_host: 'http://afterclassQxjyj.wuyu.imzhiliao.com',
        ssoHost: 'http://sso.wuyu.imzhiliao.com',
        authType: 'wechat',
        clientId: 'ww0a941c570b201be6',
        clientSecret: 'hK91Yg2RnDw4phTw1F_byWM9KoUM3Y-kufDDZOj0eTE'
      };
    case '9dy':
      // 9朵云环境
      return {
        ENV_type: '9dy',
        ENV_copyRight: '2021 版权所有：广东九朵云科技有限公司',
        ENV_host: 'http://afterclassQxjyj.9cloudstech.com',
        ssoHost: 'http://sso.9cloudstech.com',
        authType: 'wechat',
        clientId: 'ww3a7d7b9efc33f6f3',
        clientSecret: 'pCnf96P_GmAbe03S6jSqXp23moVXCak8CmOXTY2e0Os'
      };
    case 'development':
      // 开发测试环境
      return {
        ENV_type: 'dev',
        ENV_copyRight: '2021 版权所有：陕西五育汇智信息技术有限公司',
        ENV_host: 'http://afterclassQxjyj.test.xianyunshipei.com',
        ssoHost: 'http://sso.test.xianyunshipei.com',
        authType: 'wechat',
        clientId: 'ww2b4b964ba635948b',
        clientSecret: 'BwDHyfEiuBjdz18aR6Int96FxGZQ2d_UeJcVSBnkGvU'
      };
    default:
      // 默认为local，本地开发模式下请在此处修改配置，但不要提交此处修改
      return {
        ENV_type: 'dev',
        ENV_copyRight: '2021 版权所有：陕西五育汇智信息技术有限公司',
        ENV_host: 'http://localhost:8080',
        ssoHost: 'http://platform.test.xianyunshipei.com',
        authType: 'password',
        clientId: 'ww2b4b964ba635948b',
        clientSecret: 'nkTIja0mKy1suw-wo7Lt'
      };
  }
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * 根据路径search拼接参数获取参数对应的值
 *
 * @export
 * @returns
 */
export const getQueryString = (name: string) => {
  const regs = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = decodeURI(window.location.search.substr(1)).match(regs);
  if (r !== null) return unescape(r[2]);
  return null;
};

/**
 * 判断运行环境
 *
 * @return {*}
 */
export const envjudge = (): PlatType => {
  const isMobile = window.navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  ); // 是否手机端
  const isWx = /micromessenger/i.test(navigator.userAgent); // 是否微信
  const isComWx = /wxwork/i.test(navigator.userAgent); // 是否企业微信
  if (isMobile) {
    if (isComWx) {
      return 'com-wx-mobile'; // 手机端企业微信
    }
    if (isWx) {
      return 'wx-mobile'; // 手机端微信
    }
    return 'mobile'; // 手机
  }
  if (isComWx) {
    return 'com-wx-pc'; // PC端企业微信
  }
  if (isWx) {
    return 'wx-pc'; // PC端微信
  }
  return 'pc'; // PC
};

/**
 * 根据运行环境获取登录地址
 *
 * @param {BuildOptions} [buildOptions] 环境配置信息
 * @param {boolean} [reLogin] 是否强制重登录
 * @return {*}  {string}
 */
export const getLoginPath = (buildOptions?: BuildOptions, reLogin?: boolean): string => {
  const { authType = 'none', ssoHost, ENV_host, clientId, clientSecret } = buildOptions || {};
  let loginPath: string;
  switch (authType) {
    case 'wechat':
      // 前提是本应该已经注册为微信认证，且正确配置认证回调地址为 ${ENV_host}/AuthCallback/wechat
      loginPath = `${ssoHost}/wechat/authorizeUrl?suiteID=${clientId}&client_secret=${clientSecret}`;
      break;
    case 'authorization_code':
      // TODO 待处理
      loginPath = `${ssoHost}/oauth2/code?client_id=${clientId}&response_type=${authType}&redirect_uri=${''}state=${''}scope=${''}`;
      break;
    case 'password':
    default:
      {
        // 为方便本地调试登录，认证回调地址通过参数传递给后台
        const callback = encodeURIComponent(`${ENV_host}/AuthCallback/password`);
        loginPath = `${ssoHost}/oauth2/password?response_type=${authType}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${callback}&reLogin=${
          reLogin || 'false'
        }`;
      }
      break;
  }
  return loginPath;
};

/**
 * 跳转到指定URL连接
 *
 * @param {string} url 跳转链接
 * @param {boolean} onTop 是否在top上跳转
 */
export const gotoLink = (url: string, onTop?: boolean) => {
  if (url.startsWith('http')) {
    // 外部连接
    const win = onTop ? window.top || window : window;
    win.location.href = url;
  } else {
    // 本系统内跳转
    history.push(url);
  }
};

/**
 * base64编码
 *
 * @param {string} str
 * @return {*}
 */
export const base64Encode = (str: string): string => {
  const buff = Buffer.from(str, 'utf-8');
  const base64 = buff.toString('base64');
  return base64;
};

/**
 * base64解码
 *
 * @param {string} str
 * @return {*}
 */
export const base64Decode = (str: string): string => {
  const buff = new Buffer(str, 'base64');
  const s = buff.toString();
  return s;
};

/**
 * 从缓存中取出oAuth token
 *
 * @return {*}
 */
export const getOauthToken = () => {
  return {
    ysp_access_token: localStorage.getItem('ysp_access_token'),
    ysp_expires_in: localStorage.getItem('ysp_expires_in'),
    ysp_refresh_token: localStorage.getItem('ysp_refresh_token'),
    ysp_token_type: localStorage.getItem('ysp_token_type')
  };
};

/**
 * 客户端保存oAuth token
 *
 * @param {TokenInfo} token
 */
export const saveOAuthToken = (token: TokenInfo) => {
  localStorage.setItem('ysp_access_token', token.access_token);
  localStorage.setItem('ysp_expires_in', `${token.expires_in || 0}`);
  localStorage.setItem('ysp_refresh_token', token.refresh_token || '');
  localStorage.setItem('ysp_token_type', token.token_type || 'Bearer');
};

/**
 * 客户端清除oAuth token
 *
 */
export const removeOAuthToken = () => {
  localStorage.removeItem('ysp_access_token');
  localStorage.removeItem('ysp_expires_in');
  localStorage.removeItem('ysp_refresh_token');
  localStorage.removeItem('ysp_token_type');
};

/**
 * 组装请求头部token信息
 *
 * @return {*}  {string}
 */
export const getAuthorization = (): string => {
  const tokenType = localStorage.getItem('ysp_token_type') || 'Bearer';
  const accessToken = localStorage.getItem('ysp_access_token');
  if (tokenType && accessToken) {
    return `${tokenType} ${accessToken}`;
  }
  return '';
};

/**
 * 封装获取 cookie 的方法
 *
 * @param {string} name
 * @return {*}
 */
export const getCookie = (name: string): string => {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  const arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  }
  return '';
};

// 获取当前页面大小的方法
export const getWidHei = () => {
  let width;
  let height;
  if (window.innerWidth) {
    width = window.innerWidth;
    height = window.innerHeight;
  } else if (document.compatMode === 'BackCompat') {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
  } else {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
  }
  return {
    width,
    height
  };
};

/**
 * 根据当前时间获取学年学期
 *
 * @param {API.XNXQ[]} list
 * @return {*}  {(API.XNXQ | null)}
 */
export const getCurrentXQ = (list: API.XNXQ[]): API.XNXQ | null => {
  if (!list.length) {
    return null;
  }
  const today = new Date();
  const currentXQ = list.find((xq: any) => {
    const begin = new Date(xq.KSRQ);
    const end = new Date(xq.JSRQ);
    if (begin <= today && today <= end) {
      return true;
    }
    return false;
  });
  if (currentXQ) {
    return currentXQ;
  }
  // 未找到匹配学期时返回前一个
  // 先按降序排序
  const tempList = list.sort((a, b) => new Date(b.KSRQ).getTime() - new Date(a.KSRQ).getTime());
  const previousXQ = tempList.find((xq) => new Date() >= new Date(xq.JSRQ));
  if (previousXQ) {
    return previousXQ;
  }
  return tempList[tempList.length - 1];
};

/**
 * 根据当前时间获取移动端时段
 *
 * @param {string} BMKSRQ 报名开始时间
 * @param {string} BMJSRQ 报名结束时间
 * @param {string} KKKSRQ 开课开始时间
 * @param {string} KKJSRQ 开课结束时间
 * @return {*}
 */
export const getCurrentStatus = (BMKSRQ: string, BMJSRQ: string, KKKSRQ: string, KKJSRQ: string) => {
  let currentStatus: 'unstart' | 'enroll' | 'enrolling' | 'enrolled' | 'education' | 'end' | 'noTips' | 'empty' =
    'empty';
  const today = new Date();
  const BMbegin = new Date(BMKSRQ);
  const BMend = new Date(BMJSRQ);
  const KKbegin = new Date(KKKSRQ);
  const KKend = new Date(KKJSRQ);

  if (today < BMbegin) {
    currentStatus = 'unstart';
  } else if (BMbegin <= today && today <= BMend) {
    currentStatus = 'enroll';
    if (KKbegin <= today && today <= BMend) {
      // const nowSta = (today.getTime() - KKbegin.getTime()) / 7 / 24 / 60 / 60 / 1000;
      // if (nowSta > 2) {
      //   currentStatus = 'noTips';
      // } else {
      currentStatus = 'enrolling';
      // }
    }
  } else if (BMbegin <= today && today <= KKbegin) {
    currentStatus = 'enrolled';
  } else if (KKbegin <= today && today <= KKend) {
    const nowSta = (today.getTime() - KKbegin.getTime()) / 7 / 24 / 60 / 60 / 1000;
    if (nowSta > 2) {
      currentStatus = 'noTips';
    } else {
      currentStatus = 'education';
    }
  } else if (today > KKend) {
    currentStatus = 'end';
  }
  return currentStatus;
};

/**
 * 根据返回错误信息优化页面错误提示
 *
 * @param msg: string
 */
export const enHenceMsg = (msg?: string) => {
  if (msg && msg.indexOf('Cannot') > -1) {
    message.error(`操作失败，该项存在关联数据,请清除关联数据后再试`);
  } else if ((msg && msg.indexOf('token') > -1) || (msg && msg.indexOf('Token') > -1)) {
    history.replace('/403?title=认证信息已失效，请重新登录');
  } else if (msg && msg.indexOf('Validation') > -1) {
    message.error('操作失败，该项未通过校验，请检查数据是否重复后再试');
  } else {
    message.error(`${msg},请联系管理员或稍后再试`);
  }
};

/**
 * 获取班级出勤信息
 * @param wkd 课程周几上课
 * @param start 开课时间
 * @param end 结课时间
 * @param bjid 班级ID
 * @param xsId 学生ID
 * @returns {}
 */
export const getCqDay = async (wkd?: any[], start?: string, end?: string, bjid?: string, xsId?: string) => {
  const myDate = new Date();
  const nowDate = new Date(moment(myDate).format('YYYY/MM/DD'));
  const res = await getAllKHXSCQ({
    xsId: xsId || '',
    bjId: bjid || '',
    CQZT: '',
    CQRQ: ''
  });
  if (res.status === 'ok') {
    if (start && end && wkd) {
      const arr = DateRange(start, end);
      const classbegins: any[] = [];
      arr.forEach((record: any) => {
        for (let i = 0; i < wkd.length; i += 1) {
          if (Week(record) === wkd[i] && !classbegins.includes(record)) {
            const current = new Date(moment(record).format('YYYY/MM/DD'));
            let status = current < nowDate ? '出勤' : '待上';
            if (res.data && res.data.length) {
              res.data.forEach((date: any) => {
                if (date.CQRQ === record) {
                  status = date.CQZT;
                }
              });
            }
            classbegins.push({
              status,
              date: moment(record).format('MM/DD')
            });
          }
        }
      });
      return classbegins;
    }
  }
  return [];
};
/**
 * 组装班级出勤信息
 * @param bjid 班级ID
 * @param xsId 学生ID
 * @returns {}
 */
export const getData = async (bjid: string, xsId?: string) => {
  const res1 = await getKHPKSJByBJID({ id: bjid });
  if (res1.status === 'ok' && res1.data) {
    const attend = [...new Set(res1.data.map((n: { WEEKDAY?: any }) => n.WEEKDAY))];
    const res = await getKHBJSJ({ id: bjid });
    if (res.status === 'ok' && res.data && attend) {
      const start = res.data.KKRQ ? res.data.KKRQ : res.data.KHKCSJ!.KKRQ;
      const end = res.data.JKRQ ? res.data.JKRQ : res.data.KHKCSJ!.JKRQ;
      return {
        title: res.data.BJMC,
        start,
        end,
        kss: res.data.KSS,
        XQName: res.data.XQName,
        kcmc: res.data.KHKCSJ!.KCMC,
        data: await getCqDay(attend, start, end, bjid, xsId)
      };
    }
  }
  return {
    status: 'nothing'
  };
};

export const getTableWidth = (columns: any[]) => {
  if (columns.length > 0) {
    let sum: number = 0;
    columns.forEach(({ width }) => {
      if (Number.isFinite(width)) {
        sum += width;
      } else {
        // 如果width 不是number类型默认家100
        sum += 100;
      }
    });
    // console.log('列表宽度',sum);
    return sum;
  }
  return 1300;
};
