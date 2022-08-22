const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');

const port = config.get('port');
const app = express();
const Chat = require('./models/sample/schema');

/* 미들웨어 함수 사용시 (폴더생성해야함) */
// const logger = require('./middlewares');

app.use(bodyParser.json());
app.use(cors({origin: "*"}));

app.get('/', function(req, res) {
  res.redirect('/index');
})
//정적파일 참조를 위한 static 미들웨어함수
app.use(express.static(path.join(__dirname, '../../client/src')));

//라우팅시
app.get('/index', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../client/src', 'index.html'));
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
  // console.log(socket.id);
  

  /* 연결 끊길 시 */
  socket.on('disconnect', () => {
    console.log('socket disconnected');
  })

  /* JOIN, SEND, UPDATE */
  socket.on('JOIN_ROOM', ({roomId, userId}) => {
    console.log({roomId, userId});
    socket.join(roomId);
  })

  Chat.find( {}, (err, result) => {
    if(err) {
      console.log('error');
    }
    for(var i = 0; i < result.length; i++) {
      const dbData = { message: result[i].text};
      io.emit('preload', dbData);
    }
  })


  socket.on('SEND_MESSAGE', function(data) {
    io.emit('SEND_MESSAGE', data);
  
    let chat = new Chat({userId: socket.id, text: data.message});
    chat.save(function (err, data) {
      if(err) {
        console.log('error');
      }
      console.log('message is inserted');
    });
  


    // const chat = new ChatSchema({ userId: undefined, text: data.message });
  })

});