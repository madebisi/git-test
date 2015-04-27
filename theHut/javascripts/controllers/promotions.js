var myApp = angular.module('nevada-ui',['ui.directives','ui.bootstrap']);

myApp.controller( 'PromotionDetail', function PromotionDetail($scope, $http, discountedProductTransformer, 
              rewardTypeProvider, productProvider, savePromotionProvider, 
              retrievePromotionProvider, promotionTypeProvider, actOnPromotion, processLotteryNumber, $dialog, nevadaImageProvider, imageListTransformer) {

	var showForm = false;
	var showPromotionAction = false;

	$scope.showWeeks = true;
	$scope.promotionTypes = [];
	$scope.savedSuccess = '';
	$scope.uniqueCodesRequired="Minimum number of <br> unique codes required";
	$scope.numberOfUniqueCodesGenerated="Number of unique codes <br> to be generated";
	$scope.maxCharacter="Maximum number <br> of characters: 100";
	$scope.currentStatus = 'Current';
	$scope.memberTemplate = {};
	$scope.memberTemplate.url = 'member.html';
	$scope.newMemberTemplate = {};
	$scope.newMemberTemplate.url = 'member_new.html';
	$scope.lotteryTemplate = {};
	$scope.lotteryTemplateSelected = true;
	$scope.lottoTemplate = {};
	$scope.lottoTemplate.url = 'lotto.html';
	$scope.lottoParameterTemplate = {};
	$scope.lottoParameterTemplate.url = 'lotto_parameter.html';
	$scope.promotionTemplate = $scope.promotionTypes[0];
	$scope.rewardTypes = [];
	$scope.rewardTemplate = {}; 
	$scope.discountedRewards = [{}];
	$scope.discountedReward = {};
	$scope.promotionModel = {};
	$scope.promotionError = {};
	$scope.imageList = {};
	$scope.imageList.highlightImageId;
	$scope.imageList.standardImageId;
	$scope.imageList.logoImageId;
	$scope.highlightSelected = false;
	$scope.standardSelected = false;
	$scope.logoSelected = false;
	
	$scope.highlightImages = nevadaImageProvider.getImagesForCategory('Highlight');
	$scope.standardImages = nevadaImageProvider.getImagesForCategory('Standard');
	$scope.logoImages = nevadaImageProvider.getImagesForCategory('Logo');
	
	$scope.productRewards = productProvider.getProductRewards();
	
	promotionTypeProvider.retrieve().then(function(data) {
		$scope.promotionTypes=data;
	});
	
	$scope.toggleWeeks = function () {
    	$scope.showWeeks = ! $scope.showWeeks;
    };
   
    $scope.clear = function () {
    	$scope.dt = null;
    };

    $scope.disabled = function(date, mode) {
    	return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
    	$scope.minDate = ( $scope.minDate ) ? null : new Date();
	};
	
	$scope.toggleMin();
	
	$scope.showForm = function() {
		return showForm;
	};
	
	$scope.resetImageSelect = function(imageCategory) {
		if (imageCategory == 'Highlight') {
			$scope.imageList.highlightImageId = '0';
			$scope.highlightSelected = false;
		} 
		else if (imageCategory == 'Standard') {
			$scope.imageList.standardImageId = '0';
			$scope.standardSelected = false;
		}
		else if (imageCategory == 'Logo') {
			$scope.imageList.logoImageId = '0';
			$scope.logoSelected = false;
		}
	};
	
	$scope.onChangeHighlightImageSelect = function() {
		if ($scope.imageList.highlightImageId.imageId > '0') {
			$scope.highlightSelected = true;
		} 
	};
	
	$scope.onChangeStandardImageSelect = function() {
		if ($scope.imageList.standardImageId.imageId > '0') {
			$scope.standardSelected = true;
		}
	};
	
	$scope.onChangeLogoImageSelect = function() {
		if ($scope.imageList.logoImageId.imageId > '0') {
			$scope.logoSelected = true;
		}
	};
	
	$scope.showResultMessage = function() {
		var  showResultMessage = false;
    	if($scope.savedSuccess == "Saved Successfully") {
              showResultMessage = true;
       }
       return showResultMessage;
    };

    $scope.showPromotionDeleteAction = function(promotion) {
    	showPromotionAction = false;
    	if(promotion.enabled && !promotion.expired) {
    	   showPromotionAction = true;
    	}
    	return showPromotionAction;
    };

    $scope.showPromotionEnableAction = function(promotion) {
    	showPromotionAction = false;
    	if(!promotion.enabled && !promotion.expired) {
    		showPromotionAction = true;
    	}
    	return showPromotionAction;
    };

    $scope.showPromotionGetCodeAction = function(promotion) {
    	showPromotionAction = false;
    	if(promotion.enabled == true && promotion.transferStatus != null && promotion.transferStatus == 'TRANSFERRED' ) {
    		showPromotionAction = true;
    	}
    	return showPromotionAction;
    };

	$scope.showFuturePromotions = function(promotion){
		var showfuturePromotion = false;
		if(!promotion.enabled && !promotion.expired && currentStatus == 'Future') {
			showfuturePromotion = true;
		}
		return showfuturePromotion;
    };

	$scope.showPromotionLotteryAction = function(promotion){
		showPromotionAction = false;
		if(promotion.lotteryPromotion && !promotion.lotteryCSVStatus){
			showPromotionAction = true;
		}
		return showPromotionAction;
	 };

	$scope.$watch('promotionTemplate', function() {
		if($scope.promotionTemplate != null && $scope.promotionTemplate.name != null) {
			rewardTypeProvider.retrieve($scope.promotionTemplate.name).then(function(data) {
				
				$scope.rewardTypes = data;
				$scope.rewardTemplate = {};
				
				if($scope.promotionTemplate.name == 'FREQUENCY_PROMOTION') {
			    	 $scope.promotionModel.consequent = $scope.promotionModel.days;
				} 
				
				if($scope.promotionTemplate.name != 'FREQUENCY_PROMOTION') {
					$scope.promotionModel.consequent = '';
				}
			});
		}
	});

	$scope.enabledClass = function(value) {
		if(value) {
			return "icon-ok show-on-site";
		} else {
			return "icon-remove off-sale";
		}
	};
 
	$scope.submitPromotion = function() {  
		$scope.promotionModel.promotionType = $scope.promotionTemplate.promotionTypeId;
		$scope.promotionModel.rewardType = $scope.rewardTemplate.rewardTypeId;
		$scope.promotionModel.discountedProducts = discountedProductTransformer.transform($scope.discountedRewards);
		
		if ($scope.promotionModel.promotionType == 2) {
			$scope.promotionModel.imageList = imageListTransformer.transform($scope.imageList);
		}
		
		savePromotionProvider.save($scope.promotionModel, $scope.promotionError).then(function(){   
			$scope.promotionError = {};
			$scope.savedSuccess = "Saved Successfully";
			$scope.promotionModel = {};
			$scope.promotionTemplate = {};
			$scope.rewardTemplate = {};
			showForm = false;
		},
		function(data){      
	    	 $scope.promotionError = data;
		});
	};

	$scope.addDiscountRewardProduct = function() {
		$scope.discountedRewards.push({});
	};

	$scope.removeDiscountRewardProduct = function(idx) {
		$scope.discountedRewards.splice(idx, 1);
	};

	$scope.createPromotion = function() {
		$scope.promotionModel = {};
		$scope.promotionTemplate = {};
		$scope.rewardTemplate = {};
		showForm = true;
	};

	$scope.showPromotions = function(selectedPromotion) {
		$scope.currentStatus = selectedPromotion;
		showForm = false;
		retrievePromotionProvider.retrieve($scope.currentStatus).then(
			function(data) {
				$scope.promotions = data;
			},
			function() { 
				$scope.promotions = {};
			}
		);
	};

	$scope.openLottoMessageBox = function(promotion) {
		var number =  prompt('Please enter the winning Lottery Number: ');
		var successMsg = 'Promotion: ' + promotion.promotionName+ ' has the winning Lottery Number: ' + number; 

		if (number != null && number != "" && number.length == 12) {
			processLotteryNumber.save(promotion,number).then(function() {
				alert(successMsg);
			});
		} else {
			alert('Please enter valid lottery number, must be 12 digits');
		}	 
	};

	$scope.openMessageBox = function(promotion, action) {
		var title = 'Enable Promotion';
		var msg = 'Are you sure you want to enable promotion: '+promotion.promotionName;
		var successMsg = 'Promotion: ' + promotion.promotionName+ ' has been successfully enabled';

		if (action=='disable') {
			title = 'Delete Promotion';
			msg = 'Are you sure you want to delete promotion: '+promotion.promotionName;
			successMsg = 'Promotion: ' + promotion.promotionName+ ' has been successfully deleted';
		}

        var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary'}];

        $dialog.messageBox(title, msg, btns)
        	.open()
        	.then(function(result) {
        		if(result=='ok') {
        			actOnPromotion.disable(promotion, action).then(function() {
        				alert(successMsg);
    					retrievePromotionProvider.retrieve($scope.currentStatus).then(
							function(data) {
								$scope.promotions = data;
							},
							function() {
								$scope.promotions = {};
							});
        			});
                }
        	});
      };
});

