angular.module('positivista')
    .factory('ConvertImage', function() {
        return {
            Base64: function(url, callback, outputFormat) {
                var img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function() {
                    var canvas = document.createElement('CANVAS'),
                        ctx = canvas.getContext('2d'),
                        dataURL;
                    canvas.height = this.height;
                    canvas.width = this.width;
                    ctx.drawImage(this, 0, 0);
                    dataURL = canvas.toDataURL(outputFormat);
                    callback(dataURL);
                    canvas = null;
                };
                img.src = url;
            }
        };
    })
    .factory('GetUserInfo', ['$http', 'webConfig', 'appConfig', function($http, webConfig, appConfig) {
        var requestUrl;
        if (window.cordova) {
            requestUrl = appConfig.url;
        } else {
            requestUrl = webConfig.url;
        }
        var userId = localStorage.getItem("userId");
        var profileFetchSucc = function(succ) {
            if(succ.data.data) {
                return succ.data.data;
            } else {
                return "";
            }
        }
        var profileFetchFail = function(err) {
            console.log("err = ", err);
            return err;
        };

        return {
            getUserId: function() {
                return userId;
            },
            getProfileData: function() {
                return $http.post(requestUrl, {
                    action: "getProfileData",
                    userId: userId
                }).then(profileFetchSucc, profileFetchFail);
            }
        };
    }])
    .factory('AlertService', function() {
        var message;
        return {
            set: function(msg) {
                message = msg;
            },
            clear: function() {
                message = null;
            },
            get: function() {
                return message;
            }
        };
    })
    .factory('UserService', ['$http', '$q', 'webConfig', 'appConfig', function($http, $q, webConfig, appConfig) {
        var user = {};
        var loggedIn = false;
        var requestUrl;
        if (window.cordova) {
            requestUrl = appConfig.url;
        } else {
            requestUrl = webConfig.url;
        }
        var loginSuccess = function(resp) {
            if (resp.data.data) {
                user = resp.data.data;
                loggedIn = true;
                return user;
            } else {
                loggedIn = false;
                return $q.reject(err.data.status_msg);
            }
        };
        var loginFailure = function(err) {
            loggedIn = false;
            return $q.reject(err.data);
        };
        var profileUpdateSucc = function(resp) {
            return resp;
        };
        var profileUpdateFail = function(err) {
            return $q.reject(err.data);
        };
        
        var profileImgSucc = function(resp) {
            return resp;
        };
        var profileImgFail = function(err) {
            return $q.reject(err.data);
        };

        return {
            isLoggedIn: function() {
                return loggedIn;
            },
            login: function(username, pwd) {

                return $http.post(requestUrl, {
                    action: "signin",
                    username: username,
                    password: pwd
                }).then(loginSuccess, loginFailure);
            },
            logout: function() {

                return $http.post(requestUrl, {}).then(function() {
                    loggedIn = false;
                }, function() {
                    loggedIn = false
                });
            },
            register: function(username, pwd, email) {
                return $http.post(requestUrl, {
                    action: "signup",
                    username: username,
                    password: pwd,
                    emailId: email
                }).then(loginSuccess, loginFailure);
            },
            tokens: function() {
                if (loggedIn) {
                    return $q.when(user);
                } else {
                    return $http.post('/api/token', {}).then(loginSuccess, loginFailure);
                }
            },
            updateProfile: function(profileName,profileStatus, userId) {
                return $http.post(requestUrl, {
                    action: "updateProfile",
                    profileName: profileName,
                    profileStatus: profileStatus,
                    userId: userId
                }).then(profileUpdateSucc, profileUpdateFail);
            },
            
            updateProfileImg: function(profileImg, userId) {
                return $http.post(requestUrl, {
                    action: "updateProfileImg",
                    profileImg: profileImg,
                    userId: userId
                }).then(profileImgSucc, profileImgFail);
            },
            fgtpassword: function(emailId) {
                return $http.post(requestUrl,{
                    action: "fgtpassword",
                    email: emailId
                })
            }
        };
    }])

    .factory('GoalService', ['$http', '$q', 'webConfig', 'appConfig', function($http, $q, webConfig, appConfig) {
        var requestUrl;
        if (window.cordova) {
            requestUrl = appConfig.url;
        } else {
            requestUrl = webConfig.url;
        }
        return {
            fetchMandatoryGoals: function() {
                return $http.post(requestUrl,{
                    action: "fetchmandatorygoals",
                })
            },
            addUserGoals: function() {

            },
            fetchUserGoals: function() {

            }
        }
    }]);
