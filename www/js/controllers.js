angular.module('positivista.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.visible = true;

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.barHandle = function() {
    $scope.visible = !$scope.visible;
  }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('HomePageCtrl', function($scope, $stateParams) {

})
.controller('SetProfileCtrl', function($scope, $stateParams) {
  localStorage.setItem('currPage' , 'setprofile.html');
})
.controller('MandGoalsCtrl', function($scope, $stateParams) {
  localStorage.setItem('currPage' , 'mandgoal.html');
})
.controller('UserGoalsCtrl', function($scope, $stateParams) {
  localStorage.setItem('currPage' , 'usergoal.html');
})
.controller('SetReminderCtrl', function($scope, $stateParams) {
  localStorage.setItem('currPage' , 'setreminder.html');
})
.controller('ThankYouCtrl', function($scope, $stateParams) {
  localStorage.setItem('currPage' , 'thankyou.html');
})
.controller('AuthCtrl', ['AlertService', 'UserService', '$location', '$scope', function(AlertService, UserService, $location, $scope) {
  var self = $scope;
  if(localStorage.getItem('isLoggedIn')) {
    localStorage.setItem('currPage' , 'homepage.html');
  }
  self.doLogin = function() {
    UserService.login(this.username, this.password).then(function(user) {
      user = JSON.parse(user);
      if(user.userId != null) {
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
  self.register = function() {
    UserService.register(self.username, self.password).then(function(user) {
      $location.path('/setprofile');
    }, function(err) {
      AlertService.set(err.data.msg);
    });
  };
}])
