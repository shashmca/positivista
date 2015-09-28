angular.module('positivista.controllers', [])

.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$location', 'SessionService', function($scope, $ionicModal, $timeout, $location, SessionService) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    if (SessionService.isLoggedInUser()) {
        $scope.doLogout = function() {
            if (confirm("Are you sure to logout?")) {
                localStorage.clear();
                $location.url("/appinit");
            }
        }
    } else {
        $location.url("/appinit");
    }


}])


.controller('HomePageCtrl', ['$scope', '$location', '$stateParams', function($scope, $location, $stateParams) {
    localStorage.setItem('currPage', 'app/homepage');

    $scope.goToMangeGoals = function() {
        $location.url('/app/managegoals');
    }

}])

.controller('ManageGoalsCtrl', ['$scope', function($scope, $stateParams) {
    var goalList = [{
        "title": "Set clear goals?"
    }, {
        "title": "Make progress towards goal achievements?"
    }, {
        "title": "Find meaning?"
    }, {
        "title": "Be happy?"
    }, {
        "title": "Build positive relationships?"
    }, {
        "title": "Be fully engaged?"
    }];

    $scope.groups = [];
    for (var i = 0; i < goalList.length; i++) {
        $scope.groups[i] = {
            name: goalList[i].title,
            items: []
        };
        for (var j = 0; j < 1; j++) {
            $scope.groups[i].items.push(i + '-' + j);
        }
    }

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
}])

.controller('SetProfileCtrl', ['GetUserInfo', 'ConvertImage', 'AlertService', 'UserService', '$location', '$scope', '$ionicPopup', 'SessionService', function(GetUserInfo, ConvertImage, AlertService, UserService, $location, $scope, $ionicPopup, SessionService) {
    if (SessionService.isLoggedInUser()) {
        localStorage.setItem('currPage', 'setprofile');

        var userId = localStorage.getItem('userId');
        if (!userId) {
            userId = GetUserInfo.getUserId();
        }


        if (localStorage.getItem('profileName') && localStorage.getItem('profileStatus') && localStorage.getItem('profileImg')) {
            $scope.profileName = localStorage.getItem('profileName');
            $scope.profileStatus = localStorage.getItem('profileStatus');
            $scope.imgSrc = localStorage.getItem('profileImg');
        } else {
            GetUserInfo.getProfileData().then(function(data) {
                    if (data != "null") {
                        data = JSON.parse(data);
                        $scope.profileName = data.profileName;
                        $scope.profileStatus = data.profileStatus;
                        if (data.profileImg) {
                            $scope.imgSrc = data.profileImg;
                        } else {
                            $scope.imgSrc = "../../cat.png";
                        }
                    } else {
                        $scope.profileName = "";
                        $scope.profileStatus = "";
                        $scope.imgSrc = "../../cat.png";
                    }
                },
                function(err) {
                    $scope.profileName = "";
                    $scope.profileStatus = "";
                    $scope.profileImg = "";
                })
        }

        $scope.saveProfileData = function() {
            if (this.profileName) {
                localStorage.setItem("profileName", this.profileName);
            }
            if (this.profileStatus) {
                localStorage.setItem("profileStatus", this.profileStatus);
            }

            UserService.updateProfile(this.profileName, this.profileStatus, userId).then(function(user) {
                console.log("Profile updated successfully");
            }, function(err) {
                console.log("Profile update failed");
            });

        }

        $scope.saveProfileImage = function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    var imgPath = e.target.result;
                    localStorage.setItem("profileImg", imgPath);
                    $scope.imgSrc = imgPath;
                    $scope.$apply();
                    UserService.updateProfileImg(imgPath, userId).then(function(user) {
                        console.log("Profile image updated successfully");
                    }, function(err) {
                        console.log("Profile image update failed");
                    });
                }

                reader.readAsDataURL(input.files[0]);
            }
        }
    } else {
        $location.url("/appinit");
    }

}])

.controller('MandGoalsCtrl', ['$location', '$scope', '$stateParams', 'GoalService', 'SessionService', function($location, $scope, $stateParams, GoalService, SessionService) {
    if (SessionService.isLoggedInUser()) {
        localStorage.setItem('currPage', 'mandgoal');
        GoalService.fetchMandatoryGoals().then(function(succObj) {
                $scope.goalList = JSON.parse(succObj.data.data);
                $scope.checkbox = [];
                for (var i = 0; i < $scope.goalList.length; i++) {
                    $scope.checkbox[i] = false;
                }
            },
            function(err) {

            })


        /*[{
            "title": "Set clear goals?"
        }, {
            "title": "Make progress towards goal achievements?"
        }, {
            "title": "Find meaning?"
        }, {
            "title": "Be happy?"
        }, {
            "title": "Build positive relationships?"
        }, {
            "title": "Be fully engaged?"
        }];*/



        $scope.isChecked = function(index) {
            $scope.checkbox[index] = !$scope.checkbox[index];
        }
    } else {
        $location.url("/appinit");
    }

}])

.controller('UserGoalsCtrl', ['SessionService', '$location', '$scope', function(SessionService, $location, $scope, $stateParams) {
    if (SessionService.isLoggedInUser()) {
        localStorage.setItem('currPage', 'usergoal');
        $scope.goalList = [{
            "title": "Set clear goals?"
        }, {
            "title": "Make progress towards goal achievements?"
        }, {
            "title": "Find meaning?"
        }, {
            "title": "Be happy?"
        }, {
            "title": "Build positive relationships?"
        }, {
            "title": "Be fully engaged?"
        }]

        $scope.checkbox = [];
        for (var i = 0; i < $scope.goalList.length; i++) {
            $scope.checkbox[i] = false;
        }
        $scope.isChecked = function(index) {
            $scope.checkbox[index] = !$scope.checkbox[index];
        }
    } else {
        $location.url("/appinit");
    }
}])

