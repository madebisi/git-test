var app = angular.module('app', []);

app.controller('MainCtrl',["$scope", "$http", function($scope, $http) {

  $scope.highlightCheck[1,8,15,22,29,36,43,50,57,64,71,78,85,92,99,106,113,120,127,134,141,148,155,162,169,176,183,190,197]
  $scope.highlightCheck[

  $http.get('items.json')

  .then(function(info){

    $scope.data = info.data;

    $scope.multiple7 = calc();

  });

  $scope.calc = function(){

    for(x = 1; x < 701; x++){

        $scope.multiple7 = $scope.multiple7 + 7 + ",";

    }

    return();
  }

  $scope.limitNum = 2;

  $scope.displayNum = $scope.limitNum;

  $scope.reSort = function(s,o){

    $scope.sortType = s;

    $scope.order = o;
    
    $( ".catalogueHolder" ).css("display", "none");

    $( ".catalogueHolder" ).fadeIn(600).css("display", "normal");

    for (var h = 0; h < $scope.highlightCheck.length; h++) {

      if ()

    }

  }

  $scope.loadMore = function(limit){

      $scope.displayNum = $scope.displayNum + $scope.limitNum;

      $scope.animateIn();

      if ($scope.displayNum > $scope.data.length){

       $scope.displayNum = $scope.data.length;

      }

  }

  $scope.animateIn = function(){

    for (var p = $scope.displayNum-1; p < $scope.displayNum-1+$scope.limitNum; p++) {

      $(".panel-" + p).css("display", "none");
      $(".panel-" + p).fadeIn(600).css("display", "normal");

    }

  }

}]);




