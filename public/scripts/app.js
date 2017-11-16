/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//Escape string function
"use strict";


function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(data){
  var $tweet = $('<article>').addClass('tweet');
  var $header = $('<section>').addClass('header');
  $header.append("<img scr = \'" + data.user.avatars.regular + "\' >");
  $header.append("<h2>" + data.user.name + "<div class = \"tweetername\">" + data.user.handle + "</div></h2>");
  $tweet.append($header);
  var $footer = $('<section>').addClass("footer");
  $footer.append("<div class = \'tweettext\' >" + escape(data.content.text) + "</div>");
  $tweet.append($footer);
  var $date = $('<section>').addClass("date");
  $date.append("<div>" + Math.floor(((new Date) - data.created_at) / 1000 / 60 / 60 / 24) + " days ago</div>");
  $date.append("<div class = \'buttons\'><input type=\"image\" src=\"FLAG.jpg\" /><input type=\"image\" src=\"RETWEET.jpg\" /><input type=\"image\" src=\"LIKE.png\" /></div>");
  $tweet.append($date);
  return $tweet;
}
function renderTweets(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  var $tweets = $("<section>");
  for(var x in tweets){
    $tweets.prepend(createTweetElement(tweets[x]));
  }
  return $tweets;
}
// Test / driver code (temporary). Eventually will get this from the server.

function loadTweets() {
  event.preventDefault();
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'GET',
    success: function (tweetdata) {
      var $tweets = renderTweets(tweetdata);
      $(".tweet").remove();
      $('#feeder').append($tweets);
    }
  });
}

// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like



$(document).ready(function(){
  $(".new-tweet").hide();
  $(function() {
    var compose = $("#compose");
    compose.on('click', function () {
      compose.hide();
      $(".new-tweet").show();
    });
  });
  $(function() {
    $("#tweetSubmit").on('click', function () {
      //console.log('Button clicked, performing ajax call...');
      event.preventDefault();
      if($("#tweetinput").val().length > 0 && $("#tweetinput").val().length < 141){
        var result = $.ajax({
          url: 'http://localhost:8080/tweets',
          method: 'POST',
          //body:{'data':$("#tweetinput").val()},
          data: $("#tweetinput").serialize(),
          success: function (tweetdata) {
            loadTweets();
            $("#tweetinput").val("");
          }
        });
        $("#compose").show();
        $(".new-tweet").hide();
        //console.log(result);
      }else{
        $("#tweetSubmit").append("<script>alert('invalid input length!');</script>");
      }
    
    });
    /*  var data = {
        "user": {
          "name": "Default David",
          "avatars": {
            "small": "test.jpg",
            "regular": "test.jpg",
            "large": "test.jpg"
          },
          "handle": "@basick"
        }
      };
      //Lint error here,
      data.created_At = new Date();
      if($("#tweetinput").val().length > 0 && $("#tweetinput").val().length < 141){
        data.content = {"text": $("#tweetinput").val()};
        $(".new-tweet").after(createTweetElement(data));
        $("#tweetinput").val("");
      }else{
        $("#tweetSubmit").append("<script>alert('invalid input length!');</script>");
      }*/
    
  });
  
  

  
  
  //Old code for get tweets, kept in case of stupidity
  loadTweets();
  
  
});