app.controller('Messages', ['$scope', '$filter', '$http',
  function($scope, $filter, $http, $location){

    // Get Session Info function
    $scope.getInfo = function(){
        $http.get('../api/messages/list').
        success(function(data, status, headers, config) {
            // Set the data
            $scope.Messages = data;
          }
        ).
        // Errors handling
        error(function(data, status){
          httpGetError(data, status);
        });
    };

    // Run GetInfo to get session info
    $scope.getInfo();

}]);
