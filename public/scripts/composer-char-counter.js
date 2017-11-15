console.log("Made it!");
console.log($(".counter").text());
counter = 140;
$(document).ready(function(){
  $(".new-tweet").on('keyup', function(event){
    counter = 140 - $("#tweetinput").val().length;
    $(".counter").text(counter);
    if(counter < 0){
      $(".counter").css('color', 'red');
    }else{
      $(".counter").css('color', 'black');
    }
  });
});