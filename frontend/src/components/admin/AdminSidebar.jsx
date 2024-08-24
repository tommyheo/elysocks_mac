import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <aside className="adminSidebar-container">
            <nav>
                <ul>
                    <li>
                        <Link to={'/admin/member'}>회원관리</Link>
                    </li>
                    <li>
                        <Link>상품관리</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
