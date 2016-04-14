installApp.controller('Progress', Progress);
function Progress ( $http, userSettings) {

    // Check for websocket

    // Set defaults
    this.Action = 'Waiting for install server reply.';
    this.Percent = 0;

    // Open WS
    var ws = new WebSocket("ws://" + window.location.host + "/status");

    ws.onopen = function() {
        console.log("Status WebSocket has been opened.");
    }
        
    ws.onclose = function (evt) {
        if (evt.code != 1000 ){
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
        if (data.Percent < this.Percent){
            data.Percent = this.Percent
        }
        // Check for Status
        switch(data.Status) {
        case 'Begin':
            location.href="#/settings";
            break;
        case 'Error':
            location.href="#/error/install"
            break;
        case 'Done':
            location.href="#/done"
            break;
        }
        // Update this
        Object.assign(this, data);
    }

    // Send start install process
    $http({
      method: 'GET',
      url: '/install'
    });

}

installApp.controller('SettingsCtrl', SettingsCtrl);
function SettingsCtrl ( userSettings , $http) {

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
    
    url += window.location.host + ':' + userSettings.ServerPort;
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