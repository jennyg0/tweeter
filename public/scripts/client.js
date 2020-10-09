/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //function to prevent cross-site scripting
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

  //submit tweet on click
  $('form').submit(function(event) {
    event.preventDefault();
    $('.error').slideUp();
    const triangle = '<i class="fas fa-exclamation-triangle"></i>';
    const tweetLength = $('#tweet-text').val().length;
    //check for tweet input over 140characters or empty, then show error
      if (tweetLength > 140) {
        const errorText = `${triangle}This tweet is too long!${triangle}`;
        $('.error').html(errorText);
        $('.error').slideDown();
     } else if (tweetLength === 0) { 
        const errorText = `${triangle}You need to type something to tweet!${triangle}`;
        $('.error').html(errorText);
        $('.error').slideDown();
     } else { //if no error, post tweet 
       const data = $(this).serialize();
      $.ajax({
      url: "/tweets",
      method: "POST",
      data 
      }).then(function(data) {
        loadTweets();
        //clear input and set counter back at 140
        $('#tweet-text').val('');
        $('#tweet-text').siblings().children('.counter').text('140');
      })
    }
    })
  

 const renderTweets = function(tweets) {
  //clear the container so tweets don't double post upon submit
  $('#tweets-container').html("");
  for (const tweet of tweets) {
    const $output = createTweetElement(tweet);
    $('#tweets-container').prepend($output);
  }
 };

 //creates the html for the tweet
 const createTweetElement = function(tweet) {
  const $tweet = $(`<article>
                    <header>
                      <img class="resize" src="${tweet.user.avatars}">
                      <span>${tweet.user.name}</span>
                      <span class="name">${tweet.user.handle}</span>
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

 //changes the time to a date
 const timeStamp = function(time) {
   let date = new Date(time).toUTCString().slice(0,16);
   return date;
 }

 //toggle the new tweet form when pressing the 'write new tweet' button
 let showSubmitTweets = false;
 $('.compose').click(function(event) {
    if (showSubmitTweets) {
      $('.new-tweet').slideDown();
      $('#tweet-text').focus();
      showSubmitTweets = false;
    } else {
      $('.new-tweet').slideUp();
      showSubmitTweets = true;
    }
 })

});

