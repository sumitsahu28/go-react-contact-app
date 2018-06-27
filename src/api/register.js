var $ = require("jquery");

export var register = (username, password, confirmPass)=>{
    return new Promise (resolve =>{
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/register",
            "method": "POST",
            "data": {
              "username": username,
              "password": password,
              "confirmPass": confirmPass
            }
          }
          
          $.ajax(settings).done(function (response) {
            resolve (response);
          });
    })
}