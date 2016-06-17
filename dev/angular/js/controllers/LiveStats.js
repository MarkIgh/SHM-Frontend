app.controller('LiveStats',
    function($scope, $filter, $http, Plugins){

      $scope.sortType = 'CPU';
      $scope.sortReverse = false;

      var ws = new WebSocket(getWSprotocol()+window.location.host+"/api/core/livesysstat");

      ws.onopen = function(){
        console.log("Socket for livestats has been opened!");
      };

      ws.onmessage = function(message) {
            // Update scope
            $scope.Stats = JSON.parse(message.data);
            
            $scope.$digest();
            // Update PIE charts
            $('#PChartCPU').data('easyPieChart').update($scope.Stats.CPU);
            $('#PChartRAM').data('easyPieChart').update($scope.Stats.RAM);
            $('#PChartSWAP').data('easyPieChart').update($scope.Stats.SWAP);
            $('#PChartWA').data('easyPieChart').update($scope.Stats.WA);

      };

      // Testing plugins services
      alert("Injectors are:"+Plugins.getHTMLInjectors());

});
