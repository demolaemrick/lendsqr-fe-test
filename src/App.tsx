import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Login from './pages/Login';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/users/:id" element={<UserDetails />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
