import './style.css';
import React from 'react';
import { Typography, Divider, Input, Button } from 'antd';

const { Title } = Typography;

function ChangePassword() {
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
      <div className='userinfo-form-container'>
        <Input addonBefore='Current password' placeholder='Current password' allowClear />
        <Input addonBefore='New password' placeholder='New password' allowClear />
        <Button style={{ marginTop: 'auto' }} type='primary' shape='round'>
          Update
        </Button>
      </div>
    </div>
  );
}

export default ChangePassword;
