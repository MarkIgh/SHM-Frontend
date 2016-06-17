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

app.service('Plugins', Service_Plugins);

function Service_Plugins($http, $rootScope) {
        
        var html_injectors = ["Hello from inside"];

        this.getHTMLInjectors = function() {
            return html_injectors;
        };

        this.addHTMLInjector = function(injector_function) {
            html_injectors.push(injector_function);
        };

}
