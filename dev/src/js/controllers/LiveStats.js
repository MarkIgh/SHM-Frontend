app.controller('LiveStats', ['$scope', '$filter', '$http',
    function($scope, $filter, $http){

        // Create our websocket object with the address to the websocket
        var ws = new WebSocket("wss://93.183.203.13:10443/api/livesysstat");

        ws.onopen = function(){
            console.log("WebSocket has been opened!");
        };

        $scope.Stats = {};

        ws.onmessage = function($scope, message) {

            console.log(JSON.parse(message.data));
            $scope.Stats = message.data;

        };

}]);
