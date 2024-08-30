import axios from 'axios';
import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const navigate = useNavigate();

    // ------------ API 주소 ------------
    const api_url = process.env.REACT_APP_API_URL;

    // ------------ 사용자 입력값 ------------
    const role = 'user';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkpassword, setCheckpassword] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');

    const [passwordMatch, setPasswordMatch] = useState(null);

    // ------------ 회원가입 요청 핸들러 ------------
    const handleRegister = () => {
        if (password === checkpassword) {
            axios
                .post(`${api_url}/user/register`, {
                    role,
                    username,
                    password,
                    name,
                    birth,
                    phone,
                    email,
                    address,
                })
                .then((res) => {
                    if (res.data.register) {
                        alert(`${res.data.message}`);
                        navigate('/login');
                    } else {
                        alert(`${res.data.message}`);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert('비밀번호 확인을 해주세요');
        }
    };

    // ------------ Daum-Postcode ------------
    const open = useDaumPostcodePopup(
        'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    );

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        setZonecode(fullAddress);
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    // ------------ 아이디 중복 확인 핸들러 ------------
    const handleCheckUsername = () => {
        axios
            .post(`${api_url}/user/check-username`, { username })
            .then((res) => {
                alert(`${res.data.message}`);
            })
            .catch((err) => console.log(err));
    };

    // ------------ 비밀번호 확인 핸들러 ------------
    const handleCheckPassword = (e) => {
        const confirmPassword = e.target.value;
        setCheckpassword(confirmPassword);
        if (password === '' && confirmPassword === '') {
            setPasswordMatch(null);
        } else {
            setPasswordMatch(password === confirmPassword);
        }
    };
    return (
        <div className="join-container">
            <div>
                <input
                    type="text"
                    placeholder="사용할 아이디를 입력해주세요"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleCheckUsername}>중복확인</button>
            </div>
            <div>
                <input
                    type="password"
                    placeholder="사용할 비밀번호를 입력해주세요"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="비밀번호를 환인해주세요"
                    onChange={handleCheckPassword}
                />
                {passwordMatch !== null && (
                    <p style={{ color: `${passwordMatch ? 'green' : 'red'}` }}>
                        {passwordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                    </p>
                )}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <input type="date" onChange={(e) => setBirth(e.target.value)} />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="전화번호를 입력해주세요"
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="이메일을 입력해주세요"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="주소 찾기를 눌러주세요"
                        value={zonecode}
                        readOnly
                    />
                    <button onClick={handleClick}>주소 검색</button>
                </div>
                <input
                    type="text"
                    placeholder="상세주소를 입력해주세요"
                    onChange={(e) => {
                        setAddress(`${zonecode} ${e.target.value}`);
                    }}
                />
            </div>
            <div>
                <button onClick={handleRegister}>회원가입</button>
                <button
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    취소
                </button>
            </div>
        </div>
    );
};

export default Join;
