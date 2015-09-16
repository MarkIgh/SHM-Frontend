app.controller('LiveStats', ['$scope', '$filter', '$http', 'ngWebSocket',
    function($scope, $filter, $http, $websocket){

        // Open a WebSocket connection
        var dataStream = $websocket('wss://93.183.203.13:10443/api/livesysstat');

        var collection = [];

        dataStream.onMessage(function(message) {
            collection.push(JSON.parse(message.data));
        });

}]);
