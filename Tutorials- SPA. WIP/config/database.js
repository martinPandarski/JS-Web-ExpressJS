const mongoose = require('mongoose');
const config = require('../config/config');

module.exports = () => {
  return mongoose.connect(config.dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  console.log('DB is ready')
  );
};
