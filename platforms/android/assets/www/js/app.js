// Ionic Positivista App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'positivista' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'positivista.controllers' is found in controllers.js
angular.module('positivista', ['ionic', 'positivista.controllers'])
    .constant("webConfig", {
        "url": "/positivista/webservices/"
    })
    .constant("appConfig", {
        "url": "http://shashapp.net63.net/"
    })
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('');
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

        .state('app.playlists', {
            url: '/playlists',
            views: {
                'menuContent': {
                    templateUrl: 'templates/playlists.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })

        .state('app.single', {
            url: '/playlists/:playlistId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/playlist.html',
                    controller: 'PlaylistCtrl'
                }
            }
        })

        .state('setprofile', {
            url: '/setprofile',
            templateUrl: 'templates/setprofile.html',
            controller: 'SetProfileCtrl',
        })

        .state('mandgoal', {
            url: '/mandgoal',
            templateUrl: 'templates/mandgoal.html',
            controller: 'MandGoalsCtrl',
        })

        .state('usergoal', {
            url: '/usergoal',
            templateUrl: 'templates/usergoal.html',
            controller: 'UserGoalsCtrl',
        })

        .state('setreminder', {
            url: '/setreminder',
            templateUrl: 'templates/setreminder.html',
            controller: 'SetReminderCtrl',
        })

        .state('thankyou', {
            url: '/thankyou',
            templateUrl: 'templates/thankyou.html',
            controller: 'ThankYouCtrl',
        })

        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'AuthCtrl',
            controllerAs: 'authCtrl'
        })

        .state('forgotpassword', {
            url: '/forgotpassword',
            templateUrl: 'templates/forgotpassword.html',
            controller: 'AuthCtrl',
            controllerAs: 'authCtrl'
        })

        .state('app.homepage', {
            url: '/homepage',
            views: {
                'menuContent': {
                    templateUrl: 'templates/homepage.html',
                    controller: 'HomePageCtrl'
                }
            }
        })

        .state('app.managegoals', {
            url: '/managegoals',
            views: {
                'menuContent': {
                    templateUrl: 'templates/managegoals.html',
                    controller: 'ManageGoalsCtrl'
                }
            }
        })

        .state('app.managereport', {
            url: '/managereport',
            views: {
                'menuContent': {
                    templateUrl: 'templates/managereport.html',
                    controller: 'ManageReportCtrl'
                }
            }
        })

        .state('app.about', {
            url: '/about',
            views: {
                'menuContent': {
                    templateUrl: 'templates/about.html',
                    controller: 'AboutCtrl'
                }
            }
        })

        .state('app.manageprofile', {
            url: '/manageprofile',
            views: {
                'menuContent': {
                    templateUrl: 'templates/manageprofile.html',
                    controller: 'ManageProfileCtrl'
                }
            }
        })

        .state('app.managereminders', {
            url: '/managereminders',
            views: {
                'menuContent': {
                    templateUrl: 'templates/managereminders.html',
                    controller: 'ManageRemindersCtrl'
                }
            }
        })

        .state('app.settings', {
            url: '/settings',
            views: {
                'menuContent': {
                    templateUrl: 'templates/settings.html',
                    controller: 'SettingsCtrl'
                }
            }
        })

        .state('appinit', {
            url: '/appinit',
            templateUrl: function() {
                return 'templates/login.html';
            },
            controller: 'AuthCtrl',
            controllerAs: 'authCtrl'
        })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/appinit');
    });
