import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from './user/Logout';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from './user/UserInfo';

const Header = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <header
            style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '1rem' }}
        >
            {!user ? <Link to={'/login'}>로그인</Link> : ''}
            <UserInfo />
            <Logout />
        </header>
    );
};

export default Header;
