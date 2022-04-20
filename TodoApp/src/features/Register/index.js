import { Typography, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './index.css';
import { useDispatch } from 'react-redux';
import { REGISTER_REQUEST } from './slice.js';
const { Title } = Typography;

function Register() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(REGISTER_REQUEST(values));
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
      <Title style={{ textAlign: 'center' }}>REGISTER</Title>
      <Form
        name='normal_register'
        className='register-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
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
          <Input prefix={<MailOutlined className='site-form-item-icon' />} placeholder='Email' />
        </Form.Item>
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
          <a className='register-form-forgot' href='/forgot-password'>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='register-form-button'>
            Register
          </Button>
          Or <a href='/login'>Login</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
