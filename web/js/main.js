function getPhotos(target, paramString){
	$.ajax({
		url: "http://api.tumblr.com/v2/blog/iambradleymanning.tumblr.com/posts?api_key=3L0eVSusQgAxs5XPAeqz55XxylQpOGUVedFh2I02UC8dusC5jS&limit=10"+paramString,
		dataType: 'jsonp',
		success: function(results){
			results.response.posts.forEach(function(post){
		    if(post.type == "photo"){
		      post["photos"].forEach(function(photo){
            $("#photo-feed .feed ."+target).append("<div class='box'><a href='"+post.post_url+"'><img src='"+photo.alt_sizes[0].url+"'></a></div>");
  		    });	
		    }
			});
			$("#photo-feed .feed ."+target).siblings().hide();
			$("#photo-feed .feed ."+target).show();
			$("#photo-feed .feed ."+target).imagesLoaded(function(){
		    $("#photo-feed .feed ."+target).masonry({
		      itemSelector: '.box'
		    });
      });
		}
	});
}


$(function(){

  getPhotos("featured", "&tag=notables");
  

  $("#photo-feed .nav-links li a").click(function(e){
    var option = $(this).data("option");
    $("#photo-feed .nav-links .selected").removeClass("selected");
    $(this).addClass("selected");
    //$("#photo-feed .feed > div").html("");
    switch(option){
    	case "recent":
        if($("#photo-feed .feed ."+option+" .box").length == 0){getPhotos("recent", "");} else {$("#photo-feed .feed ."+option).show(); $("#photo-feed .feed ."+option).siblings().hide();}
        break;
      case "featured":
        if($("#photo-feed .feed ."+option+" .box").length == 0){getPhotos("featured", "&tag=notables");} else {$("#photo-feed .feed ."+option).show(); $("#photo-feed .feed ."+option).siblings().hide();}
        break;
      case "veterans":
        if($("#photo-feed .feed ."+option+" .box").length == 0){getPhotos("veterans", "&tag=veterans");} else {$("#photo-feed .feed ."+option).show(); $("#photo-feed .feed ."+option).siblings().hide();}
        break;
    }
    return false;
	});	

});