.controller('SetReminderCtrl', ['SessionService', '$location', '$scope', function(SessionService, $location, $scope, $stateParams) {
    if (SessionService.isLoggedInUser()) {
        localStorage.setItem('currPage', 'setreminder');
    } else {
        $location.url("/appinit");
    }
}])

.controller('ThankYouCtrl', ['GetUserInfo','SessionService', '$location', '$scope', function(GetUserInfo, SessionService, $location, $scope, $stateParams) {
    if (SessionService.isLoggedInUser()) {
        localStorage.setItem('currPage', 'thankyou');

        var userId = localStorage.getItem('userId');
        if (!userId) {
            userId = GetUserInfo.getUserId();
        }


        if (localStorage.getItem('profileName') && localStorage.getItem('profileImg')) {
            $scope.profileName = localStorage.getItem('profileName');
            $scope.imgSrc = localStorage.getItem('profileImg');
        } else {
            GetUserInfo.getProfileData().then(function(data) {
                    if (data != "null") {
                        data = JSON.parse(data);
                        $scope.profileName = data.profileName;
                        if (data.profileImg) {
                            $scope.imgSrc = data.profileImg;
                        } else {
                            //$scope.imgSrc = "../../cat.png";
                        }
                    } else {
                        $scope.profileName = "";
                        //$scope.imgSrc = "../../cat.png";
                    }
                },
                function(err) {
                    $scope.profileName = "";
                    $scope.profileImg = "";
                })
        }
    } else {
        $location.url("/appinit");
    }
}])

.controller('ManageReportCtrl', ['$location', '$scope', function($location, $scope, $stateParams) {

}])

.controller('AboutCtrl', ['$location', '$scope', function($location, $scope, $stateParams) {

}])

.controller('ManageProfileCtrl', ['GetUserInfo', 'ConvertImage', 'AlertService', 'UserService', '$location', '$scope', '$ionicPopup', 'SessionService', function(GetUserInfo, ConvertImage, AlertService, UserService, $location, $scope, $ionicPopup, SessionService) {
    if (SessionService.isLoggedInUser()) {
        localStorage.setItem('currPage', 'setprofile');

        var userId = localStorage.getItem('userId');
        if (!userId) {
            userId = GetUserInfo.getUserId();
        }


        if (localStorage.getItem('profileName') && localStorage.getItem('profileStatus') && localStorage.getItem('profileImg')) {
            $scope.profileName = localStorage.getItem('profileName');
            $scope.profileStatus = localStorage.getItem('profileStatus');
            $scope.imgSrc = localStorage.getItem('profileImg');
        } else {
            GetUserInfo.getProfileData().then(function(data) {
                    if (data != "null") {
                        data = JSON.parse(data);
                        $scope.profileName = data.profileName;
                        $scope.profileStatus = data.profileStatus;
                        if (data.profileImg) {
                            $scope.imgSrc = data.profileImg;
                        } else {
                            $scope.imgSrc = "../../cat.png";
                        }
                    } else {
                        $scope.profileName = "";
                        $scope.profileStatus = "";
                        $scope.imgSrc = "../../cat.png";
                    }
                },
                function(err) {
                    $scope.profileName = "";
                    $scope.profileStatus = "";
                    $scope.profileImg = "";
                })
        }

        $scope.saveProfileData = function() {
            if (this.profileName) {
                localStorage.setItem("profileName", this.profileName);
            }
            if (this.profileStatus) {
                localStorage.setItem("profileStatus", this.profileStatus);
            }

            UserService.updateProfile(this.profileName, this.profileStatus, userId).then(function(user) {
                console.log("Profile updated successfully");
            }, function(err) {
                console.log("Profile update failed");
            });

        }

        $scope.saveProfileImage = function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    var imgPath = e.target.result;
                    localStorage.setItem("profileImg", imgPath);
                    $scope.imgSrc = imgPath;
                    $scope.$apply();
                    UserService.updateProfileImg(imgPath, userId).then(function(user) {
                        console.log("Profile image updated successfully");
                    }, function(err) {
                        console.log("Profile image update failed");
                    });
                }

                reader.readAsDataURL(input.files[0]);
            }
        }
    } else {
        $location.url("/appinit");
    }

}])

.controller('ManageRemindersCtrl', ['$location', '$scope', function($location, $scope, $stateParams) {

}])

.controller('SettingsCtrl', ['$location', '$scope', function($location, $scope, $stateParams) {

}])

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
            user = JSON.parse(user);
            if (user.userId != null) {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userId', user.userId);
                $location.url('/setprofile');
            } else {
                alert("Registration failed!");
            }

        }, function(err) {
            AlertService.set(err.data.msg);
        });
    };
    self.goToRegister = function() {
        $location.url("/register");
    };
    self.goToLogin = function() {
        $location.url("/appinit");
    }

    self.forgotPassword = function() {
        UserService.fgtpassword(this.email).then(function(data) {
                alert(data.data.status_message);
            },
            function(err) {
                alert(data.data.status_message);
            });
    }

}])
