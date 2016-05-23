HeyCommunity

.service('TopicService', ['$http', '$rootScope', 'UtilityService',  function($http, $rootScope, UtilityService) {
    //
    //
    var self = this;
    self.topics = [];
    self.currentTopic = undefined;
    self.currentTopicId = undefined;
    self.currentTopicIndex = undefined;


    //
    //
    self.saveInLocalStorage = function() {
        localStorage.topics = JSON.stringify(self.topics);
    }


    //
    //
    self.getByLocalStorage = function() {
        if (localStorage.topics) {
            self.topics = JSON.parse(localStorage.topics);
        }
    }


    //
    // index
    self.index = function(params) {
        var url = getApiUrl('/topic');
        if (typeof(params) == 'object' && 'type' in params && self.topics.length > 0) {
            if (params.type === 'refresh') {
                var id = $rootScope.filter('orderBy')(self.topics, '-id')[0].id;
                url = url + '?type=' + params.type + '&id=' + id;
            } else if (params.type === 'infinite') {
                var id = $rootScope.filter('orderBy')(self.topics, 'id')[0].id;
                url = url + '?type=' + params.type + '&id=' + id;
            }
        }

        var q = $http.get(url);
        q.then(function(response) {
            if (response.status == 200) {
                self.topics = self.topics.concat(response.data);

                self.saveInLocalStorage();
            } else {
                UtilityService.showNoticeFail();
            }
        })

        return q;
    }


    //
    // store
    self.store = function(http, params) {
        var q = http.upload({
            url: getApiUrl('/topic/store'),
            data: params
        });
        q.then(function(response) {
            //
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }


    //
    // destory
    self.destroy = function(params) {
        var q = $http.post(getApiUrl('/topic/destroy'), params);
        q.then(function(response) {
            if (response.status == 200) {
                delete self.topics.splice(self.currentTopicIndex, 1);

                self.saveInLocalStorage();
            }
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }


    //
    // show
    self.show = function(params) {
        var q = $http.get(getApiUrl('/topic/show/' + params.id));
        q.then(function(response) {
            if (response.status === 200) {
                angular.forEach(self.topics, function(value, key) {
                    if (value.id === response.data.id) {
                        self.topics[key] = response.data;
                    }
                });

                self.saveInLocalStorage();
            }
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }


    //
    // comment
    self.commentPublish = function(params) {
        var q = $http.post(getApiUrl('/topic/comment-publish'),  params);
        q.then(function(response) {
            if (response.status === 200) {
                self.currentTopic = response.data;
                self.topics[self.currentTopicIndex] = response.data;

                self.saveInLocalStorage();
            }
        }, function() {
            UtilityService.showNoticeFail();
        })

        return q;
    }



    //
    // toggle Top
    self.toggleTop = function() {
        var params = {
            id: self.currentTopicId,
        }
        var q = $http.post(getApiUrl('/topic/toggle-top'), params);
        q.then(function(response) {
            if (response.status === 200) {
                self.currentTopic = response.data;
                self.topics[self.currentTopicIndex] = response.data;

                self.saveInLocalStorage();
            }
        });

        return q;
    }



    //
    // toggle Excellent
    self.toggleExcellent = function() {
        var params = {
            id: self.currentTopicId,
        }
        var q = $http.post(getApiUrl('/topic/toggle-excellent'), params);
        q.then(function(response) {
            if (response.status === 200) {
                self.currentTopic = response.data;
                self.topics[self.currentTopicIndex] = response.data;

                self.saveInLocalStorage();
            }
        });

        return q;
    }



    //
    // vote up
    self.voteUp = function() {
        var params = {
            id: self.currentTopicId,
        }
        var q = $http.post(getApiUrl('/topic/vote-up'), params);
        q.then(function(response) {
            if (response.status === 200) {
                self.currentTopic = response.data;
                self.topics[self.currentTopicIndex] = response.data;

                self.saveInLocalStorage();
            }
        });

        return q;
    }



    //
    // vote down
    self.voteDown = function() {
        var params = {
            id: self.currentTopicId,
        }
        var q = $http.post(getApiUrl('/topic/vote-down'), params);
        q.then(function(response) {
            if (response.status === 200) {
                self.currentTopic = response.data;
                self.topics[self.currentTopicIndex] = response.data;

                self.saveInLocalStorage();
            }
        });

        return q;
    }

}])
