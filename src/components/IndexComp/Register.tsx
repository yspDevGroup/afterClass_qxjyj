/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-01 08:49:11
 * @LastEditTime: 2021-09-08 20:47:52
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
  const [provinceVal, setProvinceVal] = useState<any>();
  const [cityVal, setCityVal] = useState<any>();
  const [countyVal, setCountyVal] = useState<any>();
  const [Datas, setDatas] = useState<any>();

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
      ajax.open('get', `http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${value.value}_city.json`);
      ajax.send();
      ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
          const data = JSON.parse(ajax.responseText);
          if (value.value === '810000' || value.value === '820000' || value.value === '710000') {
            setCityAdcode(value.value);
          } else {
            setCityAdcode(undefined);
          }
          setSecondCity(data.rows);
          setProvinceVal({
            value: value.value,
            label: value.label,
            key: value.value
          });
          setCityVal({});
          setCountyVal({});
          setCounty([]);
        }
      };
    } else if (type === 'secondCity') {
      const ajax = new XMLHttpRequest();
      ajax.open('get', `http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${value.value}_district.json`);
      ajax.send();
      ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
          let newArr: any[] = [];
          const data = JSON.parse(ajax.responseText);
          data.rows.forEach((item: any) => {
            if (item.adcode.substring(0, 4) === value.value.substring(0, 4)) {
              newArr.push(item);
            }
          });
          setCounty(newArr);
          setCityVal({
            value: value.value,
            label: value.label,
            key: value.value
          });
          setCountyVal({});
          setCityAdcode(undefined);
        }
      };
    } else if (type === 'county') {
      setCityAdcode(value.value);
      setCountyVal({
        value: value.value,
        label: value.label,
        key: value.value
      });
    }
  };

  const submit = async () => {
    if (typeof cityAdcode !== 'undefined') {
      const res = await updateJYJGSJ({ id: currentUser!.jyjId! }, { XZQH: cityAdcode });
      if (res.status === 'ok') {
        message.success('保存成功');
        window.location.reload();
      } else {
        message.success(res.message);
      }
    } else {
      message.info('请选择所在行政区域');
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
            labelInValue
            value={provinceVal}
            placeholder="请选择"
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
            labelInValue
            value={cityVal}
            placeholder="请选择"
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
            labelInValue
            value={countyVal}
            placeholder="请选择"
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
