import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminPerson = () => {
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API_URL;
    const { id } = useParams();

    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                setLoading(true);
                const res = await axios.post(`${api_url}/admin/person`, { member: id });
                setPerson(res.data.person);
            } catch (err) {
                setError('Failed to fetch person data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPerson();
    }, [api_url, id]);

    const handleDeletePerson = async () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                await axios.post(`${api_url}/admin/person/delete`, { member: id });
                alert('회원 삭제가 성공적으로 삭제되었습니다.');
                navigate('/admin/members');
            } catch (err) {
                console.err('회원 삭제 중 요류 발생', err);
                alert('회원 삭제에 실패하였습니다.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!person) return <div>No person data found</div>;

    return (
        <div className="adminPerson-container">
            <h1>Admin Person</h1>
            <div>
                <label>회원번호</label>
                <div>
                    <strong>{person._id}</strong>
                </div>
            </div>
            <div>
                <label>역할</label>
                <div>
                    <strong>{person.role === 'user' ? '사용자' : '관리자'}</strong>
                </div>
            </div>
            <div>
                <label>아이디</label>
                <div>
                    <strong>{person.username}</strong>
                </div>
            </div>
            <div>
                <label>이름</label>
                <div>
                    <strong>{person.name}</strong>
                </div>
            </div>
            <div>
                <label>생년월일</label>
                <div>
                    <strong>{person.birth && person.birth.split('T')[0]}</strong>
                </div>
            </div>
            <div>
                <label>휴대폰 번호</label>
                <div>
                    <strong>
                        {person.phone &&
                            `${person.phone.slice(0, 3)} - ${person.phone.slice(
                                3,
                                7
                            )} - ${person.phone.slice(7, 13)}`}
                    </strong>
                </div>
            </div>
            <div>
                <label>이메일</label>
                <div>
                    <strong>{person.email}</strong>
                </div>
            </div>
            <div>
                <label>주소</label>
                <div>
                    <strong>{person.address}</strong>
                </div>
            </div>
            <div>
                <button onClick={handleDeletePerson}>삭제</button>
                <button
                    onClick={() => {
                        navigate('/admin/members');
                    }}
                >
                    목록으로 돌아가기
                </button>
            </div>
        </div>
    );
};

export default AdminPerson;
