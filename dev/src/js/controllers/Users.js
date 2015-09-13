app.controller('Users', ['$scope', '$filter', '$http',
  function($scope, $filter, $http, $location){

    // Get Session Info function
    $scope.getInfo=function(){
        $http.get('../api/users/list').
        success(function(data, status, headers, config) {
            // Set the data
            $scope.Users = data;
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
