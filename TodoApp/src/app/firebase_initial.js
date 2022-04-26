import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const app = initializeApp({
  apiKey: 'AIzaSyAXGagqzsRUHQG6HnF9NftCYI7yh5taPFI',
  authDomain: 'todoapi-347209.firebaseapp.com',
  projectId: 'todoapi-347209',
  storageBucket: 'todoapi-347209.appspot.com',
  messagingSenderId: '829556782324',
  appId: '1:829556782324:web:66d8c879c16308bfed5aa1',
  measurementId: 'G-39Z3TS31Q4',
});

export const messaging = getMessaging(app);
export const getFCMToken = () => {
  getToken(messaging, {
    vapidKey: 'BG1z8UxgpwR5DsGFwxzvKpvV6PyX1pfGaf6ed3pw-3psoxvNcYko7LQRLSWU7NdVcG-MYoqzhbfNYIP3Tj0wWUI',
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
