import './Sidebar.css';
import { Layout, Menu } from 'antd';
import { HomeOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from './../../features/Login/slice.js';
import { useNavigate } from 'react-router-dom';
import { access_tokenSelector } from '../../app/selector';

const { Content, Sider } = Layout;

function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access_token = useSelector(access_tokenSelector);
  useEffect(() => {
    !access_token && navigate('/login');
  }, [access_token, navigate]);
  let pathname = 'home';
  switch (window.location.pathname) {
    case '/':
      pathname = 'home';
      break;
    case '/user-info':
      pathname = 'userinfo';
      break;
    case '/change-password':
      pathname = 'changepassword';
      break;
    default:
      break;
  }
  const items = [
    {
      key: 'home',
      label: 'Home',
      onClick: () => navigate('/'),
      icon: <HomeOutlined />,
    },
    {
      key: 'userinfo',
      label: 'User informations',
      onClick: () => navigate('/user-info'),
      icon: <UserOutlined />,
    },
    {
      key: 'changepassword',
      label: 'Change password',
      onClick: () => navigate('/change-password'),
      icon: <KeyOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: () => {
        dispatch(LOGOUT_REQUEST());
      },
      icon: <LogoutOutlined />,
      className: 'sidebar__lastitem',
    },
  ];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
      >
        <Menu items={items} className='sidebar__list' theme='dark' defaultSelectedKeys={[pathname]} mode='inline' />
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}

export default Sidebar;
