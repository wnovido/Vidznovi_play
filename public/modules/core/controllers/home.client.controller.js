'use strict';


angular.module('core').controller('HomeController', ['$scope', '$animate', 'Authentication', 'Albums', 'Albumgroups', 'Pictures',
	function($scope, $animate, Authentication, Albums, Albumgroups, Pictures) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$animate.enabled(false);

		$scope.myInterval = 5000;

		$scope.tabs = Albumgroups.query();
		$scope.albums = Albums.query();
		$scope.slides = Pictures.query();

		// Find existing Picture
		$scope.initImg = function(_id) {
			var album = Albums.get({
				albumId: _id
			});

			album.$promise.then(function(data) {
				$scope.albumName = data.name;

				var albumgroup = Albumgroups.get({
					albumgroupId: data.albumgroup
				});

				albumgroup.$promise.then(function(data) {
					$scope.albumgroupName = data.name;
				});
			});

			//console.log(album.$promise.name);

			//$scope.albumgroup = Albumgroups.get({
			//	albumgroupId: album.albumgroup
			//});

		};
	}
]);
