import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserInfo = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div
            className="userInfo-container"
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
            <div>{user ? <strong>{user.username}</strong> : ''}</div>
            {user && user.role === 'admin' ? (
                <Link to={'/admin'}>
                    <button>관리메뉴</button>
                </Link>
            ) : (
                ''
            )}
        </div>
    );
};

export default UserInfo;
