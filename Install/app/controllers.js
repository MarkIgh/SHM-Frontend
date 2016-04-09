var installApp = angular.module('Install', []);

installApp.controller('Progress', function ($scope,$http) {

    // Set defaults
    $scope.Progress = {'Status' : 'Waiting for server reply.', 'Percent' : 0};

    // Open WS
    var ws = new WebSocket("ws://" + window.location.host + "/status");

    ws.onopen = function() {
        console.log("Status WebSocket has been opened!");
    };

    ws.onmessage = function(message) {
        listener(JSON.parse(message.data));
    };

    // Send start install process
    $http({
      method: 'GET',
      url: '/install'
    });

    function listener(data) {
      var messageObj = data;
      console.log("Received data from websocket: ", messageObj);
        $scope.Progress = data.Progress;
        $scope.$digest();
    }
});
