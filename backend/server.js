require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT;

// ----------------- MongoDB Connection -----------------
const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URL;
mongoose
    .connect(mongo_url)
    .then(() => {
        console.log('데이터베이스 연결에 성공하였습니다');
    })
    .catch((err) => {
        console.log('데이터베이스 연결에 실패하였습니다', err);
    });

// ----------------- Middleware -----------------
app.use(cors());
app.use(express.json());

// ----------------- Routers -----------------
const userRouter = require('./routers/userRouter');
app.use('/api/user', userRouter);

// ----------------- Server Listening -----------------
app.listen(port, () => {
    console.log(`${port}에 연결되었습니다`);
});
