var installApp = angular.module('Install', ['ngRoute']);

installApp.config(function($routeProvider){
  $routeProvider.when("/settings",
    {
      templateUrl: "views/settings.html",
      controller: "SettingsCtrl",
      controllerAs: "settings"
    }
  ).when("/error",
    {
      templateUrl: "views/error.html"
    }
  ).when("/wait",
    {
      templateUrl: "views/wait.html"
    }
  ).when("/done",
    {
      templateUrl: "views/done.html",
      controller: "DoneCtrl"
    }
  );
});
