var http = require('http');
var monthMap = require('../helpers/monthMap.js');

var getData = function(req, url, name, callback) {
  http.get(url, function(data) {
    var body = '';
    data.on('data', function(chunk) {
      body += chunk;
    });
    data.on('end', function() {
      req.data[name] = JSON.parse(body).response;
      callback();
    });
  });
};

module.exports = {
  getProject: function(req, res, next) {
    req.data = {};
    var user = req.params.user;
    var id = req.params.id;
    var projectUrl = 'http://api.diy.org/makers' + '/' + user + '/projects/' + id;
    var favoriteUrl = 'http://api.diy.org/makers' + '/' + user + '/projects/' + id + '/favorites';
    var commentUrl = 'http://api.diy.org/makers' + '/' + user + '/projects/' + id + '/comments';
    var achievementUrl = 'http://api.diy.org/makers' + '/' + user + '/projects/' + id + '/achievements';

    getData(req, projectUrl, 'project', function() {
      getData(req, favoriteUrl, 'favorites', function() {
        getData(req, commentUrl, 'comments', function() {
          getData(req, achievementUrl, 'achievements', function() {
            next();
          });
        });
      });
    });
  },

  renderProject: function(req, res) {
    var data = req.data;

    var date = new Date(data.project.stamp);

    var achievements = [];
    for (var i = 0; i < data.achievements.length; i++) {
      var achievement = data.achievements[i];
      var title = achievement.skill.title;
      var img = 'http:' + achievement.skill.images.medium;
      achievements.push({
        title: title,
        img: img
      });
    }

    var comments = [];
    for (var i = 0; i < data.comments.length; i++) {
      var comment = data.comments[i];
      var name = comment.maker.nickname;
      var img = comment.maker.avatar.icon.url;
      comments.push({
        html: comment.html,
        name: name,
        img: img
      });
    }

    var projectInfo = {
      title: data.project.title,
      image: data.project.clips[0].assets.base.url,
      date: monthMap[date.getMonth()] + ' ' + date.getDay() + ", " + date.getFullYear(),
      makerName: data.project.maker.nickname,
      makerAvatar: data.project.maker.avatar.icon.url,
      achievements: achievements,
      numComments: comments.length,
      comments: comments
    };
    res.render('project', projectInfo);
  }
};
