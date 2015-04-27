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