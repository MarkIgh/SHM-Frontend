app.controller('LiveStats', ['$scope', '$filter', '$http',
    function($scope, $filter, $http){

        // Create our websocket object with the address to the websocket
        var ws = new WebSocket("wss://93.183.203.13:10443/api/livesysstat");

        ws.onopen = function(){
            console.log("WebSocket has been opened!");
        };

        ws.onmessage = function(message) {
            console.log(JSON.parse(message.data));
            $scope.Stats= {};
            $scope.Stats.Test ="Tester12";

            $scope.Stats = message.data;
        };

}]);
