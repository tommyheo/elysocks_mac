import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTokens, setupAxiosInterceptors } from '../../utils/auth';
import { useAuth } from '../../utils/AuthContext';

const Login = () => {
    const api_url = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { setRole } = useAuth();

    // ------------ 사용자 입력 ------------
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // ------------ 회원가입 페이지 이동 ------------
    const handleGoToJoin = () => {
        navigate('/join');
    };

    // ------------ 로그인 요청 핸들러 ------------
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api_url}/login`, { username, password });
            const { accessToken, refreshToken, role } = response.data.data;
            setTokens(accessToken, refreshToken, username, role);
            setupAxiosInterceptors();
            setRole(role);
            window.dispatchEvent(new Event('storageChange'));
            alert('로그인을 완료하였습니다.');
            navigate('/');
        } catch (err) {
            console.error('로그인을 실패하였습니다.', err);
        }
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <input
                type="text"
                placeholder="아이디를 입력해주세요."
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <button onClick={handleLogin}>로그인</button>
                <button onClick={handleGoToJoin}>회원가입</button>
            </div>
        </div>
    );
};

export default Login;
