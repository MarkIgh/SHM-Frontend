app.controller('ApiTriggers', ['$scope', '$filter', '$http',
  function($scope, $filter, $http, $location){

    // Get Session Info function
    $scope.getInfo=function(){
        $http.get('../api/triggers').
        success(function(data, status, headers, config) {
            // Set the data
            $scope.APITriggers = data;
          }
        ).
        // Errors handling
        error(function(data, status, headers,config){
            httpGetError(data, status);
        });
    };
    // Run GetInfo
    $scope.getInfo();

}]);
