var $ = require("jquery");

export var login = (email,password)=>{
    return new Promise (resolve =>{
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/login",
            "method": "POST",
            "data": {
              "username": email,
              "password": password
            }
          }
          
          $.ajax(settings).done(function (response) {
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("Authorization", response.sessiontoken);
                localStorage.setItem("username", response.username);
            }
            resolve (response);
          });
    })
}