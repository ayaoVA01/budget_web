import './App.css';
import React from 'react';

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
import { AuthProvider } from './components/common/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import NotificationPage from './components/Notifications/Notification';

// import Footer from './components/Layout/Footer';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/change-password" element={<PrivateRoute element={<ChangePassword />} />} />
          <Route path="/update-profile" element={<PrivateRoute element={<UpdateProfile />} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/create" element={<PrivateRoute element={<CreateBudget />} />} />
          <Route path="/join" element={<PrivateRoute element={<JoinBudget />} />} />
          <Route path="/room/:roomId" element={<PrivateRoute element={<BudgetRoom />} />} />
          <Route path="/notification" element={<PrivateRoute element={<NotificationPage />} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
