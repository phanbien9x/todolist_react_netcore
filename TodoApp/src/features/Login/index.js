import { Typography, notification, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { loaderSelector, access_tokenSelector } from './../../app/selector.js';
import { LOGIN_REQUEST } from './slice.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector(loaderSelector);
  const access_token = useSelector(access_tokenSelector);
  useEffect(() => {
    const { message, description } = loader.error;
    (loader.error.message !== null || loader.error.description !== null) &&
      notification['error']({
        message,
        description,
      });
  }, [loader.error]);
  useEffect(() => {
    access_token && navigate('/');
  }, [access_token, navigate]);
  const onFinish = (values) => {
    dispatch(LOGIN_REQUEST(values));
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
        alignSelf: 'center',
        margin: '0 auto',
      }}
    >
      <Title style={{ textAlign: 'center' }}>LOGIN</Title>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
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
          <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href='/forgot-password'>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Log in
          </Button>
          Or <a href='/register'>register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
