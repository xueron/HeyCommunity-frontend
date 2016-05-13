HeyCommunity

.service('CaptchaService', ['$http', '$rootScope', function($http, $rootScope) {
    var self = this;

    self.getCaptchaBtnDefaultText = 'GET_CAPTCHA';
    self.getCaptchaBtnText = 'GET_CAPTCHA';
    self.getCaptchaValid = true;



    //
    // get captcha
    self.getCaptcha = function(params) {
        if (self.getCaptchaValid) {
            var q = $http.post(getApiUrl('/user/get-captcha'), params);
            q.then(function(response) {
                if (response.status === 200) {
                    self.getCaptchaValid = false;
                    getCaptchaTimeout(60);
                } else {
                    var content = typeof response.data === 'string' ? response.data : response.data.phone[0];
                    $rootScope.utility.showAlert({title: $rootScope.filter('translate')('ERROR'), content: content});
                }
            });
            return q;
        }
    }



    //
    //
    var getCaptchaTimeout = function(second) {
        if (second > 0) {
            self.getCaptchaBtnText = second + 's';
            $rootScope.timeout(function() {
                getCaptchaTimeout(second - 1)
            }, 1000);
        } else {
            self.getCaptchaBtnText = self.getCaptchaBtnDefaultText;
            self.getCaptchaValid = true;
        }
    }



    //
    // sign up verify
    self.verifyCaptcha = function(params) {
        var q = $http.post(getApiUrl('/user/verify-captcha'), params);
        q.then(function(response) {
            if (response.status === 200) {
            } else {
                var content = typeof response.data === 'string' ? response.data : response.data.captcha[0];
                $rootScope.utility.showAlert({title: $rootScope.filter('translate')('ERROR'), content: content});
            }
        });
        return q;
    }
}])
