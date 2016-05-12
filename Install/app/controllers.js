installApp.controller('Progress', Progress);
function Progress ( $scope, $http, userSettings) {

    var progress = this;
    // Check for websocket

    // Set defaults
    progress.Action = 'Waiting for install server reply.';
    progress.Percent = 0;
    progress.Status = '';

    // Open WS
    var ws = new WebSocket("ws://" + window.location.host + "/status");
    // var ws = new WebSocket("ws://95.163.191.21:8081/status");

    ws.onopen = function() {
        console.log("Status WebSocket has been opened.");
    }
        
    ws.onclose = function (evt) {
        if (evt.code != 1000 && $scope.progress.Status != 'Done' ){
            console.log("Websocket connection error.");
            location.href="#/error/network";
        }
    }
    
    ws.onerror = function () {
        console.log("Websocket connection error.");
        location.href="#/error/network";
    }
    
    ws.onmessage = function(message) {
        data = JSON.parse(message.data);
        console.log("Received data from websocket: ", data);
        // Ignore 0 percents in package install
        if (data.Percent < progress.Percent){
            data.Percent = progress.Percent
        }
        // Check for Status
        switch(data.Status) {
        case 'Begin':
            location.href="#/settings";
            break;
        case 'Error':
            ws.close(1000);
            location.href="#/error/install";
            break;
        case 'Done':
            ws.close(1000);
            location.href="#/done";
            break;
        }
        // Assighn
        Object.assign(progress, data);
        $scope.$digest();
    }
    
    // Increase percent every 3 sec for better ui
    var increasePerc = setInterval(function() {
        if (progress.Percent > 0 && progress.Percent < 100){
            progress.Percent++;
            $scope.$digest();
        }
    }, 8000);

    // Send start install process
    $http({
      method: 'GET',
      url: '/install'
    });
}

installApp.controller('SettingsCtrl', SettingsCtrl);
function SettingsCtrl ( userSettings , $http) {
    // Try to get timezone for modern browsers
    if (window.Intl){
        this.Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }else{
        console.log('Browser dont support ecma Intl, cant get user timezone');   
    }
    
    // Save settings to install backend
    this.save = function(){
        // Update global settings
        Object.assign(userSettings, this);
        // Send model to /settings
        $http.post('/settings', this)
            .success(function(){
                location.href="#/wait"
            })
            .error(function(){
                location.href="#/error/network";
                console.log("Error while sending settings. Check is server still alive.")
            });
    }
}

installApp.controller('DoneCtrl', DoneCtrl);
function DoneCtrl ( userSettings ) {
    
    var url;
    if (userSettings.SSL == false){
        url = 'http://';
    }else{
        url = 'https://';
    }
    
    url += window.location.hostname + ':' + userSettings.ServerPort;
    this.URL = url;
}

installApp.controller('ErrorCtrl', ErrorCtrl);
function ErrorCtrl ($routeParams) {
    switch ($routeParams.type) {
        case 'network':
            this.Text = 'Error connecting to server where installation does. Please check is a server alive.';
            break;
        case 'install':
            this.Text = 'Installation error. Please check install.log for more details.';
            break;
        default:
            this.Text = 'Unknown error.';
            break;
    }
}