// var sign = document.querySelector("#sign button");
// var login = document.querySelector("#login button");

// sign.addEventListener("click", function(){
// 	document.location.href = 'formquiz.html';
// });
// login.addEventListener("click", function(){
// 	document.location.href = 'sign.html';
// });
// $("#sign button").click(function(event){
// 	$(location).attr('href',"formquiz.html");
// });
// $("#login button").click(function(event){
// 	$(location).attr('href',"sign.html");
// });
$(document).ready(function(){
  $(".link").click(function(){
    $("#lightbox, #lightbox-panel").fadeIn(300);
  });
    $("#lightbox-panel span").click(function(){
    $("#lightbox, #lightbox-panel").fadeOut(300);
  })
});
$(".faculty").click(function(event){
	$("#lightbox-panel").addClass("faculty");
	$(".sign").click(function(event){
		window.location = './formfac.html';
 	});
	$(".login").click(function(event){
 		window.location = './signfac.html';
 	});
});
$("#lightbox-panel span").click(function(event){
	$("#lightbox-panel").removeClass("faculty");
});
$(".student").click(function(event){
	$("#lightbox-panel").addClass("student");
	$(".sign").click(function(event){
 		window.location = './formstu.html';
 	});
	$(".login").click(function(event){
 		window.location = './signstu.html';
 	});
});
$("#lightbox-panel span").click(function(event){
	$("#lightbox-panel").removeClass("student");
});