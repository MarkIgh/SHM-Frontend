app.controller('LiveStats', ['$scope', '$filter', '$http',
    function($scope, $filter, $http){

      var ws = new WebSocket("wss://93.183.203.13:10443/api/core/livesysstat");

      ws.onopen = function(){
        console.log("Socket for livestats has been opened!");
      };

      ws.onmessage = function(message) {
        console.log(JSON.parse(message.data));
       
        $scope.$apply(function() {
            $scope.Stats = JSON.parse(message.data);
            $('#PChartCPU').data('easyPieChart').update($scope.Stats.CPU);
        });
      };

}]);