myApp.factory('actOnPromotion', function($http, $q) {
	return{
		disable:function(promotion, action) {
			var deferred = $q.defer();
			$http({
				url: '/nevada/promotions/'+promotion.promotionId+'/action/'+action,
				method: "POST"
			})
			.success(function(data, status, headers, config) {
				deferred.resolve();
			});
			return deferred.promise;
		}
	};
});

myApp.factory('processLotteryNumber', function($http, $q) {
    return {
    	save:function(promotion, number) {
    		var deferred = $q.defer();
			$http({
				url: '/nevada/promotions/'+promotion.promotionId+'/lotteryNumber/'+number,
				method: "POST"
			})
			.success(function(data, status, headers, config) {
				deferred.resolve();
			});
			return deferred.promise;
    	}
    };
});

myApp.service('nevadaImageProvider', function($http) {
	this.getImagesForCategory = function(category) {
		var imageList = [];
		$http({
			url: "/nevada/images/category/" + category + "?" + preventCache(),
			method: "GET"
		}).success(function(data, status, headers, config) {
			$.each(data, function(index) {
				var image = {};
				image.imageId = data[index].id;
				image.name = data[index].name;
				imageList.push(image);
			});
		});
		return imageList;
	};
});

myApp.service('productProvider', function($http) {
	this.getProductRewards = function() {
		var products = [];
		$http({
			url : "promotionProductRewardList?" + preventCache(),
			method : "GET"
		}).success(function(data, status, headers, config) {
			$.each(data, function(index) {
				var product = {};
				product.id = data[index].id;
				product.description = data[index].description;
				products.push(product);
             });
		});
		return products;
	};
});

