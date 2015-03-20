var path = require('path');

module.exports = function (app, express) {
  app.use(express.static(__dirname + '/../client'));

  var mainRouter = express.Router();

  app.use('/', mainRouter);

  require('./routers/mainRouter.js')(mainRouter);
};
