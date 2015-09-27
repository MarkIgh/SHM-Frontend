app.controller('LiveStats', ['$scope', '$filter', '$http',
    function($scope, $filter, $http){

    $scope.$apply(function() {
        $scope.Stats.CPU = 20;
    });

}]);
