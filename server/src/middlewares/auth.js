const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env')});

exports.auth = (req, res, next) => {
  // 요청 헤더에 저장된 토큰 (req,headers.authorization)과 비밀키를 사용해 토큰을 req.decoded에 반한
  //cookie에 토큰이 담겨있음
  //인증 성공
  try {
    req.decoded = jwt.verify(req.cookies.user, process.env.SECRET_KEY);
    return next();
  }
  //인증 실패
  catch(error) {
    //토큰이 만료되었을 때
    if(error.name === 'TokenExpiredError') {
      console.log('auth TokenExpiredError');
      next();
    }
    // JsonWebTokenError
    if(error.name === 'JsonWebTokenError') {
      console.log('JsonWebTokenError');
      next();
    }
    
  }
}