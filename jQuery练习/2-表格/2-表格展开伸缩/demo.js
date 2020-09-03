$(function(){
	$(".parent").addClass("even");
	$("tr.parent").click(function(){
		$(this).toggleClass("selected")
			.siblings(".child_"+this.id).toggle();
	})
});