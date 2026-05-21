var app = angular.module('PROPSTOP', ['ui.bootstrap']);
app.controller('NotificationController', function ($scope, $http, $timeout) {
	$http.get('showNotifications').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length;
        $scope.totalItems = $scope.list.length;
    });
	$scope.show = function() {
		$http.get('showNotifications').success(function(data){
            $scope.list = data;
			$scope.currentPage = 1; 
			$scope.entryLimit = 10;
			$scope.filteredItems = $scope.list.length; 
			$scope.totalItems = $scope.list.length;
		});
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('BankController', function ($scope, $http, $timeout) {
	$http.get('showBanks').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length;
        $scope.totalItems = $scope.list.length;
    });
	$scope.show = function() {
		$http.get('showBanks').success(function(data){
            $scope.list = data;
			$scope.currentPage = 1; 
			$scope.entryLimit = 10;
			$scope.filteredItems = $scope.list.length; 
			$scope.totalItems = $scope.list.length;
		});
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('EmployeeController', function ($scope, $http, $timeout) {
	$http.get('showEmployees').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length;
        $scope.totalItems = $scope.list.length;
    });
	$scope.show = function() {
		$http.get('showEmployees').success(function(data){
            $scope.list = data;
			$scope.currentPage = 1; 
			$scope.entryLimit = 10;
			$scope.filteredItems = $scope.list.length; 
			$scope.totalItems = $scope.list.length;
		});
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('PropertyController', function ($scope, $http, $timeout) {
	$http.get('showProperties').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length;
        $scope.totalItems = $scope.list.length;
    });
	$scope.show = function() {
		$http.get('showProperties').success(function(data){
            $scope.list = data;
			$scope.currentPage = 1; 
			$scope.entryLimit = 10;
			$scope.filteredItems = $scope.list.length; 
			$scope.totalItems = $scope.list.length;
		});
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('LeadController', function ($scope, $http, $timeout) {
	$http.get('showLead').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length;
        $scope.totalItems = $scope.list.length;
    });
	$scope.show = function() {
		$http.get('showLead').success(function(data){
            $scope.list = data;
			$scope.currentPage = 1; 
			$scope.entryLimit = 10;
			$scope.filteredItems = $scope.list.length; 
			$scope.totalItems = $scope.list.length;
		});
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('SMLeadController', function ($scope, $http, $timeout) {
	$http.get('showAssignedLead').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length;
        $scope.totalItems = $scope.list.length;
    });
	$scope.show = function() {
		$http.get('showAssignedLead').success(function(data){
            $scope.list = data;
			$scope.currentPage = 1; 
			$scope.entryLimit = 10;
			$scope.filteredItems = $scope.list.length; 
			$scope.totalItems = $scope.list.length;
		});
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('LeadRptController', function ($scope, $http, $timeout) 
{
    $http({
        method: 'POST',
        url: 'showLead',
        data: 'stat=1&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showLead',
            data: 'stat=1&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date').value;
		var to_date=document.getElementById('to_date').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showLead',
            data: 'stat=1&from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('RequestedLeadController', function ($scope, $http, $timeout) {
	$http({
        method: 'POST',
        url: 'showLead',
        data: 'stat=2&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showLead',
            data: 'stat=2&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date1').value;
		var to_date=document.getElementById('to_date1').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showLead',
            data: 'stat=2&from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('RejectedLeadController', function ($scope, $http, $timeout) {
	$http({
        method: 'POST',
        url: 'showLead',
        data: 'stat=3&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showLead',
            data: 'stat=3&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date2').value;
		var to_date=document.getElementById('to_date2').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showLead',
            data: 'stat=3&from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('WebContactController', function ($scope, $http, $timeout) 
{
    $http({
        method: 'POST',
        url: 'showWebContactEnquiries',
        data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showWebContactEnquiries',
            data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date').value;
		var to_date=document.getElementById('to_date').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showWebContactEnquiries',
            data: 'from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('WebHomeLoanController', function ($scope, $http, $timeout) 
{
    $http({
        method: 'POST',
        url: 'showWebHomeLoanEnquiries',
        data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showWebHomeLoanEnquiries',
            data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date').value;
		var to_date=document.getElementById('to_date').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showWebHomeLoanEnquiries',
            data: 'from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('WebPropertyController', function ($scope, $http, $timeout) 
{
    $http({
        method: 'POST',
        url: 'showWebPropertyEnquiries',
        data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showWebPropertyEnquiries',
            data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date').value;
		var to_date=document.getElementById('to_date').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showWebPropertyEnquiries',
            data: 'from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('WebSiteVisitController', function ($scope, $http, $timeout) 
{
    $http({
        method: 'POST',
        url: 'showWebSiteVisitEnquiries',
        data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showWebSiteVisitEnquiries',
            data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date').value;
		var to_date=document.getElementById('to_date').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showWebSiteVisitEnquiries',
            data: 'from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('WebUserController', function ($scope, $http, $timeout) 
{
    $http({
        method: 'POST',
        url: 'showWebUsers',
        data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showWebUsers',
            data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date').value;
		var to_date=document.getElementById('to_date').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showWebUsers',
            data: 'from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('WebUserLoginController', function ($scope, $http, $timeout) 
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("username");
    // alert(username)
    $http({
        method: 'POST',
        url: 'showWebUserLogin',
        data: 'username='+username+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showWebUserLogin',
            data: 'username='+username+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date').value;
		var to_date=document.getElementById('to_date').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showWebUserLogin',
            data: 'username='+username+'&from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('WebCallbackController', function ($scope, $http, $timeout) 
{
    $http({
        method: 'POST',
        url: 'showWebCallbackEnquiries',
        data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showWebCallbackEnquiries',
            data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date').value;
		var to_date=document.getElementById('to_date').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showWebCallbackEnquiries',
            data: 'from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('BrokerPropertyController', function ($scope, $http, $timeout) {
	$http.get('showBrokerProperties').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length;
        $scope.totalItems = $scope.list.length;
    });
	$scope.show = function() {
		$http.get('showBrokerProperties').success(function(data){
            $scope.list = data;
			$scope.currentPage = 1; 
			$scope.entryLimit = 10;
			$scope.filteredItems = $scope.list.length; 
			$scope.totalItems = $scope.list.length;
		});
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('BrokerClientController', function ($scope, $http, $timeout) {
	$http.get('showClientProperties').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length;
        $scope.totalItems = $scope.list.length;
    });
	$scope.show = function() {
		$http.get('showClientProperties').success(function(data){
            $scope.list = data;
			$scope.currentPage = 1; 
			$scope.entryLimit = 10;
			$scope.filteredItems = $scope.list.length; 
			$scope.totalItems = $scope.list.length;
		});
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('CustomerPropertyController', function ($scope, $http, $timeout) {
	$http.get('showCustomerProperties').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length;
        $scope.totalItems = $scope.list.length;
    });
	$scope.show = function() {
		$http.get('showCustomerProperties').success(function(data){
            $scope.list = data;
			$scope.currentPage = 1; 
			$scope.entryLimit = 10;
			$scope.filteredItems = $scope.list.length; 
			$scope.totalItems = $scope.list.length;
		});
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('BrowsedController', function ($scope, $http, $timeout) 
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("username");
    // alert(username)
    $http({
        method: 'POST',
        url: 'showBrowsedProperties',
        data: 'username='+username+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showBrowsedProperties',
            data: 'username='+username+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date').value;
		var to_date=document.getElementById('to_date').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showBrowsedProperties',
            data: 'username='+username+'&from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});


app.controller('JobApplicationController', function ($scope, $http, $timeout) 
{
    $http({
        method: 'POST',
        url: 'showJobApplication',
        data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).then(function(response) 
    {
        $scope.list = response.data;
        $scope.currentPage = 1; 
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length; 
        $scope.totalItems = $scope.list.length;
    });
    $scope.show = function() {
        $http({
            method: 'POST',
            url: 'showJobApplication',
            data: 'csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
    };
	$scope.sort = function() {
		var from_date=document.getElementById('from_date').value;
		var to_date=document.getElementById('to_date').value;
        // alert(from_date)
        // alert(to_date)
        $http({
            method: 'POST',
            url: 'showJobApplication',
            data: 'from_date='+from_date+'&to_date='+to_date+'&csrfmiddlewaretoken=' + $('input[name=csrfmiddlewaretoken]').val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(function(response) 
        {
            $scope.list = response.data;
            $scope.currentPage = 1; 
            $scope.entryLimit = 10;
            $scope.filteredItems = $scope.list.length; 
            $scope.totalItems = $scope.list.length;
        });
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('JobDescriptionController', function ($scope, $http, $timeout) {
	$http.get('showJobDescription').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1;
        $scope.entryLimit = 10;
        $scope.filteredItems = $scope.list.length;
        $scope.totalItems = $scope.list.length;
    });
	$scope.show = function() {
		$http.get('showJobDescription').success(function(data){
            $scope.list = data;
			$scope.currentPage = 1; 
			$scope.entryLimit = 10;
			$scope.filteredItems = $scope.list.length; 
			$scope.totalItems = $scope.list.length;
		});
	};
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };
	$scope.clearFilter = function() {
		$scope.query = {};
    };
}).filter('startFrom', function() {
    return function(input, start) {
        if(input) {
			start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
}).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});