myApp.service('imageListTransformer', function() {
	this.transform = function(imageList) {
		var imageIdList = [];
		if (typeof imageList.highlightImageId != 'undefined' && imageList.highlightImageId != '0') {
			imageIdList.push(imageList.highlightImageId.imageId);
		}
		if (typeof imageList.standardImageId != "undefined" && imageList.standardImageId != '0') {
			imageIdList.push(imageList.standardImageId.imageId);
		}
		if (typeof imageList.logoImageId != "undefined" && imageList.logoImageId != '0') {
			imageIdList.push(imageList.logoImageId.imageId);
		}
		return imageIdList;
	};
});

myApp.service('discountedProductTransformer', function() {
	this.transform = function(discountedRewards) {
		var discountedProducts = [];
		for(var index = 0; index < discountedRewards.length; index++) {
			var dr = discountedRewards[index];
			
			if(dr.rewardProduct != null) {
				var discountedProduct = {};
				discountedProduct.productId = dr.rewardProduct.id;
				discountedProduct.saleValue = dr.saleValue;
				
				if(discountedProduct.saleValue == "") {
					discountedProduct.saleValue = "0";
				}
				discountedProducts.push(discountedProduct);
			}
		};
		return discountedProducts;
	};
});

myApp.factory('savePromotionProvider', function($http, $q) {
	return {
		save:function(promotion, promotionError) {
			var deferred = $q.defer();
			$http({
				url: "promotions",
				method: "POST",
				data: promotion
			})
			.success(function(data, status, headers, config) {
				deferred.resolve();
			})
			.error(function(data, status, headers, config) {
				deferred.reject(data);
			});
			return deferred.promise;
		}
	};
});

