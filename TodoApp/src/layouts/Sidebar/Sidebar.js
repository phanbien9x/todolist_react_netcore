import './Sidebar.css';
import { Layout, Menu } from 'antd';
import { HomeOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
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
          <Menu.Item key='1' icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key='2' icon={<UserOutlined />}>
            User informations
          </Menu.Item>
          <Menu.Item key='3' icon={<KeyOutlined />}>
            Change password
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              navigate('/Login');
            }}
            className='sidebar__lastitem'
            key='4'
            icon={<LogoutOutlined />}
          >
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
