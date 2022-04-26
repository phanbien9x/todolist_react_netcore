importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAXGagqzsRUHQG6HnF9NftCYI7yh5taPFI',
  authDomain: 'todoapi-347209.firebaseapp.com',
  projectId: 'todoapi-347209',
  storageBucket: 'todoapi-347209.appspot.com',
  messagingSenderId: '829556782324',
  appId: '1:829556782324:web:66d8c879c16308bfed5aa1',
  measurementId: 'G-39Z3TS31Q4',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
