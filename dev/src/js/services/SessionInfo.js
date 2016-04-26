app.service('SessionInfo', function ($http) {
    var Info = {};

         $http.get('../api/info/session').
            success(function(data, status, headers, config) {
            // Set the data
            
            Info = data;
            return Info;
        }
        ).
        // Errors handling
        error(function(data, status){
            httpGetError(data, status);
        });
        
});