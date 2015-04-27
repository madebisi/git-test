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

//////////////////////////////////////////////////////////////////////////////////// Registration steps process	

function registrationCtrl($scope) {

	var regStep = 1;

	$scope.regProgress = function(regStep) {

		if (regStep == 1){

			document.getElementById("mm_regFormSection1").className = "active";
			document.getElementById("mm_regFormSection2").className = "";
			document.getElementById("mm_regFormSection3").className = "";

			document.getElementById("mm_regFormIntroText1").className = "active";
			document.getElementById("mm_regFormIntroText2").className = "";
			document.getElementById("mm_regFormIntroText3").className = "";

		    elements1 = document.getElementsByClassName("mm_regStepSection1");
			for (var i = 0; i < elements1.length; i++) {elements1[i].className = "mm_regStepSection1 white";}
			elements2 = document.getElementsByClassName("mm_regStepSection2");
			for (var i = 0; i < elements2.length; i++) { elements2[i].className = "mm_regStepSection2 grey";}
			elements3 = document.getElementsByClassName("mm_regStepSection3");
			for (var i = 0; i < elements3.length; i++) { elements3[i].className = "mm_regStepSection3 grey";}
		}

		if (regStep == 2){

			document.getElementById("mm_regFormSection1").className = "";
			document.getElementById("mm_regFormSection2").className = "active";
			document.getElementById("mm_regFormSection3").className = "";

			document.getElementById("mm_regFormIntroText1").className = "";
			document.getElementById("mm_regFormIntroText2").className = "active";
			document.getElementById("mm_regFormIntroText3").className = "";

			elements1 = document.getElementsByClassName("mm_regStepSection1");
			for (var i = 0; i < elements1.length; i++) { elements1[i].className = "mm_regStepSection1 white";}
			elements2 = document.getElementsByClassName("mm_regStepSection2");
			for (var i = 0; i < elements2.length; i++) {elements2[i].className = "mm_regStepSection2 white";}
			elements3 = document.getElementsByClassName("mm_regStepSection3");
			for (var i = 0; i < elements3.length; i++) {elements3[i].className = "mm_regStepSection3 grey";}
		}

		if (regStep == 3){

			document.getElementById("mm_regFormSection1").className = "";
			document.getElementById("mm_regFormSection2").className = "";
			document.getElementById("mm_regFormSection3").className = "active";

			document.getElementById("mm_regFormIntroText1").className = "";
			document.getElementById("mm_regFormIntroText2").className = "";
			document.getElementById("mm_regFormIntroText3").className = "active";

			elements1 = document.getElementsByClassName("mm_regStepSection1");
			for (var i = 0; i < elements1.length; i++) {elements1[i].className = "mm_regStepSection1 white";}
			elements2 = document.getElementsByClassName("mm_regStepSection2");
			for (var i = 0; i < elements2.length; i++) { elements2[i].className = "mm_regStepSection2 white";}
			elements3 = document.getElementsByClassName("mm_regStepSection3");
			for (var i = 0; i < elements3.length; i++) { elements3[i].className = "mm_regStepSection3 white";}
		}

		if (regStep == 4){
			alert("checkForm");
		}
	}
}
// ----------------------------------------------------------------------