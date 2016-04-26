app.service('SessionInfo', function ($http) {
    
    this.Info = {};
    
    this.$Get = function() { 
         $http.get('../api/info/session').
            success(function(data, status, headers, config) {
            // Set the data
            this.Info = data;
            console.log('sessinfo'+JSON.stringify(data));
            console.log('sessinfo'+JSON.stringify(this.Info));
            return this.Info;
        }
        ).
        // Errors handling
        error(function(data, status){
            httpGetError(data, status);
        });
    };
});