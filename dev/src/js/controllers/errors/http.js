// Erros handling during http.Get requests to server's API
function httpGetError(data, status) {
        switch (status) {
        // Session expired
        case 401:
              swal({
                title:"Session expired",
                text: "Your session has expired or not found. Please relogin.",
                type: "error",
                showLoaderOnConfirm: true, },
          function(){ window.location.href="../Signin"; });
                break;
        // Acces to api module denied
        case 403:
            swal({
                title:"Access denied",
                text: "Request is forbidden by your account configuration.",
                type: "error",
                showLoaderOnConfirm: true, });
            break;
        // Not found
        case 404:
            swal({
                title:"Not found",
                text: "Seems that api handler or file that you are looking not found at server.",
                type: "error",
                showLoaderOnConfirm: true, });
            break;
        // Server error
        case 500:
            // Check for panicerr resopnse
            if (data.error.code != null){
                swal({
                    title:"Wrong request: "+ data.error.code,
                    text: "Server return error, because wrong request type: "+data.error.text,
                    type: "error",
                    showLoaderOnConfirm: true, });
            }else{
            // If no pnicerr response
              sweetAlert("Server error", "Something went wrong! Server response code: "+status,
              "error");
            }
            break;

        // Something wrong
        default:
            sweetAlert("Unknown server response", "Something went wrong! Server response code: "+status,
            "error");
            break;
       };
};
