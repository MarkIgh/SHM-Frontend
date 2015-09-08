app.controller('SessionInfo', ['$scope', '$filter', '$http',
  function($scope, $filter, $http, $location){

    // Get Session Info function
    $scope.getInfo=function(){
        $http.get('../api/info/session').
        success(function(data, status, headers, config) {
            // Set the data
            $scope.sessionInfo = data;
          }
        ).
        // Errors handling
        error(errors_httpget(data, status, headers));
    };
    // Run GetInfo to get session info
    $scope.getInfo();
}]);
