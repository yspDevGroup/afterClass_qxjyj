/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-01 08:49:11
 * @LastEditTime: 2021-09-08 10:07:38
 * @LastEditors: wsl
 */
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Button, Form, message, Select } from 'antd';
import img from '@/assets/Company.png';
import { updateJYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import styles from './index.less';

const { Option } = Select;

const Register = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [form] = Form.useForm();
  const [cities, setCities] = useState<any>();
  const [cityAdcode, setCityAdcode] = useState<string>();
  const [secondCity, setSecondCity] = useState<any>();
  const [county, setCounty] = useState<any>();

  const requestData = () => {
    const ajax = new XMLHttpRequest();
    ajax.open('get', 'http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/100000_province.json');
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4 && ajax.status === 200) {
        const data = JSON.parse(ajax.responseText);
        setCities(data.rows);
      }
    };
  };
  useEffect(() => {
    requestData();
  }, []);

  const handleChange = (type: string, value: any) => {
    if (type === 'cities') {
      const ajax = new XMLHttpRequest();
      ajax.open('get', `http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${value}_city.json`);
      ajax.send();
      ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
          const data = JSON.parse(ajax.responseText);
          setSecondCity(data.rows);
        }
      };
    } else if (type === 'secondCity') {
      const ajax = new XMLHttpRequest();
      ajax.open('get', `http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${value}_district.json`);
      ajax.send();
      ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
          let newArr: any[] = [];
          const data = JSON.parse(ajax.responseText);
          data.rows.forEach((item: any) => {
            if (item.adcode.substring(0, 4) === value.substring(0, 4)) {
              newArr.push(item);
            }
          });
          setCounty(newArr);
        }
      };
    } else if (type === 'county') {
      setCityAdcode(value);
    }
  };

  const submit = async () => {
    console.log(cityAdcode);
    const res = await updateJYJGSJ({ id: currentUser!.jyjId! }, { XZQH: cityAdcode });
    if (res.status === 'ok') {
      message.success('保存成功');
      window.location.reload();
    } else {
      message.success(res.message);
    }
  };
  return (
    <div className={styles.Index}>
      <img src={img} alt="" />
      <p className={styles.hello}>您好，欢迎使用课后服务平台</p>
      <p className={styles.apply}>请先选择所在行政区域</p>
      <Form form={form} onFinish={submit} className={styles.Forms}>
        <Form.Item name="XZQHM" key="XZQHM">
          <Select
            style={{ width: 120, marginRight: 10 }}
            onChange={(value: any) => {
              handleChange('cities', value);
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
            style={{ width: 120, marginRight: 10 }}
            onChange={(value: any) => {
              handleChange('secondCity', value);
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
            style={{ width: 120 }}
            onChange={(value: any) => {
              handleChange('county', value);
            }}
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
        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
