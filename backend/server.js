require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

const port = process.env.PORT;

// ------------ MongoDB 커넥션 ------------
mongoose
    .connect(`${process.env.MONGODB_URL}`)
    .then(console.log('MongoDB 정상 실행'))
    .catch((err) => console.log(err));

// ------------ Cors 설정 ------------
server.use(express.json());

// ------------ Cors 설정 ------------
let corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
server.use(cors(corsOptions));

// ------------ 라우터 ------------
const authToken = require('./authenticate/authJWT');
const userRouter = require('./routers/userRouter');
server.use('/user', userRouter);
const adminRouter = require('./routers/adminRouter');
server.use('/admin', authToken, adminRouter);

// ------------ 인증 관련 end-point ------------
const refresh = require('./authenticate/refresh');
const login = require('./authenticate/login');
const logout = require('./authenticate/logout');

server.post('/login', login);
server.post('/logout', logout);
server.post('/refresh', refresh);

server.listen(port, () => {
    console.log(`${port}번 포트에서 서버 정상 실행`);
});
