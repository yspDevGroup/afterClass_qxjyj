/*
 * @description: 权限控制
 * @author: zpl
 * @Date: 2021-08-09 10:45:22
 * @LastEditTime: 2021-12-22 08:56:57
 * @LastEditors: zpl
 */
export default function access(initialState: InitialState): any {
  // 此处取值不会触发属性刷新
  const { currentUser } = initialState || {};

  return {
    isLogin: !!currentUser,
    auth: currentUser?.type || '其他'
  };
}
