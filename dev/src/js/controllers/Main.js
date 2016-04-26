app.controller('Main',
  function($scope, $filter, $http, $location, SessionInfo){

    // Listen for reloads
    $scope.Actualizer = function(){

        var ws = new WebSocket(getWSprotocol()+window.location.host+"/api/info/actualizer");

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
    $scope.Info = SessionInfo.Get();

    // Run actualizer
    $scope.Actualizer();
});
