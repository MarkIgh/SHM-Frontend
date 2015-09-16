app.controller('LiveStats', ['$scope', '$filter', '$http',
    function($scope, $filter, $http){

        // Create our websocket object with the address to the websocket
        var ws = new WebSocket("wss://93.183.203.13:10443/api/livesysstat");

        ws.onopen = function(){
            console.log("WebSocket has been opened!");
        };

        ws.onmessage = function(message) {
            $scope.Stats=JSON.parse(message.data);
        };

}]);
