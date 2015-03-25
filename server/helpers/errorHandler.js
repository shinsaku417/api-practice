module.exports = {
  // function that handles error and render handlebar template for error
  handleError: function (err, req, res, next) {
    res.status(404);
    res.render('error');
  }
};
