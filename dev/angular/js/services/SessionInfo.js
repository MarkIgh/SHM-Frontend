app.service('SessionInfo', function ($http, $rootScope) {
    
    
        $http.get('../api/info/session').
            success(function(data, status, headers, config) {
            // Set the data
            $rootScope.main.Info = data;
            console.log('sessinfo'+JSON.stringify(data));
            $rootScope.main.$digest();
        }
        ).
        // Errors handling
        error(function(data, status){
            httpGetError(data, status);
        });

});