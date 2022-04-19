import { notification } from 'antd';
import './App.css';
import { useSelector } from 'react-redux';
import { access_tokenSelector, loaderSelector } from './app/selector';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './layouts/Sidebar/Sidebar';
import Login from './features/Login';
import UserInfo from './features/UserInfo';
import ChangePassword from './features/ChangePassword';
import { BASE_URL } from './app/config';
import Home from './features/Home/index';

function App() {
  const access_token = useSelector(access_tokenSelector);
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers.post['Content-Type'] = 'Content-Type application/x-www-form-urlencoded';
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  let navigate = useNavigate();
  const loader = useSelector(loaderSelector);
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
    <Routes>
      <Route
        path='/'
        element={
          <Sidebar>
            <Home />
          </Sidebar>
        }
      />
      <Route
        path='/user-info'
        element={
          <Sidebar>
            <UserInfo />
          </Sidebar>
        }
      />
      <Route
        path='/change-password'
        element={
          <Sidebar>
            <ChangePassword />
          </Sidebar>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route element={Login} />
      <Route
        path='*'
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
