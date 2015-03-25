var projectController = require('../controllers/projectController.js');

module.exports = function(app) {
  // use projectController's methods to handle get request with user & id values
  app.get('/:user/:id', projectController.getProject, projectController.renderProject);
};
