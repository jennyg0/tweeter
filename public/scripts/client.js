/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  

  $('form').submit(function(event) {
    event.preventDefault();
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: $(this).serialize()
  }).then(() => {
    console.log($(this).serialize());
  })
  });

 const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $output = createTweetElement(tweet)
    $('#tweets-container').append($output);
  }
 };

 const createTweetElement = function(tweet) {
  const $tweet = $(`<article>
                    <header>
                      <img class="resize" src="${tweet.user.avatars}">
                      <span>${tweet.user.name}</span>
                      <span class="name">@SirIsaac</span>
                    </header>
                    <div>${tweet.content.text}</div>
                    <footer>
                      <span> ${timeStamp(tweet.created_at)}</span>
                      <span>
                        <i class="fas fa-flag"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                      </i></span>
                    </footer>
                  </article>`);
  return $tweet;
 }

 const timeStamp = function(time) {
   return Date(time);
 }
 const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET"
  }) .then ((tweets) => {
    renderTweets(tweets);
  })
};

 loadTweets();
 //renderTweets(data);
});

