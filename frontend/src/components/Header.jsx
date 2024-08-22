import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to={'/login'}>로그인</Link>
        </header>
    );
};

export default Header;
