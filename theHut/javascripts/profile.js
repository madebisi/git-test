//////////////////////////////////////////////////////////////////////////////////// Profile
document.getElementById("emailEdit").style.display = "none";
document.getElementById("detailsEdit").style.display = "none";

var seeEmailForm = false;
var seeDetailsForm = false;

function myAccountCtrl($scope) {

	$scope.switchEmailForm = function(){

		if (seeEmailForm == false){ // OPEN UP

			$( "#emailView" ).fadeOut( "fast", function() {
				$( "#emailEdit" ).fadeIn( "fast", function() {
				});
			});

		} else if (seeEmailForm == true){ //CLOSE IT
			$( "#emailEdit" ).fadeOut( "fast", function() {
				$( "#emailView" ).fadeIn( "fast", function() {
				});
			});
		}
		seeEmailForm = !seeEmailForm;
	}

	$scope.switchDetailsForm = function(){

		if (seeDetailsForm == false){ // OPEN UP
			$( "#detailsView" ).fadeOut( "fast", function() {
					$( "#detailsEdit" ).fadeIn( "fast", function() {
				});
			});

		} else if (seeDetailsForm == true){ //CLOSE IT
			$( "#detailsEdit" ).fadeOut( "fast", function() {
				$( "#detailsView" ).fadeIn( "fast", function() {
				});
			});
		}
		seeDetailsForm = !seeDetailsForm;
	}
}