var installApp = angular.module('Install', ['ngRoute']);

installApp.config(function($routeProvider){
  $routeProvider.when("/settings",
    {
      templateUrl: "views/settings.html"
    }
  ).when("/error",
    {
      templateUrl: "views/error.html"
    }
  ).when("/done",
    {
      templateUrl: "views/done.html"
    }
  );
});

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
      console.log("Received data from websocket: ", data);
        // Ignore 0 percents in package install
        if (data.Percent < $scope.Progress.Percent){
            data.Percent = $scope.Progress.Percent
        }
        // Check for Status
        switch(data.Status) {
        case 'Begin':
            location.href="#/settings";
            break;
        case 'Error':
            location.href="#/error"
            break;
        case 'Done':
            location.href="#/done"
            break;
        }
        
        // Update scope
        $scope.Progress = data;
        $scope.$digest();
    }
});
