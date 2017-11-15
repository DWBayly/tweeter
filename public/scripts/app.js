/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//Escape string function
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
  $date.append("<div>" + Math.floor(((new Date) - data.created_At) / 1000 / 60 / 60 / 24) + " days ago</div>");
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
    $tweets.append(createTweetElement(tweets[x]));
  }
  return $tweets;
}
// Test / driver code (temporary). Eventually will get this from the server.
var tweetData =  [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_At": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_At": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_At": 1461113796368
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "<script>alert('uh oh!');</script>"
    },
    "created_At": 1461113796368
  }
];


// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like



$(document).ready(function(){
  $(function() {
    var on = true;
    var compose = $("#compose");
    compose.on('click', function () {
      console.log("compose clicked" + on);
      if(on){
        $(".new-tweet").hide();
        on = false;
      }else{
        $(".new-tweet").show();
        $("#tweetinput").select();
        on=true;
      }
    });
  });
  $(function() {
    $("#tweetSubmit").on('click', function () {
      //console.log('Button clicked, performing ajax call...');
      event.preventDefault();
      data = {
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
        
      }
    });
  });
  function loadTweets() {
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      success: function (tweetdata) {
        var $tweets = renderTweets(tweetdata);
        $('#feeder').append($tweets);
      }
    });
  }
  loadTweets();
});