$("#lform input").click(function(event){
	$(this).css("border-bottom-color", "rgb(94, 155, 255)");
});
$("#target").submit(function(event){
	window.location = './teacher.html';
});