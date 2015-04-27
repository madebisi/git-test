
//////////////////////////////////////////////////////////////////////////////////// Account History

var lis = document.querySelectorAll('article.mm_historyList');
for (var i=0,len=lis.length;i<len;i++){
	if (i%2 == 0){
	lis[i].className = 'mm_historyList odd';
    }
}
console.log("start")
function itemCtrl($scope) {

	$scope.togMessage = "View Details";

	$scope.seeDetails = function(){
		
		 $scope.open = !$scope.open;

		 if ($scope.open == false){
		 	$scope.togMessage = "View Details";
		 }
		 if ($scope.open == true){
		 	$scope.togMessage = "Hide Details";
		 }
	}
}

function pointsCtrl($scope) {

	var panelOpen = true;

	$scope.openPanel = function(){

		if (panelOpen == true){

			document.getElementById("pointTable").style.height="0px";
			document.getElementById("pointTable").style.overflow="hidden";
			document.getElementById("pointsToggle").style.overflow="hidden";

			document.getElementById("pointsToggle").className = "mm_pointsCircle closed";
			

		} else if (panelOpen == false){

			document.getElementById("pointTable").style.height="auto";
			document.getElementById("pointTable").style.overflow="visible";

			document.getElementById("pointsToggle").className = "mm_pointsCircle open";
		}

		panelOpen = !panelOpen;
	}
}

function historyCtrl($scope) {
	var panelOpen = true;

	$scope.openPanel = function(){

		if (panelOpen == true){

			document.getElementById("historyTable").style.height="0px";
			document.getElementById("historyTable").style.overflow="hidden";

			document.getElementById("historyToggle").className = "mm_pointsCircle closed";

		} else if (panelOpen == false){

			document.getElementById("historyTable").style.height="auto";
			document.getElementById("historyTable").style.overflow="visible";

			document.getElementById("historyToggle").className = "mm_pointsCircle open";
		}

		panelOpen = !panelOpen;
	}
}

//////////////////////////////////////////////////////////////////////////////////// Profile



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

//////////////////////////////////////////////////////////////////////////////////// Manual Address Toggle

function addressCtrl($scope) {

	var open = false;

	$scope.openManualFields = function() {

		if (open == false){

			document.getElementById("mm_manualAddressFields").style.display="block";
			open = !open;

		} else if (open == true){
			document.getElementById("mm_manualAddressFields").style.display="none";
			open = !open;
		}
	}

}
// ----------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////// UNE Promotion Code Toggle

function promoCodeCtrl($scope) {

	var open = false;

	$scope.switchIt = function() {

		if (open == false){

			document.getElementById("mm_promoWindow1").style.display="none";
			document.getElementById("mm_promoWindow2").style.display="block";
			open = !open;

		} else if (open == true){
			document.getElementById("mm_promoWindow1").style.display="block";
			document.getElementById("mm_promoWindow2").style.display="none";
			open = !open;
		}
	}

}
// ----------------------------------------------------------------------