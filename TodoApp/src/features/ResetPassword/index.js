import { Typography, Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './index.css';
import { useDispatch } from 'react-redux';
import { RESET_PASSWORD_REQUEST } from './slice.js';
import { useParams } from 'react-router-dom';

const { Title } = Typography;
const { Password } = Input;

function ResetPassword() {
  const dispatch = useDispatch();
  const { code } = useParams();
  const onFinish = (data) => {
    dispatch(RESET_PASSWORD_REQUEST({ code, data }));
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
      <Title style={{ textAlign: 'center' }}>RESET PASSWORD</Title>
      <Form
        name='normal_reset'
        className='reset-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='newPassword'
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
          ]}
        >
          <Password prefix={<LockOutlined className='site-form-item-icon' />} placeholder='New password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='reset-form-button'>
            Reset your password
          </Button>
          And <a href='/login'>Login now !</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ResetPassword;
