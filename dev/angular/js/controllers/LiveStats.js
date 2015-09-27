app.controller('LiveStats', ['$scope', '$filter', '$http',
    function($scope, $filter, $http){

      var ws = new WebSocket("wss://93.183.203.13:10443/api/core/livesysstat");

      ws.onopen = function(){
        console.log("Socket for livestats has been opened!");
      };

      ws.onmessage = function(message) {
       
        $scope.$apply(function() {
            // Update scope
            $scope.Stats = JSON.parse(message.data);
            $scope.$apply;
            // Update PIE charts
            $('#PChartCPU').data('easyPieChart').update($scope.Stats.CPU);
            $('#PChartRAM').data('easyPieChart').update($scope.Stats.RAM);
            $('#PChartSWAP').data('easyPieChart').update($scope.Stats.SWAP);
            // Update processes table
            $('#PSTable').DataTable( {
              data: $scope.Stats.PS,
            });
        });
      };

}]);
