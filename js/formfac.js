// var eve = document.querySelectorAll("#lform input");

// for(var i=0; i<eve.length; i++)
// {
// 	eve[i].addeventlistener("click", function(){
// 		eve[i].style.borderBottomColor = "rgb(94, 155, 255)";
// 	});
// }
$(".lform input").click(function(event){
	// $(this).css("border-bottom-color", "red");
	// $(this).css("border-bottom", "4px solid red");
	// console.log("clicked");
});
$("#submit").click(function(event){
	window.location = './teacher.html'
});