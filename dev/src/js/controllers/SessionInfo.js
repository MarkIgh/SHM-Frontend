app.controller('SessionInfo', ['$scope', '$filter', '$http',
  function($scope, $filter, $http, $location){

    // Get Session Info function
    $scope.getInfo = function(){
        $http.get('../api/info/session').
        success(function(data, status, headers, config) {
            // Set the data
            $scope.sessionInfo = data;
          }
        ).
        // Errors handling
        error(function(data, status){
          httpGetError(data, status);
        });
    };

    // Listen for reloads
    $scope.Actualizer = function(){

        var ws = new WebSocket("wss://93.183.203.13:10443/api/actualizer");

        ws.onopen = function(){
            console.log("WS for actualizer has been opened!");
        };

        ws.onmessage = function(message, $scope) {
            console.log(JSON.parse(message.data));
        };

        ws.onerror = function(error) {
            console.log("WS Error: " + error.message);
        };
    };

    // Run GetInfo to get session info
    $scope.getInfo();

    // Run actualizer
    $scope.Actualizer();
}]);
