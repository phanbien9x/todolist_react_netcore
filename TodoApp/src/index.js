import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './features/Auth/index.js';
import { Provider } from 'react-redux';
import store, { persistor } from './app/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Sidebar from './layouts/Sidebar/Sidebar';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Sidebar><App /></Sidebar>} />
          <Route path='/login' element={<Auth />} />
          <Route element={Auth} />
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
