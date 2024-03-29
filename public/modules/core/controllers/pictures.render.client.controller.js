/**
 * Created by wilso_000 on 4/9/2015.
 */
'use strict';

angular.module('core')
.controller('PictureRenderController', ['$scope','$stateParams', 'Pictures', '$rootScope',
    function($scope, $stateParams, Pictures, $rootScope) {

        $scope.pictures = Pictures.query();
        $scope.albumFilter = $stateParams.albumId;
        $scope.pathname = $rootScope.mainAlbumDir + '/' + $stateParams.albumgroupName + '/' + $stateParams.albumName + '/';
    }
])

.directive('xxxxxxx', function() {
        return {
            restrict: 'E',
            template: '<div>{{albumFilter}}</div>'
        };
    })
;
