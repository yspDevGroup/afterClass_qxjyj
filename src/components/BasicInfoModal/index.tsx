/*
 * @description:
 * @author: Sissle Lynn
 * @Date: 2021-09-01 11:07:27
 * @LastEditTime: 2021-12-09 15:04:18
 * @LastEditors: Wu Zhan
 */
import { JYJGSJ } from '@/services/after-class-qxjyj/jyjgsj';
import { getAdministrative } from '@/services/after-class-qxjyj/sso';
import { Button, Form, Input, Modal, Select, Image, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
const { TextArea } = Input;
const { Option } = Select;

const BasicInfoModal = (props: {
  showModal: boolean;
  handleOk: Function;
  form: any;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { showModal, handleOk, form, setShowModal } = props;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [cities, setCities] = useState<any>();
  const [cityAdcode, setCityAdcode] = useState<string>();
  const [secondCity, setSecondCity] = useState<any>();
  const [county, setCounty] = useState<any>();
  const [provinceVal, setProvinceVal] = useState<any>();
  const [cityVal, setCityVal] = useState<any>();
  const [countyVal, setCountyVal] = useState<any>();
  const [XZQHM, setXZQHM] = useState<string>();
  const [state, setstate] = useState(false);

  const layout = {
    labelCol: { span: 6 }
  };

  //获取区域内容
  const getRegion = async (type: 'province' | 'city' | 'region', code: string) => {
    try{
      const response = await getAdministrative({
        type,
        code
      });
      if (response?.status === 'ok') {
        // console.log('response', response);
        return response?.data?.rows;
      } else {
        // message.error(response.message);
      }
      return [];
    }catch(err){
      message.error('获取行政区划码失败')
    }
   
  };

  useEffect(() => {
    async function fetchData(jyjId: string) {
      const res = await JYJGSJ({
        id: jyjId
      });
      if (res.status === 'ok') {
        form.setFieldsValue({
          unitName: res.data?.BMMC,
          introduction: res.data?.BZ
        });
        if (res.data?.XZQH === '810000' || res.data?.XZQH === '820000' || res.data?.XZQH === '710000') {
          setstate(true);
        } else {
          setstate(false);
        }
        if (currentUser?.XZQHM) {
          setXZQHM(res.data?.XZQH);
          setProvinceVal({
            value: `${res.data?.XZQH?.substring(0, 2)}0000`,
            label: res.data?.XZQ?.split('/')?.[0],
            key: `${res.data?.XZQH?.substring(0, 2)}0000`
          });
          setCityVal({
            value: `${res.data?.XZQH?.substring(0, 4)}00`,
            label: res.data?.XZQ?.split('/')?.[1],
            key: `${res.data?.XZQH?.substring(0, 4)}00`
          });
          setCountyVal({
            value: res.data?.XZQH,
            label: res.data?.XZQ?.split('/')?.[2],
            key: res.data?.XZQH
          });
        }
      }
    }
    if (currentUser?.jyjId) {
      fetchData(currentUser?.jyjId);
    }
  }, [currentUser, showModal]);

  const requestData = async () => {
    // const response = await fetch('https://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/100000_province.json');
    // const provinceData = await response.json();
    // setCities(provinceData.rows);
    const list = await getRegion('province', '');
    setCities(list);
  };

  useEffect(() => {
    requestData();
    if (XZQHM) {
      setCityAdcode(XZQHM);
    }
    if (typeof XZQHM !== 'undefined') {
      (async () => {
        // const response = await fetch(
        //   `https://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${XZQHM?.substring(0, 2)}0000_city.json`
        // );
        // const provinceData = await response.json();
        const list1 = await getRegion('city', `${XZQHM?.substring(0, 2)}0000`);
        setSecondCity(list1);
        // const res = await fetch(
        //   `https://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/${XZQHM?.substring(0, 4)}00_district.json`
        // );
        // const resData = await res.json();
        // let newArr: any[] = [];
        // resData.rows.forEach((item: any) => {
        //   if (item.adcode.substring(0, 4) === XZQHM?.substring(0, 4)) {
        //     newArr.push(item);
        //   }
        // });
        const list2 = await getRegion('region', `${XZQHM?.substring(0, 4)}00`);

        setCounty(list2);
      })();
    }
  }, [XZQHM]);

  const handleChange = async (type: string, value: any) => {
    if (type === 'cities') {
      const list = await getRegion('city', value.value);
      if (value.value === '810000' || value.value === '820000' || value.value === '710000') {
        setCityAdcode(value.value);
        setstate(true);
      } else {
        setstate(false);
        setCityAdcode(undefined);
      }
      setProvinceVal({
        value: value.value,
        label: value.label,
        key: value.value
      });
      setCityVal({});
      setCountyVal({});
      setCounty([]);
      setSecondCity(list);
    } else if (type === 'secondCity') {
      const list = await getRegion('region', value.value);

      setCounty(list);
      setCityVal({
        value: value.value,
        label: value.label,
        key: value.value
      });
      setCountyVal({});
      setCityAdcode(undefined);
    } else if (type === 'county') {
      setCityAdcode(value.value);
      setCountyVal({
        value: value.value,
        label: value.label,
        key: value.value
      });
    }
  };

  const handleSubmit = (value: any) => {
    if (cityAdcode) {
      handleOk({
        BMMC: value.unitName,
        BZ: value.introduction,
        XZQH: cityAdcode,
        XZQ: `${provinceVal?.label}${cityVal?.label ? `/${cityVal?.label}` : ''}${
          countyVal?.label ? `/${countyVal?.label}` : ''
        }`
      });
    } else {
      message.error('请先选择行政区域');
    }
  };
  const onOkClick = () => {
    form.submit();
  };
  const onCancelClick = () => {
    setShowModal(false);
    form.resetFields();
  };

  return (
    <Modal
      title="基本信息维护"
      visible={showModal}
      centered={true}
      footer={[
        <Button key="submit" type="primary" onClick={onOkClick}>
          保存
        </Button>,
        <Button key="back" onClick={onCancelClick}>
          取消
        </Button>
      ]}
      onCancel={onCancelClick}
      className={styles.Modals}
    >
      <Form form={form} name="userForm" {...layout} onFinish={handleSubmit}>
        <Form.Item label="logo" name="logo">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              width={89}
              height={89}
              src={currentUser?.avatar}
              fallback="data:image/png;base64,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"
            />
            <p style={{ lineHeight: '20px', width: 200, marginLeft: 10, color: '#999999' }}>
              本logo同步于企业微信，如需修改请前往企业微信管理后台
            </p>
          </div>
        </Form.Item>
        <Form.Item label="单位名称" name="unitName" wrapperCol={{ span: 20 }}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="XZQHM" key="XZQHM" label="所属行政区域：">
          <Select
            style={{ width: state ? 140 : 120, marginRight: 10 }}
            onChange={(value: any) => {
              handleChange('cities', value);
            }}
            labelInValue
            value={provinceVal}
          >
            {cities?.map((item: any) => {
              return (
                <Option value={item.dm} key={item.mc}>
                  {item.mc}
                </Option>
              );
            })}
          </Select>
          <Select
            style={{
              width: 120,
              marginRight: 10,
              display: state ? 'none' : 'inline-block'
            }}
            onChange={(value: any) => {
              handleChange('secondCity', value);
            }}
            labelInValue
            value={cityVal}
          >
            {secondCity?.map((item: any) => {
              return (
                <Option value={item.dm} key={item.mc}>
                  {item.mc}
                </Option>
              );
            })}
          </Select>
          <Select
            style={{ width: 120, display: state ? 'none' : 'inline-block' }}
            onChange={(value: any) => {
              handleChange('county', value);
            }}
            labelInValue
            value={countyVal}
          >
            {county?.map((item: any) => {
              return (
                <Option value={item.dm} key={item.mc}>
                  {item.mc}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="单位简介" name="introduction" wrapperCol={{ span: 20 }}>
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BasicInfoModal;
