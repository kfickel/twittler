//import timeago from 'timeago.js';
//var timeago = require("timeago.js");
$(document).ready(function() {
  var $body = $('#tweetles');
  $body.html('');
  var index = streams.home.length - 1;
    while (index >= 0){
    var timestamp = new Date();
    var tweet = streams.home[index];
    var $tweet = $('<p id="tweet"></p>');
    var $twittlename = $('<div class="tweetles" id="username"></div>');
    var $time = $('<p id="time"></p>');
    $tweet.text(tweet.message);
    $time.text(' timestamp ' + timestamp.getHours() + ' : ' + timestamp.getMinutes() + ' : ' + timestamp.getSeconds());
    $twittlename.text('@' + tweet.user + ': \n');
    $twittlename.prependTo($body);
    $tweet.appendTo($twittlename);
    $time.appendTo($twittlename);
    index -= 1;
  }     



  var hashObj={};
  var objLength = 0;
  $(".tweetles#username").each(function(){
    var tweetles = $(this).text();
    for(var i = 0; i < tweetles.length; i++){
      var hashSearch = tweetles.slice(i, i+1)
      if(hashSearch === '#'){
        var hashWord = ' '
        for(var j = i; j < tweetles.length; j++){
          if(tweetles[j] === ' '){
            hashWord = tweetles.slice(i + 1, j);
            j = tweetles.length;
            i = tweetles.length;
          }
        }
        if(hashWord === ' '){
          hashWord = tweetles.slice(i + 1, tweetles.length);
        }
        if(!hashObj[hashWord]){
          hashObj[hashWord] = 1;
          objLength++;
        }
        hashObj[hashWord]++;
      }
    }
  });

  var sortedHashObj={};
  var highestHashCount={none: 0};
  while(objLength > 0){
    for(var key in hashObj){
      for(var highKey in highestHashCount) {
        if(hashObj[key] > highestHashCount[highKey]){
          delete highestHashCount[highKey];
          highestHashCount[key] = hashObj[key];
        } 
      } 
    }
    for(var highKey in highestHashCount) {
      sortedHashObj[highKey] = highestHashCount[highKey];
      delete hashObj[highKey];
      highestHashCount={none: 0};
    }
    objLength--;
  }

  for(var key in sortedHashObj) {
    var $trend = $('<div class="trend"></div>');
    $trend.text('#' + key + ' - ' + sortedHashObj[key]);
    $trend.appendTo($('#trends'));
  }



  $('.update').on('click', 'button', function(event) {
    $("#viewpoint").text('twittler feed');
    $("#searchresults").empty();
    $("#specificuser").empty();
    $("#tweetles").show();
  }); 



  $("#tweetles").on('click', ".tweetles#username", function() {
    $(this).removeClass("highlight");
    var clickedUser = $(this).clone().children().remove().end().text();
    $("#viewpoint").text(clickedUser);
    $(".tweetles#username").each(function(){
      $(this).addClass($(this).clone().children().remove().end().text());
        if(clickedUser === $(this).clone().children().remove().end().text()){
         $(this).clone().appendTo("#specificuser");
        }
    });
    $('#tweetles').hide();
  });



  $("#tweetles").on('mouseenter', ".tweetles#username", function() {
    $(this).addClass("highlight");
  });



  $("#tweetles").on('mouseleave', ".tweetles#username", function() {
    $(this).removeClass("highlight");
  });



  $("#searchbutton").on('click', function(){
    $('#tweetles').hide();
    $("#searchresults").empty();
    var searchResult = $('#search').val();
    $(".tweetles#username").each(function(){
      var tweet = $(this).text();
      for(var i = 0; i < tweet.length; i++) {
         var tweetSearch= tweet.slice(i, i + searchResult.length);
         if(tweetSearch === searchResult){
           console.log(searchResult);
           $(this).clone().appendTo("#searchresults");
           i = tweet.length;
         }
      }
    })
  }); 


  $("#usertweetsubmit").on('click', function(){
    var userTimestamp = new Date();
    var userTweet = $("#usertweet").val();
    var $usertweet = $('<p id="tweet"></p>');
    var $usertwittlename = $('<div class="tweetles" id="username"></div>');
    var $usertime = $('<p id="time"></p>');
    $usertweet.text(userTweet);
    $usertime.text(' timestamp ' + userTimestamp.getHours() + ' : ' + userTimestamp.getMinutes() + ' : ' + userTimestamp.getSeconds());
    $usertwittlename.text( $("label[for='userhandle']").text() + ': \n');
    $usertwittlename.prependTo($('#tweetles'));
    $usertweet.appendTo($usertwittlename);
    $usertime.appendTo($usertwittlename);
  })    

});