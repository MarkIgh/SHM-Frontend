app.controller('LiveStats', ['$scope', '$filter', '$http',
    function($scope, $filter, $http){

      var ws = new WebSocket("wss://93.183.203.13:10443/api/core/livesysstat");

      ws.onopen = function(){
        console.log("Socket has been opened!");
      };

      ws.onmessage = function(message, $scope) {
        console.log(JSON.parse(message.data));
        $scope.Stats = {};
        $scope.Stats = message.data;
      };

}]);
