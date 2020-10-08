/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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

  $('form').submit(function(event) {
    event.preventDefault();
    $('.error').slideUp();
    const triangle = '<i class="fas fa-exclamation-triangle"></i>';
    const tweetLength = $('#tweet-text').val().length
      if (tweetLength > 140) {
        const errorText = `${triangle}This tweet is too long!${triangle}`;
        $('.error').html(errorText);
        $('.error').slideDown();
     } else if (tweetLength === 0) {
        const errorText = `${triangle}You need to type something to tweet!${triangle}`;
        $('.error').html(errorText);
        $('.error').slideDown();
     } else {
       const data = $(this).serialize();
      $.ajax({
      url: "/tweets",
      method: "POST",
      data 
      }).then(function(data) {
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
                    <div>${escape(tweet.content.text)}</div>
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

 const newTweet = function() {
   
 }

});

