import './style.css';
import React, { useEffect } from 'react';
import { Typography, Spin, notification, Divider, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { access_tokenSelector, loaderSelector } from '../../app/selector';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function ChangePassword() {
  const navigate = useNavigate();
  const access_token = useSelector(access_tokenSelector);
  const loader = useSelector(loaderSelector);
  useEffect(() => {
    !access_token && navigate('/login');
  }, [access_token, navigate]);
  useEffect(() => {
    const { message, description } = loader.error;
    (loader.error.message !== null || loader.error.description !== null) &&
      notification['error']({
        message,
        description,
      });
  }, [loader.error]);
  return (
    <Spin tip='Loading' spinning={loader.loading} wrapperClassName='main__spin__container'>
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
    </Spin>
  );
}

export default ChangePassword;
