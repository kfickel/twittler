$(document).ready(function() {
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
    console.log('j');
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


  $(".tweetles#username").on('click', function() {
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

  $(".tweetles#username").on('mouseenter', function() {
    $(this).addClass("highlight");
  });

  $(".tweetles#username").on('mouseleave', function() {
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

  });