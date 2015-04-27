
console.log(" 2")
var app = angular.module('app', []);

app.controller('MainCtrl',["$scope", "$http", function($scope, $http) {

    //// Set global default variables

  $scope.limitNum = 7;

  $scope.displayNum = $scope.limitNum;

  $scope.sortType = 'pointsCost';

  $scope.order = 'false';

  $scope.filterText = "Sort Points (low)";

  ////  get JSON data
  $http.get('../json/catalogue/items.json')

  .then(function(info){

    $scope.data = info.data;

    console.log($scope.data);

    ////  build highlight array to loop and check - every [limitNum]]th item is a highlight - this loop creates the array to check against
    var num = 0;

    $scope.highlight = [];
    $scope.highlight.push(num);

    for(var x = 1; x < $scope.data.length/$scope.limitNum; x++){
      num =  num + $scope.limitNum;
      $scope.highlight.push(num);

    };

  });

  ////  Sort and filter function

  $scope.reSort = function(s,o){

    $scope.sortType = s;

    $scope.order = o;

    if ((s == "pointsCost") && (o == "false")){$scope.filterText = "Sort Points (low)"};
    if ((s == "pointsCost") && (o == "true")){$scope.filterText = "Sort Points (high)"};
    if (s == "description"){$scope.filterText = "Sort Name (A-Z)"};

    $( ".holder" ).css("display", "none");

    $( ".holder" ).fadeIn(600).css("display", "normal");

  }

  $scope.loadMore = function(limit){

    

    if ($scope.displayNum >= $scope.data.length){

      $scope.displayNum = $scope.data.length;

    } else {

      $scope.displayNum = $scope.displayNum + $scope.limitNum;

      $scope.animateIn();

      $('html, body').animate({scrollTop: (jQuery(window).scrollTop() + 200)}, 400);
    }

  }

  $scope.animateIn = function(){

    for (var p = $scope.displayNum - $scope.limitNum + 1; p < $scope.displayNum+1; p++) {

      $(".panel-" + p).css("display", "none");
      $(".panel-" + p).fadeIn(600).css("display", "normal");

    }

  }

  $scope.getClass = function ($index, item) {

    if(jQuery.inArray($index, $scope.highlight)!==-1){

      return ("large-12 block-editors-p");

    } else {

      return ("large-6 block-standard");
    }
  }

  $scope.getType = function ($index, item) {

    if(jQuery.inArray($index, $scope.highlight)!==-1){

      return (item.highlightImage.path);

    } else {

      return (item.standardImage.path);
    }

  }

}]);




