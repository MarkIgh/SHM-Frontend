app.controller('UserTemplates', ['$scope', '$filter', '$http',
  function($scope, $filter, $http, $location){

    // Get Session Info function
    $scope.getInfo=function(){
        $http.get('../api/utemplates/list').
        success(function(data, status, headers, config) {
            // Set the data
            $scope.UserTemplates = data;
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
