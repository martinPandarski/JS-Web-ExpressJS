require('./config/database')().then(() => {
  const config = require('./config/config');
  const app = require('express')();
  const appStr = `Server is running on ${config.port}`;

  require('./config/express')(app);
  require('./config/routes')(app);

  app.listen(config.port, console.log(appStr))
})