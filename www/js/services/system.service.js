HeyCommunity

.service('SystemService', ['$http', function($http) {
    this.getSystemInfo = function() {
        return $http.get(getApiUrl('/system/info'));
    }
}])
