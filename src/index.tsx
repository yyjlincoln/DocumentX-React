// Basics
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
// Global Styles
import './index.css';

// App Views
import App from './App';
import { AppFrame, Home, Auth, NotFound } from './views/Global';
import { Dashboard, Library, Search } from './views/Main';

import 'boxicons/css/boxicons.css'



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<AppFrame />} >
            <Route path="" element={<Home />} />
            <Route path="signin" element={<Auth signIn />} />
            <Route path="register" element={<Auth signIn={false} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="library" element={<Library />} />
            <Route path="search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
