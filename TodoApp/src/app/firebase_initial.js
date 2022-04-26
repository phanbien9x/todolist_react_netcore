import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

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
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};
