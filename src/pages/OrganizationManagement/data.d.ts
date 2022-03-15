/*
 * @description:
 * @author: wsl
 * @Date: 2021-08-26 11:05:49
 * @LastEditTime: 2021-08-27 14:51:23
 * @LastEditors: wsl
 */
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
  SPRId?: string;
  SPR?: string;
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
