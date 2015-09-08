// Erros handling during http.Get requests to server's API
function errors_httpget(data, status, headers) {
  // If session expired
  if (status == 401) {
    swal({
      title:"Session expired",
      text: "Your session has expired or not found. Please relogin.",
      type: "error",
      showLoaderOnConfirm: true, },
    function(){ window.location.href="../Signin"; });
  }else{
    sweetAlert("Unknown server response", "Something went wrong! Server response code: "+status,
    "error");
  };
};
