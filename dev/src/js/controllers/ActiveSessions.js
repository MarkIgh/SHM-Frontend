app.controller('ActiveSessions', ['$scope', '$filter', '$http',
  function($scope, $filter, $http, $location){

    // Get Session Info function
    $scope.getInfo=function(){
        $http.get('../api/sessions/list').
        success(function(data, status, headers, config) {
            // Set the data
            $scope.Sessions = data;
          }
        ).
        // Errors handling
        error(function(data, status, headers,config){
            errors_httpget(data, status, headers,config);
        });
    };
    // Get Session Info function
    $scope.remove=function(sessid){
        $http.post('../api/sessions/remove','{"SessionID":"'+sessid+'"}').
        success(function(data, status, headers, config) {
          // Run GetInfo
          $scope.getInfo();
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
