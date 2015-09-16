app.controller('LiveStats', ['$scope', '$filter', '$http',
    function($scope, $filter, $http){

      ws.onopen = function(){
        console.log("Socket has been opened!");
      };

      ws.onmessage = function(message, $scope) {
        console.log(JSON.parse(message.data));
        $scope.Stats = {};
        $scope.Stats = message.data;
      };

}]);
