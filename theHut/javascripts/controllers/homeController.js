'use strict';

// DEFINE APP [dmgApp]
var dmgApp = angular.module('dmgApp', []);

// GLOBAL VARIABLES
/*************************************************************************************
URLS:
 - CURRENT PROMOTIONS: http://10.1.2.118:8080/WeekendClub/catalogue-api/promotions/editorsPick
 - LITTLE EXTRAS: http://10.1.2.118:8080/WeekendClub/catalogue-api/product/littleExtras
 - REWARDS: http://10.1.2.118:8080/WeekendClub/catalogue-api/rewards
*************************************************************************************/
var url = 'http://localhost/~stephenanderson/prototypes/WebSitePrototype/catalogue-api/';
var promise;
var myProducts = {};

/*********** CONTOLLERS ***********/
dmgApp.controller('dmgProductsCtrl', ['collectProductsData', 'createProd', '$scope', 'optimiseData', function(collectProductsData, createProd, $scope, optimiseData) {

	// DEFAULT: hardcoded
	var defaultUrl = url + "promotions/editorsPick";
	var associated = "promotions";
	
	// init:
	$scope.products = [];
	$scope.standard = [];

	// CSS $scope
	$scope.display = "none"; // Hide any element by applying {{display}} to class attribute

	// return the promise onload of page
	promise = collectProductsData.getJsonData(defaultUrl); 

	// DEFAULT: Promotions to be created once promise is returned
	promise.then(function(data){

		// suppress data to maximum of 4 products/items
		data = optimiseData.maximum(data);

		// DEFAULT: create [highlight] in $scope
		myProducts.createHighlight(data, associated);

		// DEFAULT: create [standard] in $scope
		myProducts.createStandard(data, associated);

	});

	// onclick: build tabbed content
	$scope.swapTabs = function(id){
		
		// chose to assign as new variables updatedUrl(url) & promiseUpdated(promise)
		var updatedUrl = url + modifyUrl(id);
		var promiseUpdated = collectProductsData.getJsonData(updatedUrl);

		$scope.id;

		promiseUpdated.then(function(data){

			if(id == "rewards"){

				// create standard block
				myProducts.createStandard(data, createProd.getTabId(id));

			}else{
				
				// suppress data to maximum of 4 products/items
				data = optimiseData.maximum(data);

				// create highlight block
				myProducts.createHighlight(data, createProd.getTabId(id));

				// create standard block
				myProducts.createStandard(data, createProd.getTabId(id));
			}
			
		})

	}

	// products/items to create [HOME_PAGE]
	myProducts = {

		// create highlights
		createHighlight: function(data, associated) {

			data.length > 0 ? $scope.display ="block" : $scope.display ="none";
			
			$scope.products[associated] = data[0];
			
		},

		// create standards
		createStandard: function(data, associated) {

			$scope.standard[associated] = []; // Clear

			if(associated != 'rewards'){data.splice(data, 1)};

			for (var i = 0; i < data.length; i++) {
				
				$scope.standard[associated].push(data[i]);

			};
			
		}

	};
	
}]);


/*********** FACTORY DIRECTIVES / SERVICES ************/
dmgApp.factory('collectProductsData', ['$http', '$q', function($http, $q) {

	// retrieve json data
	return {
    	getJsonData:function(url) {
    		
    		var deferred = $q.defer();

			$http({
				url: url + "?" + preventCache(),
				method: "GET",
			})
			.success(function(data, status, headers, config) {
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config){
				deferred.reject(data, status)
			});

			return deferred.promise;
    	}
    };

}]);

dmgApp.service('createProd', [ function() {

	// obtain the tab identifier name to create the content
	return {
  
        getTabId: function(id) {

            return(id); // e.g. littlExtras, editorsPick, rewards etc.
        }

	};

}]);

dmgApp.service('optimiseData', [function(){
	
	var maximumProducts = 4; // Maximum number of products
	var optimisedProducts;

	return {
		maximum: function(selectiveProducts){

			optimisedProducts = []; // Clear

			if( selectiveProducts.length > maximumProducts){
				
				for (var i = 0; i < maximumProducts; i++) {
				
					optimisedProducts.push(selectiveProducts[i]);

				};
				
				return optimisedProducts; // return optimised data

			}else{

				return selectiveProducts; // no data to optimise return data

			}
			
		}
	};

}]);


/*********** Standalone functions ***********/

// append to [url] - path to json
function modifyUrl(catalogueUrl) {
	switch (catalogueUrl) {
		case "littleExtras" : return "product/"+catalogueUrl; 
		case "editorsPick" : return "promotions/"+catalogueUrl;
		case "rewards" : return catalogueUrl;
	}
}

// do not cache
function preventCache() {
    return "preventCache="+Math.random();;
}

