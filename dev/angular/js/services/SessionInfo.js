app.service('SessionInfo', function ($http) {
    
    this.Info = {};
    var promise;
    
    this.Get = function() { 
      if ( !promise ) {
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http.get('../api/info/session').then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          this.Info = response.data;
          // The return value gets picked up by the then in the controller.
          return this.Info;
        });
      }
      // Return the promise to the controller
      return promise;
    }
});