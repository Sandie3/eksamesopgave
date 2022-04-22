import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminLayout from './admin/AdminLayout';
import About from './admin/About';
import Contactinfo from './admin/Contactinfo';
import Contact from './admin/Contact';
import Tours from './admin/Tours';
import Footer from './admin/Footer';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <App /> } />
      <Route path="/admin" element={ <AdminLayout /> }>
        <Route index element={ <About /> } />
        <Route path="about" element={ <About /> } />
        <Route path="contactinfo" element={ <Contactinfo />} />
        <Route path="contact" element={ <Contact /> } />
        <Route path="tours" element={ <Tours /> } />
        <Route path="footer" element={ <Footer /> } />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);