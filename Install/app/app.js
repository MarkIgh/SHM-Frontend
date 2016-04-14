var installApp = angular.module('Install', ['ngRoute']);

installApp.config(function($routeProvider){
  $routeProvider.when("/settings",
    {
      templateUrl: "views/settings.html",
      controller: "SettingsCtrl",
      controllerAs: "settings"
    }
  ).when("/error/:type",
    {
      templateUrl: "views/error.html",
      controller: "ErrorCtrl",
      controllerAs: "error"
    }
  ).when("/wait",
    {
      templateUrl: "views/wait.html"
    }
  ).when("/done",
    {
      templateUrl: "views/done.html",
      controller: "DoneCtrl",
      controllerAs: "done"
    }
  );
});
