const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
// const { db } = require('./config/default');

const port = config.get('port');
const app = express();

/* 미들웨어 함수 사용시 (폴더생성해야함) */
// const logger = require('./middlewares');

app.use(bodyParser.json());
app.use(cors({origin: "*"}));
//라우팅시
app.get('/', (req, res, next) => {
  res.send('tangjinlog');
});
//express 사용 포트를받아서 서버 염
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});

/* mongoose db연결 */
const db = require('./models');

db.once('open', () => {
  console.log('DB Connected');
})

db.on('error', (err) => {
  console.log( 'DB ERROR : ', err);
});




//socket.io 사용
const io = require('socket.io')
  (server, {
    cors: {
      origin: '*',
    }
});