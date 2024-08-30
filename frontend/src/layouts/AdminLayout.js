import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminAside from '../components/admin/AdminAside';

const AdminLayout = () => {
    return (
        <div className="adminLayout-container">
            <AdminAside />
            <Outlet />
        </div>
    );
};

export default AdminLayout;
