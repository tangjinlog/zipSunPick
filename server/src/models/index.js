const mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('db');

mongoose
  .connect(dbConfig.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then( () => console.log('mongoDB connected'))
  .catch( e => {
    console.error('Connection error', e.message)
  })

const db = mongoose.connection;
module.exports = db;