import './Sidebar.css';
import { Layout, Menu } from 'antd';
import { HomeOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from './../../features/Auth/slice.js';
import { useNavigate } from 'react-router-dom';
import { access_tokenSelector } from '../../app/selector';

const { Content, Sider } = Layout;

function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access_token = useSelector(access_tokenSelector);
  const handleClickLogout = () => {
    dispatch(LOGOUT_REQUEST());
  };
  useEffect(() => {
    !access_token && navigate('/login');
  }, [access_token, navigate]);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
      >
        <Menu className='sidebar__list' theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item onClick={() => navigate('/')} key='1' icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item onClick={() => navigate('/user-info')} key='2' icon={<UserOutlined />}>
            User informations
          </Menu.Item>
          <Menu.Item onClick={() => navigate('/change-password')} key='3' icon={<KeyOutlined />}>
            Change password
          </Menu.Item>
          <Menu.Item onClick={handleClickLogout} className='sidebar__lastitem' key='4' icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}

export default Sidebar;
