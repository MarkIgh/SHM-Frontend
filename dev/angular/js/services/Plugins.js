
app.service('Plugins', Service_Plugins);
function Service_Plugins($http, $rootScope, $injector, $q) {

        // Promise for getting plugins list
        var deferred = $q.defer();
        // Is plugins already loaded
        var PluginsLoaded = false;
        // List of plugins
        var plugins_list = null;

        // Run Injected Plugin service
        this.RunService= function(CtrlName){

            console.log("RunService "+CtrlName+" from plugins invoked");

            // Wait until plugins list is fullfilled
            function wait(){
                if (plugins_list === null){
                    console.log('Empty plugins list, waiting for plugins list...');
                    setTimeout(wait,100);
                }else{
                    console.log('Plugins list fullfiled');
                    // Run controller when we got plugins list
                    runController();
                    return;
                }
            }
            wait();
        
            // Run Controller CtrlName from Plugin_PluginName service
            function runController(){
                // Iterate plugins
                for (var id in plugins_list) {
                    var pluginService = "Plugin_"+plugins_list[id].Name;
                    var service = {};

                    // Get injected service from plugin
                    try {
                        console.log("Getting service "+pluginService);
                        service = $injector.get(pluginService);
                    } catch(e) {
                        console.log("Plugin service not exists: "+pluginService);
                        return;
                    }

                    // Try to run method of controller
                    try{                    
                        console.log("Run controller: "+CtrlName+" from "+pluginService);
                        service[CtrlName]();
                    } catch(e){
                        console.log("Method for controller "+CtrlName+" not found in service "+pluginService);
                        return;
                    }

                }
            }
        };

        // Get plugins list
        this.List = function(){
            return plugins_list;
        };

        // Load plugins on constructor
        function LoadPlugins(){
            // Getting plugins List
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
        LoadPlugins();

        return this;
}