myApp.factory('retrievePromotionProvider', function($http, $q) {
	return {
		retrieve:function(status) {
			var deferred = $q.defer();
			$http({
				url : "promotionsList?status=" + status +  "&" + preventCache(),
				method : "GET"
			}).success(function(data, status, headers, config) {
				deferred.resolve(data);
			}).error(function(data, status, headers, config) {
				deferred.reject();
			});
			return deferred.promise;
		}
	};
});

myApp.factory('rewardTypeProvider', function($http, $q) {
	return {
		retrieve:function(promotionType) {
			var deferred = $q.defer();
			var types = [];
			$http({
				url : "rewardTypes/" + promotionType + "?" + preventCache(),
				method : "GET"
			}).success(function(data, status, headers, config) {
				$.each(data, function(index) {
					var template = {};
					template.rewardTypeId = data[index].rewardTypeId;
					template.name = data[index].name;
					template.url = getRewardTemplate(data[index].rewardTypeId);
					types.push(template);
				});
				deferred.resolve(types);
			});
			return deferred.promise;
		}
	};
});

myApp.factory('promotionTypeProvider', function($http, $q) {
	return {
		retrieve:function() {
			var deferred = $q.defer();
			var types = [];
			$http({
				url : "promotionTypes?" + preventCache(),
				method : "GET"
			}).success(function(data, status, headers, config) {
				$.each(data, function(index) {
					var template = {};
					template.name = data[index].name;
					template.promotionTypeId = data[index].promotionTypeId;
					template.url = getPromotionTypeTemplate(data[index].promotionTypeId);
					types.push(template);
				});
				deferred.resolve(types);
			});
			return deferred.promise;
		}
	};
});

myApp.directive('hhmm', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attr, ngModel) {
			function fromUser(text) {
				return ('0000'+(text || '').replace(":","")).slice(-4);
			}	
			function toUser(text) {
				var time = ('0000'+(text || '')).slice(-4);
				return "{0}:{1}".format(time.substr(0,2), time.substr(2,2));
			}
			ngModel.$parsers.push(fromUser);
			ngModel.$formatters.push(toUser);
		}
	};
});

function preventCache() {
    return "preventCache="+Math.random();;
}

function getRewardTemplate(rewardType) {
	switch (rewardType) {
		case 1 : return "Reward_Template_Multiplier.html";
		case 2 : return "Reward_Template_Points.html";
		case 3 : return "Reward_Template_Discount.html";
		case 4 : return "Reward_Template_Content.html";
	}
}

function getPromotionTypeTemplate(promotionType) {
	switch (promotionType) {
		case 1 : return "Promotion_Template_CODE_PROMOTION.html";
		case 2 : return "Promotion_Template_FREQUENCY_PROMOTION.html";
	}
}

String.prototype.format = function() {
   var content = this;
   for (var i=0; i < arguments.length; i++) {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);  
   }
   return content;
};