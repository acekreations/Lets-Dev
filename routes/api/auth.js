var path = require("path");
var express = require("express");
var app = express();
var request = require("request");
var Cookies = require("universal-cookie");
const cookies = new Cookies();

module.exports = function(app) {
    //callback route for Github returning data
    app.get("/github/callback/", function(req, res) {
        const cookies = new Cookies(req, res);
        //grab session code that Github returns in params
        var session_code = req.query.code;
        console.log("code=" + session_code);

        //POST request with session code
        request(
            {
                url: "https://github.com/login/oauth/access_token",
                method: "POST",
                json: true,
                body: {
                    code: session_code,
                    client_id: "9988a9f4ea38fbb0c35e",
                    client_secret: "f941956fb880afd903d41e1558009974a317f28a",
                    accept: "json"
                }
            },

            // receive access token from Github response
            function(error, response, body) {
                console.log(response.body);
                if (!error && response.statusCode == 200) {
                    console.log("POST success!!!");
                    console.log("access token=" + response.body.access_token);
                    var access_token = response.body.access_token;

                    // GET request using access token to get user profile data
                    request(
                        {
                            url:
                                "https://api.github.com/user?access_token=" +
                                response.body.access_token,
                            method: "GET",
                            json: true,
                            headers: {
                                "User-Agent": "request"
                            }
                        },

                        function(error, response, body) {
                            console.log(response.body);
                            var login = response.body.login;
                            var name = response.body.name;
                            var email = response.body.email;
                            var avatar_url = response.body.avatar_url;

                            // redirect back to home page and pass data in params in url
                            res.redirect(
                                "/?access_token=" +
                                    access_token +
                                    "&login=" +
                                    login +
                                    "&name=" +
                                    name +
                                    "&email=" +
                                    email +
                                    "&avatar_url=" +
                                    avatar_url
                            );
                        }
                    );
                }
            }
        );
    });
};
