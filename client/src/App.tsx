import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/home';
import Profile from './pages/profile';
import Post from './pages/post';


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/posts/:id" element={<Post />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
