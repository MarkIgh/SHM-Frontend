app.controller('Journal', ['$scope', '$filter', '$http', 'ErrorHandler',
  function($scope, $filter, $http, $location, ErrorHandler){

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
        error(function(data, status, ErrorHandler){
            ErrorHandler.httpGet(data, status);
        });
    };
}]);
