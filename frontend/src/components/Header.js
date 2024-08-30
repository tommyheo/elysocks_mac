import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Header = () => {
    const { role } = useAuth();

    const renderHeaderContent = () => {
        switch (role) {
            case 'admin':
                return <Link to={'/admin'}>관리자모드</Link>;
            case 'user':
                return <div>프로필</div>;
            default:
                return '';
        }
    };

    return (
        <header>
            <h1>Header</h1>
            <div className="header-logo">ElySocks</div>
            <nav className="header-nav"></nav>
            <div className="header-user-info">
                <Link to={'/login'}>로그인</Link>
                {renderHeaderContent()}
            </div>
        </header>
    );
};

export default Header;
