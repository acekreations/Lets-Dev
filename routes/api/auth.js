var path = require("path");
var express = require("express");
var app = express();
var request = require("request");
var Cookies = require("universal-cookie");
const cookies = new Cookies();


module.exports = function(app) {

    app.get("/github/callback/", function(req, res) {
        var session_code = req.query.code;
        console.log(session_code);
        res.sendFile(path.join(__dirname, "../public/index.html"));

        request({
            url:"https://github.com/login/oauth/access_token",
            method:"POST",
            json:true,
            body:{code: session_code,client_id:"e52b2491623d91b826f2",client_secret:"704548b912277672139d79560c6ef28017a6b3df",accept:"json"}
        },
            function (error, response, body) {
                console.log(response.body);
                if (!error&&response.statusCode ==200) {
                    console.log(response);
                    console.log("access token="+response.body.access_token);
                    cookies.set("access token", response.body.access_token, { path: '/' }); 

                    var access_token=cookies.get("access token");
                    console.log(access_token);
            
                    request({
                        url:"https://api.github.com/user?access_token="+access_token,
                        method:"GET",
                        json:true,
                        headers: {
                            "User-Agent": "request"
                        }
                    },
            
                        function(error, response, body) {
                            console.log(response.body)
                            cookies.set("login", response.body.login, { path: '/'});
                            cookies.set("email", response.body.email, { path: '/'});
                            console.log(cookies.get("login"));
                            console.log(cookies.get("email"));
            
                        }
            
                    );

                    
                }
            }

        );
    });


}