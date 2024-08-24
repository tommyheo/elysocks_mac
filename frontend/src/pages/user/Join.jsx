import React, { useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const navi = useNavigate();

    // ----------------- API URL -----------------
    const apiUrl = process.env.REACT_APP_API_URL;

    // ----------------- User Variable -----------------
    const role = 'user';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [frontAddress, setFrontAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const address = `${frontAddress} ${detailAddress}`;
    const [isOpen, setIsOpen] = useState(false);

    // ----------------- User Info Submit Handler-----------------
    const handleSubmit = () => {
        axios
            .post(`${apiUrl}/user/register`, {
                username,
                password,
                name,
                phone,
                email,
                address,
                role,
            })
            .then((res) => {
                if (res.data.register === true) {
                    alert(`${res.data.message}`);
                    navi('/login');
                } else {
                    alert(`${res.data.message}`);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // ----------------- Check Username Handler-----------------
    const handleUsernameCheck = () => {
        axios
            .post(`${apiUrl}/user/check-username`, { username })
            .then((res) => {
                alert(res.data.message);
            })
            .catch((err) => console.log(err));
    };

    // ----------------- Compare Password -----------------
    const comparePasswords = () => {
        if (password === '' || checkPassword === '') {
            return '';
        }
        return password === checkPassword
            ? '비밀번호가 일치합니다.'
            : '비밀번호가 일치하지 않습니다.';
    };

    const messageStyle = {
        color: comparePasswords() === '비밀번호가 일치합니다.' ? 'green' : 'red',
        fontWeight: '600',
    };

    // ----------------- PostCode -----------------
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

        setFrontAddress(fullAddress);
        setIsOpen(false);
    };

    const handleClick = () => {
        setIsOpen(true);
    };

    const postCodeStyle = {
        display: 'block',
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '40%',
        height: '50%',
        border: '1px solid #000',
    };
    return (
        <div className="join-container">
            <h1>Join</h1>
            <div>
                <input
                    type="text"
                    placeholder="사용할 아이디를 입력해주세요"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleUsernameCheck}>중복확인</button>
            </div>
            <div>
                <input
                    type="password"
                    placeholder="사용할 비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    value={checkPassword}
                    placeholder="입력한 비밀번호를 확인해주세요"
                    onChange={(e) => setCheckPassword(e.target.value)}
                />
                <p style={messageStyle}>{comparePasswords()}</p>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="휴대폰 번호를 입력해주세요( - 제외 )"
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
                <input
                    type="text"
                    placeholder="주소검색을 클릭해주세요"
                    value={frontAddress}
                    readOnly
                />
                <button onClick={handleClick}>주소검색</button>
                <div>
                    <input
                        type="text"
                        placeholder="상세 주소를 입력해주세요"
                        onChange={(e) => setDetailAddress(e.target.value)}
                    />
                </div>
                {isOpen && (
                    <div style={postCodeStyle}>
                        <DaumPostcode
                            onComplete={handleComplete}
                            autoClose
                            width="100%"
                            height="100%"
                        />
                    </div>
                )}
            </div>
            <div>
                <button onClick={handleSubmit}>가입하기</button>
                <button>취소</button>
            </div>
        </div>
    );
};

export default Join;
