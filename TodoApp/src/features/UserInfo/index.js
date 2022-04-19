import './style.css';
import React, { useEffect } from 'react';
import { Typography, Divider, Input, Button, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { userinfoSelector } from '../../app/selector';
import { CHANGE_USERINFO_REQUEST, GET_USERINFO_REQUEST } from './slice';

const { Title } = Typography;
const { Password } = Input;

function UserInfo() {
  const userinfo = useSelector(userinfoSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_USERINFO_REQUEST());
  }, [dispatch]);
  const onFinish = (values) => {
    dispatch(CHANGE_USERINFO_REQUEST(values));
  };
  return (
    <div
      style={{
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 20,
        boxShadow: '0 0 10px 4px #bfbfbf',
        borderRadius: 5,
        minHeight: 'calc(50vh)',
        margin: '0 auto',
      }}
    >
      <Title style={{ textAlign: 'center' }}>User information</Title>
      <Divider />
      <Form
        className='userinfo-form'
        onFinish={onFinish}
        initialValues={{
          email: userinfo.email,
          role: userinfo.role,
        }}
      >
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input addonBefore='Email' placeholder='Email' allowClear />
        </Form.Item>
        <Form.Item name='role'>
          <Input addonBefore='Role' placeholder='Role' allowClear disabled />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Password
            value={userinfo.role}
            style={{ marginTop: '30px' }}
            addonBefore='Confirm your password'
            placeholder='Confirm your password'
            allowClear
          />
        </Form.Item>
        <Form.Item style={{ marginTop: 'auto' }}>
          <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserInfo;
