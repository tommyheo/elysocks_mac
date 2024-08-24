import React, { useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import axios from 'axios';

const AdminMember = () => {
    const api = process.env.REACT_APP_API_URL;
    useEffect(() => {
        axios
            .post(`${api}/admin/users`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    });
    return (
        <div>
            <AdminSidebar />
            <h1>회원관리 페이지</h1>
        </div>
    );
};

export default AdminMember;
