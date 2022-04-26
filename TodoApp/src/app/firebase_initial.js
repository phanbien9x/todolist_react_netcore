import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { notification } from 'antd';

const app = initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
});

export const messaging = getMessaging(app);
export const getFCMToken = () => {
  getToken(messaging, {
    vapidKey: process.env.REACT_APP_FCM_PUSH_NOTIFY_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        axios.patch(`/update-fcm-token?token=${currentToken}`).catch((error) => {
          notification['error']({
            message: error.response?.status,
            description: error.response
              ? typeof error.response.data === 'string'
                ? error.response.data
                : error.response.data.detail
              : error.toString(),
          });
        });
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};
