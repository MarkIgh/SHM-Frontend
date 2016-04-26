app.service('SessionInfo', function ($http) {
    var Info = {};
    
    $http.get('../api/info/session').
        success(function(data, status, headers, config) {
            // Set the data
            Info = data;
        }
        ).
        // Errors handling
        error(function(data, status){
            httpGetError(data, status);
        });
        
    this.Get = function () {
         $http.get('../api/info/session').
        success(function(data, status, headers, config) {
            // Set the data
            console.log(JSON.stringify(data));
            Info = data;
            console.log(JSON.stringify(Info));
        }
        ).
        // Errors handling
        error(function(data, status){
            httpGetError(data, status);
        });
        
        console.log(JSON.stringify(Info));
        return Info;
    };
});