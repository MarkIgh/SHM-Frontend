app.service('SessionInfo', function ($http,$scope) {
    var Info = {};

         $http.get('../api/info/session').
            success(function(data, status, headers, config) {
            // Set the data
            Info = data;
            console.log('sessinfo'+JSON.stringify(data));
            $scope.$digest();
            return Info;
        }
        ).
        // Errors handling
        error(function(data, status){
            httpGetError(data, status);
        });
        
});