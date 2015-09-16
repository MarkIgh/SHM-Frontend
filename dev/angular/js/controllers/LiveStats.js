app.controller('LiveStats', ['$scope', '$filter', '$http', 'ngWebsocket',
    function($scope, $filter, $http, $websocket){

        var ws = $websocket.$new('wss://93.183.203.13:10443/api/livesysstat'); // instance of ngWebsocket, handled by $websocket service

        ws.$on('$open', function () {
            console.log('Oh my gosh, websocket is really open! Fukken awesome!');
        });

        ws.$on('pong', function (data) {
            console.log('The websocket server has sent the following data:');
            console.log(data);

        });

}]);
