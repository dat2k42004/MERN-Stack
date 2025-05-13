import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import "./stylesheets/alignments.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/sizes.css";
import "./stylesheets/custom.css";
import "./stylesheets/theme.css";
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import Admin from "./pages/Admin";
import User from './pages/User';
import NotFound from './components/NotFound';

function App() {
  const {loading} = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>}></Route>
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
