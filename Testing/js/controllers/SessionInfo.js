app.controller('SessionInfo', ['$scope', '$filter', '$http', 
  function($scope, $filter, $http, $location){
   
    // Get Session Info function
    $scope.getInfo=function(){
        $http.get('../api/info/session').
        success(function(data, status, headers, config) {
            // Set the data
            $scope.sessionInfo = data;
          }
        ).
        error(function(data, status, headers, config) {
          if (status == 401) {
            window.location.href="../Signin";
          }else{
            alert('Unknown error. Code:'+status);
          };
        });
    };
    $scope.html5 = {
      email: 'email@example.com',
      tel: '123-45-67',
      number: 29,
      range: 10,
      url: 'http://example.com',
      search: 'blabla',
      color: '#6a4415',
      date: null,
      time: '12:30',
      datetime: null,
      month: null,
      week: null
    };

    alert('SessinfoStart');
    // Run GetInfo to get session info
    $scope.getInfo();

}]);
