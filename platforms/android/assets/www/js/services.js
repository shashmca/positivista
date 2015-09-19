angular.module('positivista')
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
    }).factory('StockService', ['$http', function($http) {
        return {
            query: function() {
                return $http.get('/api/stocks');
            },
            get: function(code) {
                return $http.get('/api/stocks/' + code);
            }
        };
    }]).factory('UserService', ['$http', '$q', 'webConfig', 'appConfig', function($http, $q, webConfig, appConfig) {
        var user = {};
        var loggedIn = false;
        var requestUrl;
        if (window.cordova) {
            requestUrl = appConfig.url;
        } else {
            requestUrl = webConfig.url;
        }
        var loginSuccess = function(resp) {
            if(resp.data.data) {
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
            register: function(username, pwd) {
                return $http.post(requestUrl, {
                    username: username,
                    password: pwd
                }).then(loginSuccess, loginFailure);
            },
            tokens: function() {
                if (loggedIn) {
                    return $q.when(user);
                } else {
                    return $http.post('/api/token', {}).then(loginSuccess, loginFailure);
                }
            }
        };
    }]);
