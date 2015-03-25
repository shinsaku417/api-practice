$(function() {
  $('.comment-submit').click(function() {
    var comment = $('.comment-input').val();
    $('.comment-input').val('');

    var paths = window.location.pathname.split('/');
    var maker = paths[1];
    var id = paths[2];
    var url = 'http://api.diy.org/makers/' + maker + '/projects/' + id + '/comments';
    $.ajax({
      method: 'POST',
      url: url,
      headers: {
        'x-diy-api-token': 'eb87e3d09f01b834131d41608f80108e6d81c877'
      },
      data: {raw: comment}
    });
  });
});
