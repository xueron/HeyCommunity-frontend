HeyCommunity

.service('UserSignInService', ['$http', '$rootScope', 'UserService', 'NoticeService', '$state', function($http, $rootScope, UserService, NoticeService, $state) {
    var self = this;

    self.isSignInPanel = true;
    self.isForgotPanel = false;
    self.isResetPasswordPanel = false;

    //
    //
    self.signIn = function() {
        var params = {
            phone: self.phone,
            password: self.password,
        }
        UserService.signIn(params).then(function(response) {
            if (response.status === 200) {
                $rootScope.userInfo = response.data;

                $rootScope.loadingShowDisabled = true;
                NoticeService.index();

                $rootScope.signInModal.hide();
            } else {
                var content = $rootScope.filter('translate')('PHONE_OR_PASSWORD_ERROR');
                $rootScope.utility.showAlert({title: $rootScope.filter('translate')('ERROR'), content: content});
            }
        });
    }



    //
    //
    self.forgotVerifyCaptcha = function() {
        var params = {
            phone: self.phone,
            captcha: self.captcha,
        }
        $rootScope.CaptchaService.verifyCaptcha(params).then(function(response) {
            if (response.status === 200) {
                self.goToResetPasswordPanel();
            }
        });
    }



    //
    //
    self.resetPassword = function() {
        var params = {
            phone: self.phone,
            new_password: self.newPassword,
        }
        var q = $http.post(getApiUrl('/user/reset-password'), params);
        q.then(function(response) {
            if (response.status === 200) {
                $rootScope.utility.showNoticeSuccess();
                $rootScope.utility.showNoticeText($rootScope.filter('translate')('PLEASE_SIGNIN_AGAIN'));
                $rootScope.signInModal.hide();
            }
        }, function(response) {
            $rootScope.utility.showNoticeFail();
        });
    }



    //
    //
    self.goToSignInPanel= function() {
        self.isSignInPanel = true;
        self.isForgotPanel = false;
        self.isResetPasswordPanel = false;
    }



    //
    //
    self.goToForgotPanel = function() {
        self.isSignInPanel = false;
        self.isForgotPanel = true;
        self.isResetPasswordPanel = false;
    }



    //
    //
    self.goToResetPasswordPanel = function() {
        self.isSignInPanel = false;
        self.isForgotPanel = false;
        self.isResetPasswordPanel = true;
    }
}])
