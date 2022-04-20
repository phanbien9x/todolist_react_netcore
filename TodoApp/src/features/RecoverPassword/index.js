import { Typography, Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import './index.css';
import { useDispatch } from 'react-redux';
import { RECOVER_PASSWORD_REQUEST } from './slice.js';
const { Title } = Typography;

function RecoverPassword() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(RECOVER_PASSWORD_REQUEST(values));
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
      <Title style={{ textAlign: 'center' }}>RECOVER PASSWORD</Title>
      <Form
        name='normal_recover'
        className='recover-form'
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
        <Form.Item>
          <Button type='primary' htmlType='submit' className='recover-form-button'>
            Send verification code to email
          </Button>
          Or <a href='/login'>Login now !</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RecoverPassword;
