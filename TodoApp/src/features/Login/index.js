import { Typography, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css';
import { useDispatch } from 'react-redux';
import { LOGIN_REQUEST } from './slice.js';
const { Title } = Typography;

function Login() {
  const dispatch = useDispatch();
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

          <a className='login-form-recover' href='/recover-password'>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Log in
          </Button>
          Or <a href='/register'>register now !</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
