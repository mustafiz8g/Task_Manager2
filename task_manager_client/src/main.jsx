import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import GoogleLogin from './GoogleLogin.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GoogleLogin />} />
        </Routes>
      </BrowserRouter>
      <Toaster position='top-right' reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);


