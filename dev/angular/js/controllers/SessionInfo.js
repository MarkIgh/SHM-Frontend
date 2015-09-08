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
        error(function(data, status, headers, config) {
          if (status == 401) {
            swal({
              title: "Session expired",
              text: "Your session expired or not found. Plese relogin.",
              type: "error",
              showLoaderOnConfirm: true, },
            function(){ window.location.href="../Signin"; });
          }else{
            sweetAlert("Unknown server response", "Something went wrong! Server response code: "+status,
            "error");
          };
        });
    };
    // Run GetInfo to get session info
    $scope.getInfo();

}]);
