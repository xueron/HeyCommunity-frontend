HeyCommunity

// tab.topic
.controller('TopicCtrl', ['$scope', 'TopicService', function($scope, TopicService) {
    $scope.$root.loadingShowDisabled = true;
    TopicService.index({type: 'refresh'});

    //
    // do refresh
    $scope.doRefresh = function() {
        $scope.$root.loadingShowDisabled = true;

        var params = {
            type:   'refresh',
        }
        TopicService.index(params).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    //
    // load more
    $scope.loadMore = function() {
        $scope.$root.loadingShowDisabled = true;

        var params = {
            type:   'infinite',
        }
        TopicService.index(params).then(function(response) {
            if (response.status == 200) {
                if (response.data.length <= 0) {
                    $scope.loadMoreDisabled = true;
                }
            }
        }).finally(function() {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }


    //
    // create
    $scope.create = function() {
        if (!$scope.utility.please_login_first()) {
            $scope.state.go('hey.topic-create');
        }
    }
}])



// tab.topic-detail
.controller('TopicDetailCtrl', ['$scope', 'TopicService', '$ionicActionSheet', '$ionicHistory', function($scope, TopicService, $ionicActionSheet, $ionicHistory) {
    var topicIndex = $scope.stateParams.id;
    var topicId = $scope.stateParams.topicId;

    $scope.TopicService = TopicService;
    TopicService.currentTopic = {};
    $scope.TopicComment = {};

    if (TopicService.topics !== undefined) {
        TopicService.currentTopic = $scope.filter('orderBy')(TopicService.topics, ['-is_top', '-created_at'])[$scope.stateParams.id];
        TopicService.currentTopicIndex = $scope.stateParams.id;
        TopicService.currentTopicId = $scope.stateParams.topicId;
    }

    //
    //
    $scope.$root.loadingShowDisabled = true;
    TopicService.show({id: $scope.stateParams.topicId}).then(function(response) {
        if (response.status === 200) {
            TopicService.currentTopic = response.data;
        }
    });


    $scope.commentPublish = function() {
        var params = {
            id: $scope.stateParams.topicId,
            content: $scope.TopicComment.content,
        }
        TopicService.commentPublish(params).then(function(response) {
            if (response.status == 200) {
                $scope.TopicComment.content = '';
            }
        });
    }

    $scope.destroy = function() {
        var data = {
            title: $scope.filter('translate')('ALERT'),
            content: $scope.filter('translate')('ARE_YOU_SURE_DESTROY_IT'),
        }

        $scope.utility.showConfirm(data, function() {
            var params = {
                id: $scope.stateParams.topicId,
            }
            TopicService.destroy(params).then(function(response) {
                if (response.status === 200) {
                    $scope.state.go('hey.topic', {}, {reload: true});
                } else {
                    $scope.utility.showNoticeFail();
                }
            });

        }, function() {
        });
    }

    //
    $scope.showActionSheet = function() {
        var buttons = [{
            text: $scope.filter('translate')('REPORT')
        }];
        if ($scope.utility.isAdmin()) {
            if (TopicService.currentTopic.is_top) {
                buttons.push({
                    text: $scope.filter('translate')('CANCEL_TOP')
                });
            } else {
                buttons.push({
                    text: $scope.filter('translate')('SET_TOP')
                });
            }

            if (TopicService.currentTopic.is_excellent) {
                buttons.push({
                    text: $scope.filter('translate')('CANCEL_EXCELLENT')
                });
            } else {
                buttons.push({
                    text: $scope.filter('translate')('SET_EXCELLENT')
                });
            }
        }
        var config = {
            buttons: buttons,
            titleText: $scope.filter('translate')('MANAGEMENT_OPERATIONS'),
            cancelText: $scope.filter('translate')('CANCEL'),
            cancel: function() {
            },
            buttonClicked: function(index) {
                if (index === 0) {
                    $scope.reportModal.show();
                } else if (index === 1) {
                    $scope.TopicService.toggleTop();
                } else if (index === 2) {
                    $scope.TopicService.toggleExcellent();
                }
                hideSheet();
            },
            destructiveButtonClicked: function(index) {
                $scope.destroy();
                hideSheet();
            },
        }

        if ($scope.utility.isAdmin()) {
            config.destructiveText = $scope.filter('translate')('DESTROY');
        }

        var hideSheet = $ionicActionSheet.show(config);

        $scope.timeout(function() {
            hideSheet();
        }, 6000);
    };
}])



// tab.topic-create
.controller('TopicCreateCtrl', ['$scope', 'TopicService', 'Upload', function($scope, TopicService, Upload) {
    $scope.topic = {};

    $scope.store = function() {
        var params = {
            title: $scope.topic.title,
            // avatar: $scope.topic.avatar,
            content: $scope.topic.content,
        }

        console.debug('### TopicService.store params', params);
        TopicService.store(Upload, params).then(function(response) {
            console.debug('### TopicService.store response', response);
            if (response.status == 200) {
                $scope.state.go('hey.topic', {}, {reload: true});
            } else {
                $scope.utility.showAlert({title: $scope.filter('translate')('ERROR'), content: response.data});
            }
        });
    }
}])
