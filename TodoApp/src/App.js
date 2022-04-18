import { Typography, Divider, Spin, notification } from 'antd';
import './App.css';
import TodoList from './features/TodoList/index.js';
import Filters from './features/Filters/index.js';
import { useSelector } from 'react-redux';
import { access_tokenSelector, loaderSelector } from './app/selector.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './app/config.js';

const { Title } = Typography;

function App() {
  let navigate = useNavigate();
  const access_token = useSelector(access_tokenSelector);
  const loader = useSelector(loaderSelector);
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers.post['Content-Type'] = 'Content-Type application/x-www-form-urlencoded';
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
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
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <Title style={{ textAlign: 'center' }}>TODO APP with REDUX</Title>
        <Filters />
        <Divider />
        <TodoList />
      </div>
    </Spin>
  );
}

export default App;
