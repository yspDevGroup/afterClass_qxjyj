/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-01 11:07:27
 * @LastEditTime: 2021-09-01 18:53:09
 * @LastEditors: Sissle Lynn
 */
import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
const { TextArea } = Input;
const { Option } = Select;

const BasicInfoModal = (props: { showModal: boolean, handleOk: Function, form: any }) => {
  const { showModal, handleOk, form } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [cities, setCities] = useState<any>();
  const [cityAdcode, setCityAdcode] = useState<string>();
  const [secondCity, setSecondCity] = useState<any>();
  const [county, setCounty] = useState<any>();
  const [provinceVal, setProvinceVal] = useState<any>();
  const [cityVal, setCityVal] = useState<any>();
  const [countyVal, setCountyVal] = useState<any>();
  const [disabled, setDisabled] = useState(false);

  const layout = {
    labelCol: { span: 6 },
  };

  useEffect(() => {
    requestData();
  }, [])
  const requestData = () => {
    const ajax = new XMLHttpRequest();
    ajax.open('get', '//datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/100000_province.json');
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4 && ajax.status === 200) {
        const data = JSON.parse(ajax.responseText);
        setCities(data.rows);
      }
    };
  };

  const handleChange = (type: string, value: any) => {
    if (type === 'cities') {
      const ajax = new XMLHttpRequest();
      ajax.open('get', `//datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${value.value}_city.json`);
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
      ajax.open('get', `//datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${value.value}_district.json`);
      ajax.send();
      ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
          const data = JSON.parse(ajax.responseText);
          let newArr: any[] = [];
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

  const onOkClick = () => {
    handleOk(cityAdcode);
  }

  return (
    <Modal
      title="基本信息维护"
      visible={showModal}
      footer={[
        <Button key="submit" type="primary" onClick={onOkClick}>
          确定
        </Button>,
        <Button key="back" onClick={onOkClick}>
          取消
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="userForm"
        {...layout}
      >
        <Form.Item
          label="单位名称"
          name="unitName"
          rules={[{ required: true, message: '请确保输入框不为空' }]}
          wrapperCol={{ offset: 0, span: 6 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="logo"
          name="logo"
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={currentUser?.avatar} style={{ height: 100, width: 100 }} alt="" />
            <p style={{ lineHeight: '20px', width: 200, marginLeft: 10, color: '#999999' }}>
              本logo同步于企业微信，如需修改请前往企业微信管理后台
            </p>
          </div>
        </Form.Item>
        <Form.Item name="XZQHM" key="XZQHM" label="所属行政区域：">
          <Select
            style={{ width: 100, marginRight: 10 }}
            onChange={(value: any) => {
              handleChange('cities', value);
            }}
            labelInValue
            value={provinceVal}
            disabled={disabled}
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
            value={cityVal}
            disabled={disabled}
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
            value={countyVal}
            disabled={disabled}
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
        <Form.Item
          label="单位简介"
          name="introduction"
          rules={[{ required: true, message: '请确保输入框不为空' }]}
          wrapperCol={{ span: 16 }}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BasicInfoModal;
