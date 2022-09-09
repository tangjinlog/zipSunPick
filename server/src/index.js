const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');
const cors = require('cors');

const port = config.get('port');
const app = express();
const Chat = require('./models/sample/schema');
const User = require('./models/sample/user');



/* jwt */
const jwt = require('jsonwebtoken');
/* importing .env file */
require('dotenv').config({ path: path.resolve(__dirname, '../../.env')});
console.log(process.env.SECRET_KEY)
/* ejs 파일 사용 */
app.set('views', path.join(__dirname, '../../client/src/views'));
app.set('view engine', 'ejs');
/* bcrypt */
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* 미들웨어 함수 사용시 (폴더생성해야함) */
// const logger = require('./middlewares');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: "*"}));

app.get('/', function(req, res) {
  res.redirect('/login');
})

//정적파일 참조를 위한 static 미들웨어함수
app.use(express.static(path.join(__dirname, '../../client/src')));


/* jwt auth 함수 */
const { auth } = require('./middlewares/auth');

//라우팅시
app.get('/login', auth, function(req, res) {
  const user = req.decoded;
  //user가 있고, 로그인 한 경우에 유저정보를 웹페이지와 함께 보낸다.
  if(user) {
    console.log(user.docs);
    return res.render('loggedin', {user:user.docs});
  } else {
    return res.sendFile(path.join(__dirname, '../../client/src', 'index.html'));
  }
})

app.get('/logOut', function(req, res) {
  return res.clearCookie('user').end();
})

//Sign Up
// id 중복검사
app.post('/login/:signUpId/:signUpPw/:signUpPwc', function(req, res, next) {
  let user = new User(req.body);
  //pw pwc 비교후 아니면 종료
  if(user.pw !== user.pwc) {
    return res.send('Your password and password confirmation have to be same');
  }

  //id검색 후 docs 변수로 리턴
  User.findOne({id:(user.id)}, function(err, docs) {
    if(err) { throw err }
    // docs 리턴 값이 null이면 일치하는 userId가 없다는 뜻 == id 생성가능
    else if(docs == null) {
      console.log('여긴됨')
      //id, pw, pwc 칸을 다 채웠는지 확인
      if(user.id&&user.pw&&user.pwc) {
        // 다음 미들웨어로 ㄱㄱ
        return next();
      }
      //칸을 공백이라면
      else {
        return res.send('Please enter all the blanks.');
      }
    }
    //입력받은 id 값이 중복이라면
    else {
      return res.send('Your entered ID already exists.');
    }
  })
})

/* bcrypt & salt */
/* id 중복검사 후 암호화 저장 */
app.post('/login/:signUpId/:signUpPw/:signUpPwc', function(req, res) {
  //user 정보 다시 넣기
  let user = new User(req.body);
  //salt 생성
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) throw err;
    //생성한 salt 값을 user.pw와 함께 hash함수에 전달
    bcrypt.hash((user.pw,user.pwc), salt, function(err, hash) {
      if(err) throw err;
      // user.pw에 생성된 hash 넣기
      user.pw = hash;
      user.pwc = hash;
      //mongo db 저장
      user.save();
      return res.send('You have just created your new account!');
    })
  })
})

/* Sign In */
/* 암호화된 비밀번호와 입력받은 비밀번호랑 비교 */
app.post('/login/:signInId/:signInPw', function(req, res, next) {
  //user 변수 초기화
  let user = new User(req.body);
  User.findOne({id:user.id}, function(err, docs) {
    if(err) throw err;
    else if(docs == null) {
      return res.send('Entered ID does not exist.');
    }
    else { //id 매칭 성공하면
      bcrypt.compare(user.pw, docs.pw, function(err, answer) {
        if(err) throw err;
        if(answer) {
          console.log(answer, req.user, docs)
          req.user = docs;
          return next();
        } else {
          return res.send('Your password does not match with your ID');
        }
      })
    } 
  })
})

/* 비밀번호 일치 확인 후 jwt 발급 */
app.post('/login/:signInId/:signInPw', function(req, res) {
  const docs = req.user;
  const payload = {
    docs,
  }
  //jwt 생성
  jwt.sign( payload, process.env.SECRET_KEY, { expiresIn: "30m" }, function(err, token) {
    if(err) throw err;
    else {
      return res
        .cookie('user', token, {maxAge: 30 * 60 * 1000})
        .end();
    }
  
  })
})



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
      const dbData = { message: result[i].text, comment: result[i].comment, id: result[i]._id};
      io.emit('preload', dbData);
    }
  })


  socket.on('SEND_MESSAGE', function(data) {
    
    
    let chat = new Chat({userId: socket.id, text: data.message, comment: {comment_author: 'eoto'}});
    chat.save(function (err, data) {
      if(err) {
        console.log('error');
      }
      console.log('message is inserted');
    });
    id = chat._id;
    console.log(id)
    io.emit('SEND_MESSAGE', data, id);
    // const chat = new ChatSchema({ userId: undefined, text: data.message });
  })

  socket.on('SEND_REPLY', function(data) {
    io.emit('SEND_REPLY', data);

      // const id = ;
    // const id = data._id;
    let chat = Chat();
    chat.find({}, (err, result) => {
      for(let i=0; i<result.length; i++) {
        if(err) { throw err}
        if(result[i]._id == id) {
          chat.findOneAndUpdate()
        }
      }
    })
    
    
    
    console.log(id);
    
        
      
    
    // Chat.findByIdAndUpdate(id, Chat.comment[0], {new: true, upsert: true});
    
    // Chat.findOneAndUpdate({id}, {comment: {comment_text: data.comment_text}}, {new: true, upsert: true});
    
    


    // Chat.findOneAndUpdate(data.parent_id, {[0]: {comment: {comment_author: data.comment_author}}}, {new: true});
    // Chat.findOneAndUpdate(data.parent_id, {[0]: {comment: {comment_text: data.comment_text}}}, {new: true});

    // let chat = new Chat({ 
    //   comment: [{
    //     comment_author: data.comment_author,
    //     comment_text: data.comment_text,
        
    //   }]
    // })
    // chat.save(function (err, data) {
    //   if(err) {
    //     console.log('error');
    //   }
    //   console.log('message is inserted');
    // })
  })

});