import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/user/Login';
import Join from './pages/user/Join';
import { AuthProvider } from './utils/AuthContext';
import AdminHome from './pages/admin/AdminHome';
import AdminLayout from './layouts/AdminLayout';
import AdminMember from './pages/admin/AdminMember';
import AdminGood from './pages/admin/AdminGood';
import AdminPerson from './pages/admin/AdminPerson';
import AdminMemberCreate from './pages/admin/AdminMemberCreate';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/join" element={<Join />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminHome />} />
                            <Route path="members/person/:id" element={<AdminPerson />} />
                            <Route path="members/create" element={<AdminMemberCreate />} />
                            <Route path="members" element={<AdminMember />} />
                            <Route path="goods" element={<AdminGood />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;
