import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/user/Login';
import Join from './pages/user/Join';
import AdminHome from './pages/admin/AdminHome';
import AdminMember from './pages/admin/AdminMember';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/admin/member" element={<AdminMember />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
