//change counter value depending on length of tweet input
$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let charLength = $(this).val().length;
    let counterLength = 140 - charLength;
    if (charLength > 140) {
      $(this).siblings().children('.counter').text(`${counterLength}`).addClass('negative');
    } else {
      $(this).siblings().children('.counter').text(`${counterLength}`).removeClass('negative');
    } 
  });
});
