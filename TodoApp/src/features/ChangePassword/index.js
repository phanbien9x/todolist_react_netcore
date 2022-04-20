import './index.css';
import React from 'react';
import { Typography, Divider, Input, Button, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { CHANGE_PASSWORD_REQUEST } from './slice';

const { Title } = Typography;
const { Password } = Input;

function ChangePassword() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(CHANGE_PASSWORD_REQUEST(values));
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
      <Title style={{ textAlign: 'center' }}>Change password</Title>
      <Divider />
      <Form className='change-password' onFinish={onFinish}>
        <Form.Item
          name='currentPassword'
          rules={[
            {
              required: true,
              message: 'Please input your current password!',
            },
          ]}
        >
          <Password addonBefore='Current password' placeholder='Current password' allowClear />
        </Form.Item>
        <Form.Item
          name='newPassword'
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
          ]}
        >
          <Password addonBefore='New password' placeholder='New password' allowClear />
        </Form.Item>
        <Button style={{ marginTop: 'auto' }} type='primary' htmlType='submit'>
          Update
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassword;
