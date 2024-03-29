'use strict';

// App setups controller
angular.module('app-setups').controller('AppSetupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'AppSetups', 'Albums',
	function($scope, $stateParams, $location, Authentication, AppSetups, Albums) {
		$scope.authentication = Authentication;

		// Create new App setup
		$scope.create = function() {
			// Create new App setup object
			var appSetup = new AppSetups ({
				name: this.name,
				description: this.description,
				value: this.value
			});

			// Redirect after save
			appSetup.$save(function(response) {
				$location.path('app-setups');

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
				$scope.value = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing App setup
		$scope.remove = function(appSetup) {
			if ( appSetup ) { 
				appSetup.$remove();

				for (var i in $scope.appSetups) {
					if ($scope.appSetups [i] === appSetup) {
						$scope.appSetups.splice(i, 1);
					}
				}
			} else {
				$scope.appSetup.$remove(function() {
					$location.path('app-setups');
				});
			}
		};

		// Update existing App setup
		$scope.update = function() {
			var appSetup = $scope.appSetup;

			appSetup.$update(function() {
				$location.path('app-setups');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of App setups
		$scope.find = function() {
			$scope.appSetups = AppSetups.query();
		};

		// Find existing App setup
		$scope.findOne = function() {
			$scope.appSetup = AppSetups.get({ 
				appSetupId: $stateParams.appSetupId
			});
		};

        $scope.displayed = [].concat($scope.appSetups);
        $scope.albums = Albums.query();
	}
])
.directive('myValue', function() {
    return {
        scope: {
            xName: '=xname',
            xAlbum: '=xalbum'
        },
        link: function (scope, element, attrs) {
            // now do stuff with the number, you can access it through the scope
            //scope.xName // contains the number
        },
        templateUrl: function (scope, element, attrs) {
            return 'modules/app-setups/views/entry-value-Carousel Album.client.view.html';
        }
    };
})

.directive('myDir', function() {
    return {
        template: 'modules/app-setups/views/entry-value-{{appSetup.name}}.client.view.html'
    };
})
;

