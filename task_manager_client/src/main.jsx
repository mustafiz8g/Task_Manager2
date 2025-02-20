import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import GoogleLogin from './GoogleLogin.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { Toaster } from "react-hot-toast";
import PrivateRoute from './Route/PrivateRoute.jsx'
import Mainlayout from './Layout/Mainlayout.jsx'
import ToDo from './Components/ToDo.jsx'
import Progress from './Components/Progress.jsx'
import Finish from './Components/Finish.jsx'
import NewTask from './Components/NewTask.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GoogleLogin />} />
          <Route path="/" element={<PrivateRoute><Mainlayout /></PrivateRoute>}>
                    <Route index element={<ToDo />} /> 
                    <Route path="todo" element={<ToDo />} />
                    <Route path="progress" element={<Progress />} />
                    <Route path="finish" element={<Finish />} />
                    <Route path='newTask' element={<NewTask/>} />
                    <Route path="*" element={<h1>Not Found</h1>} /> 
                </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position='top-right' reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);


