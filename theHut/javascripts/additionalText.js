$(document).ready(function(){

	// More text available?
	var moreInfoParagraph = $("article div[data-additional-text]");
	var moreInfoToggle = moreInfoParagraph.attr("data-additional-text");

	// If more text available show button
	if(moreInfoToggle){
		$('.button.more-info').addClass('showMe');
	}

	// Global variables
	var openView;

// Slide/fade into view
$( '.button.more-info' ).click(function() {
	
	var _this = $(this);
	// console.info(openView)

	// console.log(moreInfoParagraph)
	$(moreInfoParagraph).animate({
		height:"toggle",
		opacity:"toggle"}, {
			duration:1400, 
			complete: function(){
				var arrow = _this;
				var arrorB = arrow.context;

				if(openView){
					// $(arrow).next().animate({
					// 	opacity:"hide"
					// });

				_this.removeClass("icon-arrow-up")
				_this.addClass("icon-arrow-down")
				openView = false;
					// $(arrow).next().animate({
					// 	opacity:"show"
					// });

				}else{
					// console.log("up")
					// $(arrow).next().animate({
					// 	opacity:"hide"
					// });
				_this.removeClass("icon-arrow-down")
				_this.addClass("icon-arrow-up")
				openView = true;	
					// $(arrow).next().animate({
					// 	opacity:"show"
					// });
				}

				// Apply transition
				
			}
		});
	});
});