angular.module('positivista.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.visible = true;
    $scope.barHandle = function() {
        $scope.visible = !$scope.visible;
    }
})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
        title: 'Reggae',
        id: 1
    }, {
        title: 'Chill',
        id: 2
    }, {
        title: 'Dubstep',
        id: 3
    }, {
        title: 'Indie',
        id: 4
    }, {
        title: 'Rap',
        id: 5
    }, {
        title: 'Cowbell',
        id: 6
    }];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {})

.controller('HomePageCtrl', function($scope, $stateParams) {
    localStorage.setItem('currPage', 'app/homepage');
})

.controller('SetProfileCtrl', function($scope, $stateParams) {
    localStorage.setItem('currPage', 'setprofile');
})

.controller('MandGoalsCtrl', function($scope, $stateParams) {
    localStorage.setItem('currPage', 'mandgoal');
    $scope.goalList = [
        {
            "title":"Set clear goals?"
        },
        {
            "title":"Make progress towards goal achievements?"
        },
        {
            "title":"Find meaning?"
        },
        {
            "title":"Be happy?"
        },
        {
            "title":"Build positive relationships?"
        },
        {
            "title":"Be fully engaged?"
        }
    ];

    $scope.checkbox = [];
    for(var i=0; i<$scope.goalList.length; i++) {
        $scope.checkbox[i] = false;    
    }
    
    $scope.isChecked = function(index) {
        $scope.checkbox[index] = !$scope.checkbox[index];
    }

})

.controller('UserGoalsCtrl', function($scope, $stateParams) {
    localStorage.setItem('currPage', 'usergoal');
    $scope.goalList = [
        {
            "title":"Set clear goals?"
        },
        {
            "title":"Make progress towards goal achievements?"
        },
        {
            "title":"Find meaning?"
        },
        {
            "title":"Be happy?"
        },
        {
            "title":"Build positive relationships?"
        },
        {
            "title":"Be fully engaged?"
        }
    ]

    $scope.checkbox = [];
    for(var i=0; i<$scope.goalList.length; i++) {
        $scope.checkbox[i] = false;    
    }
    $scope.isChecked = function(index) {
        $scope.checkbox[index] = !$scope.checkbox[index];
    }
})

.controller('SetReminderCtrl', function($scope, $stateParams) {
    localStorage.setItem('currPage', 'setreminder');
})

.controller('ThankYouCtrl', function($scope, $stateParams) {
    localStorage.setItem('currPage', 'thankyou');
})

.controller('AuthCtrl', ['AlertService', 'UserService', '$location', '$scope', '$ionicPopup', function(AlertService, UserService, $location, $scope, $ionicPopup) {
    var self = $scope;
    this.master = {};
    if (localStorage.getItem('isLoggedIn')) {
        var currPage = localStorage.getItem('currPage');
        if (currPage) {
            $location.url(currPage);
        }
    }
    self.doLogin = function() {
        UserService.login(this.username, this.password).then(function(user) {
            user = JSON.parse(user);
            if (user.userId != null) {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userId', user.userId);
                $location.url('/setprofile');
            } else {
                alert("Login failed!");
            }

        }, function(err) {
            alert("Login failed!");
        });
    };
    self.doRegister = function() {
        UserService.register(this.username, this.password, this.email).then(function(user) {
            $location.path('/setprofile');
        }, function(err) {
            AlertService.set(err.data.msg);
        });
    };
    self.goToRegister = function() {
        $location.url("/register");
    };
    self.reset = function() {
        this.registerForm = angular.copy(this.master);
    }

}])
