import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../hooks/auth';
import { logoutAction } from '../../redux/authSlice';

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(logoutAction());
        } catch (err) {
            console.error('로그아웃에 실패하였습니다.', err);
        }
    };
    return <button onClick={handleLogout}>로그아웃</button>;
};

export default Logout;
