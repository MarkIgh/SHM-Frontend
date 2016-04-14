installApp.controller('Progress', Progress);
installApp.controller('SettingsCtrl', SettingsCtrl);

function Progress ($scope,$http) {

    // Set defaults
    $scope.Progress = {'Action' : 'Waiting for server reply.', 'Percent' : 0};

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
}

function SettingsCtrl ($scope, $http) {
    
    $scope.save = function(){
        // Send model to /settings
        $http.post('/settings', $scope.Settings)
        .success(function(data, status, headers, config){
            location.href="#/wait"
        })
        .error(function(data, status, headers, config){
            console.log($scope.Settings);
            console.log("Error while sending settings. Check is server still alive.")
        });
    }
}
