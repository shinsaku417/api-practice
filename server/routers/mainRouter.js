var projectController = require('../controllers/projectController.js');

module.exports = function(app) {
  app.get('/:user/:id', projectController.getProject);
};
