var path = require('path');
var exphbs = require('express-handlebars');
var errorHandler = require('./helpers/errorHandler.js');

module.exports = function (app, express) {
  app.use(express.static(__dirname + '/../client'));

  app.engine('hbs', exphbs({defaultLayout: __dirname + '/views/layouts/main', extname: '.hbs'}));
  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/views');

  var mainRouter = express.Router();

  app.use('/', mainRouter);
  app.use(errorHandler.handleError);

  require('./routers/mainRouter.js')(mainRouter);
};
