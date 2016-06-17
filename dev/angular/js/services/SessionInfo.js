app.service('SessionInfo', Service_SessionInfo);

function Service_SessionInfo($http, $rootScope) {
    
    
        $http.get('../api/info/session').
            success(function(data, status, headers, config) {
            // Set the data
            $rootScope.Main.Info = data;
            console.log('sessinfo'+JSON.stringify(data));
            $rootScope.Main.$digest();
        }
        ).
        // Errors handling
        error(function(data, status){
            httpGetError(data, status);
        });

}