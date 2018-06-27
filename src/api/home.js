var $ = require("jquery");


export var user = ()=>{
    return new Promise (resolve =>{
        var username = localStorage.getItem("username");
        resolve(username);
    })
}

export var updatecontact = (contact) => {
    return new Promise (resolve =>{
        const token = localStorage.getItem("Authorization");
        const user = localStorage.getItem("username");
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/contacts",
            "method": "PUT",
            "headers": {
            "Authorization":token,
            "Username":user,
            "cache-control": "no-cache",
            },
            "data": JSON.stringify({
                    "id":contact.id,
                    "name":contact.name,
                    "mobile":contact.mobile,
                    "address":contact.address,
                    "username":contact.username
            })
          }
          
          $.ajax(settings).done(function (response) {
            resolve(response)
          });
    })
}

export var deletecontact = (contact) => {
    return new Promise (resolve =>{
        const token = localStorage.getItem("Authorization");
        const user = localStorage.getItem("username");
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/contacts",
            "method": "DELETE",
            "headers": {
            "Authorization":token,
            "Username":user,
            "cache-control": "no-cache",
            },
            "data": JSON.stringify({
                    "id":contact.id,
                    "name":contact.name,
                    "mobile":contact.mobile,
                    "address":contact.address,
                    "username":contact.username
            })
          }
          
          $.ajax(settings).done(function (response) {
            resolve(response)
          });
    })
}

export var allContacts = () =>{
    return new Promise (resolve =>{
        const token = localStorage.getItem("Authorization");
        const user = localStorage.getItem("username");
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/contacts",
            "method": "GET",
            "headers": {
                "Authorization":token,
                "Username":user,
              "cache-control": "no-cache",
            }
          }
          $.ajax(settings).done(function (response) {
            if(response!==null)
            resolve(response)
            else
            resolve([{id:"123", name:"No", mobile:"Contacts", address:"Available", username:user}])
        });
    })
}

export var addcontact = (name, mobile, address)=>{
    return new Promise (resolve =>{
        const token = localStorage.getItem("Authorization");
        const user = localStorage.getItem("username");
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/contacts",
            "method": "POST",
            "headers": {
                "Authorization":token,
                "Username":user,
              'accept': 'application/json',
              "content-type": "application/x-www-form-urlencoded",
              "cache-control": "no-cache",
            },
            "data": {
              "name": name,
              "mobile": mobile,
              "address": address
            }
          }
          
          $.ajax(settings).done(function (response) {
              resolve (response);
          });
    })
}

export var logout = () => {
    return new Promise (resolve =>{
        const token = localStorage.getItem("Authorization");
        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/logout",
            "method": "GET",
            "headers": {
                "Authorization":token,
              "cache-control": "no-cache",
            }
          }
          
          $.ajax(settings).done(function (response) {
            localStorage.removeItem("Authorization");
            resolve(true)
        });
    })
}