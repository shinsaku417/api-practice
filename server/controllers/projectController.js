var http = require('http');

module.exports = {
  getProject: function(req, res) {
    var user = req.params.user;
    var id = req.params.id;
    var url = 'http://api.diy.org/makers';

    http.get(url + '/' + user + '/projects/' + id, function(mainData) {
      var main = '';
      mainData.on('data', function(d) {
        main += d;
      });
      mainData.on('end', function() {
        http.get(url + '/' + user + '/projects/' + id + '/favorites', function(favData) {
          var favs = '';
          favData.on('data', function(d) {
            favs += d;
          });
          favData.on('end', function() {
            http.get(url + '/' + user + '/projects/' + id + '/comments', function(comData) {
              var comments = '';
              comData.on('data', function(d) {
                comments += d;
              });
              comData.on('end', function() {
                var results = {};
                results.main = main;
                results.favs = favs;
                results.comments = comments;
                res.send(results);
              });
            });
          });
        });
      });
    });
  }
};
