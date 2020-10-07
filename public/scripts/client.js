/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }) .then ((tweets) => {
      renderTweets(tweets);
    })
  };
  
  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault();
    const tweetLength = $('#tweet-text').val().length
      if (tweetLength > 140) {
      alert("This tweet is too long!");
     } else if (tweetLength === 0) {
      alert("You need to type something to tweet!");
     } else {
       const data = $(this).serialize();
      $.ajax({
      url: "/tweets",
      method: "POST",
      data 
      }).then(function(data) {
        // $('tweet-text').replaceWith(loadTweets())
        loadTweets();
      })
    }
    })
  

 const renderTweets = function(tweets) {
  $('#tweets-container').html("");
  for (const tweet of tweets) {
    const $output = createTweetElement(tweet)
    $('#tweets-container').prepend($output);
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

});

