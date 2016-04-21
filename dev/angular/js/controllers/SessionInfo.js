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

        var wsurl='';
        if (window.location.protocol != "https:"){
            wsurl='ws';
        }else{
            wsurl='wss';
        }

        var ws = new WebSocket(wsurl+"://"+window.location.host+"/api/info/actualizer");

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
