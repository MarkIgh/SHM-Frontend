app.controller('SessionInfo', ['$scope', '$filter', '$http', 'ErrorHandler',
  function($scope, $filter, $http, $location, ErrorHandler){
    // Get Session Info function
    $scope.getInfo=function(){
        $http.get('../api/info/session').
        success(function(data, status, headers, config) {
            // Set the data
            $scope.sessionInfo = data;
          }
        ).
        // Errors handling
        error(function(data, status, headers,config){
          ErrorHandler.httpGet(data, status);
        });
    };
    // Run GetInfo to get session info
    $scope.getInfo();
}]);
