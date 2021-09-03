/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-30 16:54:37
 * @LastEditTime: 2021-09-03 18:21:05
 * @LastEditors: wsl
 */
export type KHHZXYSJ = {
  XXMC?: string;
  SSQY?: string;
  XD?: string;
  LXR?: string;
  LXDH?: string;
  KHKCSQs?: [];
  KHKCSJs?: [];
};

export type TableListItem = {
  id?: string;
  JGMC?: string;
  FRXM?: string;
  LXRXM?: string;
  LXDH?: number;
  KCSL?: string;
  ZRXX?: string;
  value?: any;
  BZ?: string;
};

/**
 * 查询参数
 *
 * @export
 * @interface TableListParams
 */
export type TableListParams = {
  pageSize?: number;
  current?: number;
  search?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Record<string, any>;
