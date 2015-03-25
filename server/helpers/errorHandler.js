module.exports = {
  handleError: function (err, req, res, next) {
    res.status(404);
    res.render('error');
  }
};
