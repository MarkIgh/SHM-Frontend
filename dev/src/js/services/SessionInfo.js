app.service('SessionInfo', Service_SessionInfo);
function Service_SessionInfo($http, $rootScope) {
    
    
        $http.get('../api/info/session').
            success(function(data, status, headers, config) {
            // Set the data
            $rootScope.Main = {};
            $rootScope.Main.Info = data;
        }
        ).
        // Errors handling
        error(function(data, status){
            httpGetError(data, status);
        });

}

app.service('Plugins', Service_Plugins);
function Service_Plugins($http, $rootScope, $injector) {
        
        var PluginsLoaded = false;
        var plugins_list = {};

        // Getting plugins List
        this.LoadInstalled = function () {
            $http.get('../api/plugins/list').
            success(function(data) {
                // Set the data
                plugins_list = data;
                // Load injectors
                for (var id in plugins_list) {
                    var plugin = plugins_list[id];
                    // Append script loading
                    $('<script src="../plugin/'+plugin.Name+'/inject.js"></script>').insertAfter( "body" );
                }
            }).
            // Errors handling
            error(function(data, status){
                httpGetError(data, status);
            });

        }

        // Run Injected Plugin service
        this.RunService= function(CtrlName){


            if (Object.keys(plugins_list).length === 0){
                console.log('Empty plugins list');
            }

            for (var id in plugins_list) {
                var pluginService = "Plugin_"+plugins_list[id].Name;
                var service = {};

                // Get injected service from plugin
                try {
                    service = $injector.get(pluginService);
                } catch(e) {
                    console.log("Plugin service not exists: "+pluginService);
                }

                // Try to run method of controller
                try{                    
                    service[CtrlName]();
                } catch(e){
                    console.log("Method for controller "+CtrlName+" not found in service "+pluginService);
                }

            }
        }

        // Get plugins list
        this.List = function(){
            return plugins_list;
        }

}

