var app = angular.module("azzouz-fpl", []);
app.run(function ($rootScope, $http) {
    $http({
        method: 'GET',
        url: '/league-data/9908'
    }).then(function successCallback(response) {
        $rootScope.leaguePlayers = response.data
        console.log($rootScope.leaguePlayers)
    }, function errorCallback(response) {
        console.log(response)
    });
    $http({
        method: 'GET',
        url: 'https://fantasy.premierleague.com/drf/bootstrap-static'
    }).then(function successCallback(response) {
        console.log($rootScope.leaguePlayers)
    }, function errorCallback(response) {
        console.log(response)
    });
})
app.controller("mainCtrl", function ($scope, $http, $rootScope) {
    $scope.currentEvent = 21
    $scope.events = []
    $scope.leagueId = 9908;
    $rootScope.option = 0;
    $rootScope.gameweek = 0;
    
        $scope.setEvents = function (events, currentEvent) {
        events.length = 0;
        for (i = 1; i < currentEvent; i++) {
            events.push(i + 1)
        }
        $scope.currentEvent = currentEvent
    }
    
    
    $scope.setEvents($scope.events, $scope.currentEvent)
    $scope.maxi = function (x) {}


    $scope.isOption = function (str) {
        $scope.option == str;
        $scope.h2hData = undefined
        if (str == "cup") {
            $scope.leaguePlayersInCup($scope.leagueId)
        }
        if (str == "average") {
            $scope.gameweekAverage($scope.leagueId)
        }
        if (str == "highLow") {
            $scope.highestLowest($scope.leagueId)
        }
        if (str == "captains") {
            $scope.getCaptains($scope.leagueId)
        }
        if (str == "transfer") {
            $scope.getTransfers($scope.leagueId, 0)
        }
        if (str == "stats") {
//            $scope.TeamStats($scope.leagueId)
        }
    }
    $scope.getTeamStats = function (teamId) {
        $scope.loading = true
        $http({
            method: 'GET',
            url: '/team-stats/' + teamId
        }).then(function successCallback(response) {
            $scope.loading = false

            $scope.teamStats = response.data.data
        }, function errorCallback(response) {
            $scope.loading = false
            console.log(response)
        });
    }
    $scope.getTransfers = function (leagueId, gameweek) {
        $scope.loading = true
        $http({
            method: 'GET',
            url: '/transfers/' + (gameweek != 0 ? gameweek : $scope.currentEvent) + '/' + leagueId
        }).then(function successCallback(response) {
            $scope.loading = false

            $scope.playerTransfers = response.data.sort(compareTransfer)
        }, function errorCallback(response) {
            $scope.loading = false

            console.log(response)
        });
    }
    $scope.getCaptains = function (leagueId) {
        $scope.criteria = "captained";
        $scope.loading = true

        $http({
            method: 'GET',
            url: '/captains/' + leagueId + '/' + $scope.currentEvent
        }).then(function successCallback(response) {
            $scope.loading = false
            $scope.TeamCaptains = response.data
            $scope.playersCaptains = Object.entries($scope.TeamCaptains.groupBy('captain')).sort(compareByCaptains)
        }, function errorCallback(response) {
            $scope.loading = false

            console.log(response)
        });
    }
    $scope.sortCaptains = function (criteria) {
        if (criteria == "captained") {
            $scope.playersCaptains = Object.entries($scope.TeamCaptains.groupBy('captain')).sort(compareByCaptains)
        } else if (criteria == "score") {
            $scope.playersCaptains = $scope.TeamCaptains.sort(compare)
        }
        console.log($scope.playersCaptains)
    }
    $scope.inCup = function (cupStatus) {
        return cupStatus ? "" : "X"
    }
    $scope.gameweekAverage = function () {
        $scope.loading = true

        $http({
            method: 'GET',
            url: '/event-average'
        }).then(function successCallback(response) {
            $scope.loading = false


            $scope.averageData = response.data
        }, function errorCallback(response) {
            $scope.loading = false

            console.log(response)
        });
    }
    $scope.highestLowest = function (id) {
        $scope.loading = true

        $http({
            method: 'GET',
            url: '/lowest-highest/' + id
        }).then(function successCallback(response) {
            $scope.loading = false

            $scope.highestGameweek = response.data.sort(compareGameweek)[0]
            $scope.lowesttGameweek = response.data.sort(compareBench)[0]


            console.log()
        }, function errorCallback(response) {
            $scope.loading = false
            console.log(response)
        });
    }

    $scope.leaguePlayersInCup = function (leagueId) {
        $scope.loading = true
        $http({
            method: 'GET',
            url: '/cup/' + leagueId
        }).then(function successCallback(response) {
            $scope.loading = false

            $scope.leaguePlayersInCup = response.data
        }, function errorCallback(response) {
            $scope.loading = false

            console.log(response)
        });
    }
    $scope.h2h = function (x, y) {

        if (x == undefined || y == undefined) {
            alert('a5tar equipe yazzebi!')
        } else if (x == y) {
            alert('Ta5tar fi nafs joueur ya3tek 3asba')
        } else {
            $http({
                method: 'GET',
                url: '/h2h/' + x + '/' + y
            }).then(function successCallback(response) {
                $scope.h2hData = response.data
                console.log(response)
            }, function errorCallback(response) {
                console.log(response)
            });
        }
    }

    function compareGameweek(a, b) {
        if (a.data.maxGameweekPoints.value < b.data.maxGameweekPoints.value)
            return -1;
        if (a.data.maxGameweekPoints.value > b.data.maxGameweekPoints.value)
            return 1;
        return 0;
    }
    function compareBench(a, b) {
        if (a.data.maxBenchedPoints.value < b.data.maxBenchedPoints.value)
            return -1;
        if (a.data.maxBenchedPoints.value > b.data.maxBenchedPoints.value)
            return 1;
        return 0;
    }

    $scope.setCurrentEvent = function (currentEvent, code) {
        if (code != "azz54070") {
            alert('incorrect code, check with azzouz')
        } else {
            $http({
                method: 'GET',
                url: '/set-current-event/' + currentEvent
            }).then(function successCallback(response) {
                $scope.setEvents($scope.events, currentEvent)

                console.log('5++++++++++++++++++++++++++++++++++++++++++++++++++5')
                console.log($scope.events)
                console.log('5++++++++++++++++++++++++++++++++++++++++++++++++++5')

            }, function errorCallback(response) {
                console.log(response)
            });
        }

    }
});

function compare(a, b) {
    if (a.captainScore > b.captainScore)
        return -1;
    if (a.captainScore < b.captainScore)
        return 1;

    if (a.captainScore == b.captainScore) {
        if (a.captain < b.captain) {
            return -1;
        }
        if (a.captain > b.captain) {
            return 1;
        }
        return 0;
    }
}
function compareTransfer(a, b) {
    if (a.transfers.length > b.transfers.length)
        return -1;
    if (a.transfers.length < b.transfers.length)
        return 1;
    return 0;
}

function compareByCaptains(a, b) {
    if (a[1].length > b[1].length)
        return -1;
    if (a[1].length < b[1].length)
        return 1;
    return 0;
}

Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        var val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
};
    