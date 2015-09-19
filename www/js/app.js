// Ionic Positivista App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'positivista' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'positivista.controllers' is found in controllers.js
angular.module('positivista', ['ionic', 'positivista.controllers'])
.constant("webConfig", {
    "url":"/positivista/webservices/"
})
.constant("appConfig", {
    "url":"http://shashapp.net63.net/"
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

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
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

    .state('homepage', {
        url: '/homepage',
        templateUrl: function() {
          if(localStorage.getItem('isLoggedIn')) {
            var currPage = localStorage.getItem('currPage');
            if(currPage) {
                console.log("1111111   ", currPage);
                return 'templates/' + currPage;
            } else {
                console.log("2222222   homepage");
                return 'templates/homepage.html';
            }
          } else {
            return 'templates/login.html';
          }
        },
        controller: 'AuthCtrl',
        controllerAs: 'authCtrl'
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

    
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/homepage');
});
