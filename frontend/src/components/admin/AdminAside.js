import React from 'react';
import { Link } from 'react-router-dom';

const AdminAside = () => {
    return (
        <aside>
            <h1>Admin aside</h1>
            <nav>
                <ul>
                    <li>
                        <Link to={'/admin/members'}>회원관리</Link>
                    </li>
                    <li>
                        <Link to={'/admin/goods'}>상품관리</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AdminAside;
