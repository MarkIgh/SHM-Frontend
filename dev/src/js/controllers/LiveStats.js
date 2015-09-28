app.controller('LiveStats', ['$scope', '$filter', '$http',
    function($scope, $filter, $http){

      var ws = new WebSocket("wss://"+window.location.host+"/api/core/livesysstat");

      ws.onopen = function(){
        console.log("Socket for livestats has been opened!");
      };

      ws.onmessage = function(message) {
       
        $scope.$apply(function() {
            // Update scope
            $scope.Stats = JSON.parse(message.data);
            $scope.$apply;
            // Update PIE charts
            $('#PChartRAM').data('easyPieChart').update($scope.Stats.RAM);
            $('#PChartSWAP').data('easyPieChart').update($scope.Stats.SWAP);
            $('#PChartWA').data('easyPieChart').update($scope.Stats.WA);
            
        });
      };

}]);
