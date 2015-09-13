// Erros handling during http.Get requests to server's API
function httpGetError(data, status) {
        // If session expired
        if (status == 401) {
              swal({
                title:"Session expired",
                text: "Your session has expired or not found. Please relogin.",
                type: "error",
                showLoaderOnConfirm: true, },
          function(){ window.location.href="../Signin"; });
        }else if (status == 403) {
            swal({
                title:"Access denied",
                text: "Request is forbidden by your account configuration.",
                type: "error",
                showLoaderOnConfirm: true, });
        }else if (status == 404) {
            swal({
                title:"Not found",
                text: "Seems that api handler or file that you are looking not found at server.",
                type: "error",
                showLoaderOnConfirm: true, });
        }else if (status == 500) {

                try{

                    resp=JSON.parse(data);
                    if (resp.error != null){
                        swal({
                            title:"Wrong request:"+ resp.error.code,
                            text: "Server return error, because wrong request type: "+resp.error.text,
                            type: "error",
                            showLoaderOnConfirm: true, });
                    }else{
                      sweetAlert("Unknown server response", "Something went wrong! Server response code: "+status,
                      "error");
                    }

                }catch(e){
                    sweetAlert("Unknown server response", "Something went wrong! Server response code: "+status,
                    "error");
                };

        }else{
            sweetAlert("Unknown server response", "Something went wrong! Server response code: "+status,
            "error");
        };
};
