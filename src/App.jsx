import './App.css';
import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import JoinBudget from "./components/Budget/JoinBudget"
import CreateBudget from "./components/Budget/CreateBudget"
import BudgetRoom from "./components/Budget/BudgetRoom"
import ChangePassword from './components/auth/ChangePassword';
import UpdateProfile from './components/auth/UpdateProfile';
function App() {
  return (
    <ConfigProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateBudget />} />
          <Route path="/join" element={<JoinBudget />} />
          <Route path="/room" element={<BudgetRoom />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
