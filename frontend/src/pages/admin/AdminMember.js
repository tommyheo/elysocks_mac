import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminMember = () => {
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API_URL;

    // 전체 회원을 저장하기 위한 변수
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await axios.post(`${api_url}/admin/members`);
                setMemberList(res.data.memberList);
            } catch (err) {
                console.error('Error fetching members:', err);
            }
        };

        fetchMembers();
    }, [api_url]);

    const handleRowerClick = (member_id) => {
        navigate(`/admin/members/person/${member_id}`);
    };

    const handleGotoCreate = () => {
        navigate('/admin/members/create');
    };

    return (
        <div className="adminMember-container">
            <h1>회원관리</h1>
            <div>
                <button onClick={handleGotoCreate}>관리자 추가</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>역할</th>
                        <th>회원번호</th>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>전화번호</th>
                        <th>이메일</th>
                        <th>주소</th>
                    </tr>
                </thead>
                <tbody>
                    {memberList.map((member, index) => (
                        <tr
                            key={member._id}
                            onClick={() => handleRowerClick(member._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{index + 1}</td>
                            <td>{member.role === 'user' ? '사용자' : '관리자'}</td>
                            <td>{member._id}</td>
                            <td>{member.username}</td>
                            <td>{member.name}</td>
                            <td>{member.birth.split('T')[0]}</td>
                            <td>{member.phone}</td>
                            <td>{member.email}</td>
                            <td>{member.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminMember;
