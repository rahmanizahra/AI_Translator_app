import React from 'react';
import ReactDOM from 'react-dom/client';
import SignupForm from './components/SignupForm';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import App from './App';
import Update from './components/Update';
import Delete from './components/Delete';
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Welcome/>}/>
      <Route path="/main" element={<App/>}/>
      <Route path="/signup" element={<SignupForm/>}/>
      <Route path="/update/password" element={<Update/>}/>
      <Route path="/delete" element={<Delete/>}/>
    </Routes>
    </BrowserRouter>
   
  </React.StrictMode>
);

