/*
 * @Author: wuzhan
 * @Date: 2021-10-27 09:00:26
 * @LastEditTime: 2021-11-01 14:24:14
 * @LastEditors: zpl
 * @Description: In User Settings Edit
 * @FilePath: \afterClass_qxjyj\src\components\SemesterSelect\index.tsx
 */
import type { FC } from 'react';
import { message, Select } from 'antd';
import { getAllXNXQ } from '@/services/after-class-qxjyj/xnxq';
import { useEffect, useState } from 'react';
import { getCurrentXQ } from '@/utils';
const { Option } = Select;

type SemesterSelectProps = {
  XXJBSJId: string;
  onChange: any;
};
const SemesterSelect: FC<SemesterSelectProps> = ({ onChange, XXJBSJId }) => {
  const [termList, setTermList] = useState<any>();
  const [term, setTerm] = useState<string>();
  const getXNXQ = async (xxdm: string) => {
    const res = await getAllXNXQ({
      XXJBSJId: xxdm
    });
    if (res?.status === 'ok') {
      const { data = [] } = res;
      const currentXQ = getCurrentXQ(data);
      const term = [].map.call(data, (item: any) => {
        return {
          value: item.id,
          text: `${item.XN} ${item.XQ}`
        };
      });
      setTermList(term);
      setTerm(currentXQ?.id || data[0].id);
      onChange(currentXQ?.id || data[0].id);
      //   getCourseList(KHKCSJId, currentXQ?.id || data[0].id);
    } else {
      message.error(res.message);
    }
  };
  useEffect(() => {
    getXNXQ(XXJBSJId);
  }, []);

  return (
    <Select
      value={term}
      onChange={(value: string) => {
        setTerm(value);
        onChange(value);
      }}
    >
      {termList?.map((item: any) => {
        return (
          <Option key={item.value} value={item.value}>
            {item.text}
          </Option>
        );
      })}
    </Select>
  );
};
export default SemesterSelect;
