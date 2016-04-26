app.service('SessionInfo', function ($http) {
    this.Info ={};
    
    $http.get('../api/info/session').
        success(function(data, status, headers, config) {
            // Set the data
            this.Info = data;
        }
        ).
        // Errors handling
        error(function(data, status){
            httpGetError(data, status);
        });
        
    this.Get = function () {
        alert('Username:'+this.Info.Username);
        return this.Info;
    };
});