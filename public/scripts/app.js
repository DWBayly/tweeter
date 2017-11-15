/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 
 function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
 createTweetElement=function(data){
  var $tweet = $('<article>').addClass('tweet');
  var $header = $('<section>').addClass('header');
  $header.append("<img scr = \'"+data.user.avatars.regular+"\' >");
  $header.append("<h2>"+data.user.name+ "<div class = \"tweetername\">"+data.user.handle+"</div></h2>");
  $tweet.append($header);
  var $footer = $('<section>').addClass("footer");
  $footer.append("<div class = \'tweettext\' >"+escape(data.content.text)+"</div>");
  $tweet.append($footer);
  var $date = $('<section>').addClass("date");
  
  $date.append("<div>"+Math.floor(((new Date) -data.created_at)/1000/60/60/24)+" hours ago</div>");
  $date.append("<div class = \'buttons\'><input type=\"image\" src=\"FLAG.jpg\" /><input type=\"image\" src=\"RETWEET.jpg\" /><input type=\"image\" src=\"LIKE.png\" /></div>");
  $tweet.append($date);
  /*<article class = "tweet">
      <section class = 'header'>
         <img src="test.jpg" >
         <h2>TweeterNameHere
         <div class = "tweetername">@tweetnamehere</div>
         </h2>
      </section>
      <section class = 'footer'>
        <div class = "tweettext">What are you humming about?</div>
      </section>
      <section class = 'date'>
        <div>10 days ago</div>
        <div class = 'buttons'>
        <input type="image" src="FLAG.jpg" />
        <input type="image" src="RETWEET.jpg" />
        <input type="image" src="LIKE.png" />
        </div>
      </section>
    </article>';*/
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
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  },
  {
  "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "<script>alert('uh oh!');</script>"
    },
    "created_at": 1461113796368
  }
]


// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like

$(document).ready(function(){
  var $tweets = renderTweets(tweetData);
  $('#feeder').append($tweets);
  //console.log($tweet); 
});