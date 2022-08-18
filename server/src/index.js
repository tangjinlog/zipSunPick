const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const Schema = require('./models/sample'); 

const port = config.get('port');
const app = express();

/* 미들웨어 함수 사용시 (폴더생성해야함) */
// const logger = require('./middlewares');

app.use(bodyParser.json());
app.use(cors({origin: "*"}));
//라우팅시
app.get('/', (req, res, next) => {
  res.send('/clinet/src/index.html');
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

io.on('connection', (socket) => {
  console.log('socket connected');

  /* 연결 끊길 시 */
  socket.on('disconnect', () => {
    console.log('socket disconnected');
  })

  /* JOIN, SEND, UPDATE */
  socket.on('JOIN_ROOM', ({roomId, userId}) => {
    console.log({roomId, userId});
    socket.join(roomId);
  })

  socket.on('SEND_MESSAGE', ({roomId, userId, message}) => {
    console.log({roomId, userId, message});
    io.to(roomId).emit('UPDATE_MESSAGE', {userId, message});
    const chatSchema = new Schema({ userId: userId, text: message });
    chatSchema.save(function (err, {userId, message}) {
      console.log('message is inserted');
    })
  })

});