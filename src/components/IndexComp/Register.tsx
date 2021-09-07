/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-01 08:49:11
 * @LastEditTime: 2021-09-07 18:36:04
 * @LastEditors: wsl
 */
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Button, Form, Select } from 'antd';
import img from '@/assets/Company.png';
import $ from 'jquery';

const { Option } = Select;

import styles from './index.less';
const Register = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [form] = Form.useForm();
  const [cities, setCities] = useState<any>();
  const [cityAdcode, setCityAdcode] = useState<string>();
  const [secondCity, setSecondCity] = useState<any>();
  const [county, setCounty] = useState<any>();
  const [cityName, setCityName] = useState<string>();
  const [provinceName, setProvinceName] = useState<string>();
  const [countyName, setCountyName] = useState<string>();
  const [Datas, setDatas] = useState<any>();

  // const requestData = () => {
  //   $.ajax({
  //     url: 'http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/100000_province.json',
  //     data: {},
  //     success: function (data) {
  //       setCities(data.rows);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   requestData();
  //   if (typeof XZQHM !== 'undefined') {
  //     $.ajax({
  //       url: `http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${XZQHM?.substring(0, 2)}0000_city.json`,
  //       data: {},
  //       success: function (data) {
  //         setSecondCity(data.rows);
  //       }
  //     });
  //     $.ajax({
  //       url: `http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${XZQHM?.substring(0, 4)}00_district.json`,
  //       data: {},
  //       success: function (data) {
  //         let newArr: any[] = [];
  //         data.rows.forEach((item: any) => {
  //           if (item.adcode.substring(0, 4) === XZQHM?.substring(0, 4)) {
  //             newArr.push(item);
  //           }
  //         });
  //         setCounty(newArr);
  //       }
  //     });
  //   }
  // }, [XZQHM]);

  // const handleChange = (type: string, value: any) => {
  //   if (type === 'cities') {
  //     $.ajax({
  //       url: `http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${value.value}_city.json`,
  //       data: {},
  //       success: function (data) {
  //         setSecondCity(data.rows);
  //         setCityName(value.label);
  //       }
  //     });
  //   } else if (type === 'secondCity') {
  //     $.ajax({
  //       url: `http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${value.value}_district.json`,
  //       data: {},
  //       success: function (data) {
  //         let newArr: any[] = [];
  //         data.rows.forEach((item: any) => {
  //           if (item.adcode.substring(0, 4) === value.value.substring(0, 4)) {
  //             newArr.push(item);
  //           }
  //         });
  //         setCounty(newArr);
  //         setProvinceName(value.label);
  //       }
  //     });
  //   } else if (type === 'county') {
  //     setCityAdcode(value.value);
  //     setCountyName(value.label);
  //   }
  // };
  // const submit = async (params: any) => {
  //   const { id, ...info } = params;
  // };
  return (
    <div className={styles.Index}>
      <img src={img} alt="" />
      <p className={styles.hello}>您好，欢迎使用课后服务平台</p>
      <p className={styles.apply}>请先选择所在行政区域</p>
      {/* <Form form={form} onFinish={submit} className={styles.Forms}>
        <Form.Item
          name="XZQHM"
          key="XZQHM"
          label="行政区域："
          rules={[
            {
              required: true,
              message: '请选择行政区域'
            }
          ]}
        >
          <Select
            style={{ width: 100, marginRight: 10 }}
            onChange={(value: any) => {
              handleChange('cities', value);
            }}
            labelInValue
            defaultValue={{
              value: `${XZQHM!.substring(0, 2)}0000`,
              label: Datas?.XZQ.split('/')[0],
              key: `${XZQHM!.substring(0, 2)}0000`
            }}
          >
            {cities?.map((item: any) => {
              return (
                <Option value={item.adcode} key={item.name}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          <Select
            style={{ width: 100, marginRight: 10 }}
            onChange={(value: any) => {
              handleChange('secondCity', value);
            }}
            labelInValue
            defaultValue={{
              value: `${XZQHM!.substring(0, 4)}00`,
              label: Datas?.XZQ.split('/')[1],
              key: `${XZQHM!.substring(0, 4)}00`
            }}
          >
            {secondCity?.map((item: any) => {
              return (
                <Option value={item.adcode} key={item.name}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          <Select
            style={{ width: 100 }}
            onChange={(value: any) => {
              handleChange('county', value);
            }}
            labelInValue
            defaultValue={{ value: XZQHM!, label: Datas?.XZQ.split('/')[2], key: XZQHM! }}
          >
            {county?.map((item: any) => {
              return (
                <Option value={item.adcode} key={item.adcode}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form> */}
    </div>
  );
};
export default Register;
