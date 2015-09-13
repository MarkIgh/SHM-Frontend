app.controller('Journal', ['$scope', '$filter', '$http',
  function($scope, $filter, $http, $location){

    // Get Session Info function
    $scope.getInfo=function(){
        $http.post('../api/journal/list', $scope.Search).
        success(function(data, status, headers, config) {
            // Set the data
            $scope.Journal = {};
            $scope.Journal.operations = data;
          }
        ).
        // Errors handling
        error(function(data, status){
            httpGetError(data, status);
        });
    };
}]);
