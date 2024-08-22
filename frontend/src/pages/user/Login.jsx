import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const nav = useNavigate();

    const handleJoinBtn = () => {
        nav('/join');
    };
    return (
        <div className="login-container">
            <h1>Login</h1>
            <input type="text" placeholder="아이디를 입력해주세요" />
            <input type="password" placeholder="비밀번호를 입력해주세요" />
            <div>
                <button>로그인</button>
                <button onClick={handleJoinBtn}>회원가입</button>
            </div>
        </div>
    );
};

export default Login;
