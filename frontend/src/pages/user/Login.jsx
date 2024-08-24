import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../hooks/auth';
import { setUser } from '../../redux/authSlice';

const Login = () => {
    const nav = useNavigate();

    // ----------------- 사용자 입력 변수 -----------------
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // ----------------- 로그인 요청 핸들러 -----------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            dispatch(setUser(data.user));
            alert(`${data.message}`);
        } catch (err) {
            console.error('로그인에 실패하였습니다.', err);
        }
    };

    // ----------------- 회원가입 이동 핸들러 -----------------
    const handleJoinBtn = () => {
        nav('/join');
    };
    return (
        <div className="login-container">
            <h1>Login</h1>
            <input
                type="text"
                placeholder="아이디를 입력해주세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <button onClick={handleSubmit}>로그인</button>
                <button onClick={handleJoinBtn}>회원가입</button>
            </div>
        </div>
    );
};

export default Login;
