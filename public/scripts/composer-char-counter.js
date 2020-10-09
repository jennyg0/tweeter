//change counter value depending on length of tweet input
$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let charLength = $(this).val().length;
    if (charLength > 140) {
      $(this).siblings().children('.counter').text(`${-(charLength - 140)}`).addClass('negative');
    } else {
      $(this).siblings().children('.counter').text(`${140 - charLength}`).removeClass('negative');
    } 
  });
});