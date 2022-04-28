import { notification, Spin } from 'antd';
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
import { API_URL } from './app/config';
import Home from './features/Home/index';
import Register from './features/Register';
import RecoverPassword from './features/RecoverPassword/index';
import ResetPassword from './features/ResetPassword/index';
import TodoDetail from './features/TodoDetail/index';
import { onMessage } from 'firebase/messaging';
import { getFCMToken, messaging } from './app/firebase_initial';
import { v4 as uuidv4 } from 'uuid';

notification.config({
  placement: 'topRight',
  duration: 0,
});
function App() {
  const access_token = useSelector(access_tokenSelector);
  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.post['Content-Type'] = 'Content-Type application/x-www-form-urlencoded';
  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  let navigate = useNavigate();
  const loader = useSelector(loaderSelector);
  onMessage(messaging, (payload) => {
    console.log(payload);
    const key = uuidv4();
    notification['warning']({
      key,
      message: payload.notification.title,
      description: payload.notification.body,
      onClick: () => {
        notification.close(key);
        payload.data.type === 'todoExpired' && navigate(`/todo/${payload.data.id}`);
      },
    });
  });

  axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  useEffect(() => {
    if (/\/((login)|(register)|(recover-password)|(reset-password.+))/.test(window.location.pathname)) {
      access_token && navigate('/');
    } else {
      access_token ? getFCMToken() : navigate('/login');
    }
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
    <Spin tip='Loading' spinning={loader.loading}>
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
          path='/todo/:id'
          element={
            <Sidebar>
              <TodoDetail />
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
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recover-password' element={<RecoverPassword />} />
        <Route path='/reset-password/:code' element={<ResetPassword />} />
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
    </Spin>
  );
}

export default App;
