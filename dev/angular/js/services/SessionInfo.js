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

function Service_Plugins($http, $rootScope, $injector) {
        
        var html_injectors = ["Hello from inside"];
        var plugins_list;

        // Getting plugins List
        this.LoadInstalled = function () {
            $http.get('../api/plugins/list').
            success(function(data) {
                // Set the data
                plugins_list = data;
                console.log(plugins_list);
                // Load injectors
                for (var id in plugins_list) {
                    var plugin = plugins_list[id];
                    console.log(plugin);
                    $.getScript("../Alpha/js/"+plugin.Name+".js");
                }
            }).
            // Errors handling
            error(function(data, status){
                httpGetError(data, status);
            });

        }

        // Run Injected Plugin service
        this.RunService= function(CtrlName){
            for (var id in plugins_list) {
                var service = $injector.get("Plugin_"+plugins_list[id]);
                // Call controller method
                service[CtrlName]();
            }
        }

        // Get plugins list
        this.List = function(){
            return plugins_list;
        }

        this.getHTMLInjectors = function() {
            return html_injectors;
        };

        this.addHTMLInjector = function(injector_function) {
            html_injectors.push(injector_function);
        };

}
