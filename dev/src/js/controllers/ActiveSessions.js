app.controller('ActiveSessions', ['$scope', '$filter', '$http',
  function($scope, $filter, $http, $location){

    // Get Session Info function
    $scope.getInfo=function(){
        $http.get('../api/sessions/list').
        success(function(data, status, headers, config) {
            // Set the data
            $scope.sessions = data;
          }
        ).
        // Errors handling
        error(function(data, status, headers,config){
            errors_httpget(data, status, headers,config);
        });
    };
    // Run GetInfo
    $scope.getInfo();

}]);
