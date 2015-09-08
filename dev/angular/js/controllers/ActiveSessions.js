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
        error(function(data, status, headers, config) {
          if (status == 401) {
            window.location.href="../Signin";
          }else{
            alert('Unknown error. Code:'+status);
          };
        });
    };
    // Run GetInfo
    $scope.getInfo();

}]);
