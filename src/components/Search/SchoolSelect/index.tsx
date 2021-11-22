import type { FC } from 'react';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { getAllSchools } from '@/services/after-class-qxjyj/jyjgsj';
import { useModel } from 'umi';

const { Option } = Select;

type SemesterSelectProps = {
  XXJBSJId?: string;
  onChange?: (val: string, auth: any) => void;
};
const SchoolSelect: FC<SemesterSelectProps> = ({ onChange, XXJBSJId }) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [SchoolList, setSchoolList] = useState<any>([]);
  const [XXMC, setXXMC] = useState<string>();
  const getData = async () => {
    const res = await getAllSchools({
      XZQHM: currentUser?.XZQHM,
      page: 0,
      pageSize: 0
    });
    if (res.data?.rows?.length) {
      setSchoolList(res.data.rows);
    }
  };
  useEffect(() => {
    getData()
  }, []);

  return (
    <div>
      <label htmlFor='school'>学校名称：</label>
      <Select
        value={XXMC || ''}
        allowClear
        onChange={(value: string, auth: any) => {
          setXXMC(value);
          onChange?.(value, auth);
        }}
      >
        <Option key="" value="">
          全部
        </Option>
        {SchoolList?.map((item: any) => {
          return (
            <Option key={item.id} value={item.XXMC}>
              {item.XXMC}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};
export default SchoolSelect;
