app.controller('Main',
  function($scope, $filter, $http, $location, SessionInfo, Plugins){
     
    this.Info = {};
    // Listen for reloads
    this.Actualizer = function(){

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

    // Testing Plugins, load installed and inject.js
    Plugins.RunService("Main");

    // Run actualizer
    this.Actualizer();
});
