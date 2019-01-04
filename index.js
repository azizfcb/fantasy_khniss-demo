var azifpl = require('azifpl');
var express = require('express');
var app = express();
var scheduler = require('node-schedule');
var fs = require('fs');//var currentEvent = 19;
var port = process.env.PORT || 8080;
var currentEvent = 21;
var finishedEvent = false;
var transfers = require('./archive.json')

app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    console.log('-----------------------------------------------------------------------------------------------------------------------')
    // do something with the request
    console.log("ip adresse ---->" + req.connection.remoteAddress)
    console.log("path ------>" + req.path)
    console.log('-----------------------------------------------------------------------------------------------------------------------')

    next(); // MUST call this or the routes will not be hit
});
function leaguePlayers(id, callback) {
    azifpl.getClassicLeagueTopTenPlayers(id).then(function (res) {
        callback(res)
    }, function (err) {
        callback(err)
    })
}
function comparaison(id1, id2, callback) {
    azifpl.TwoTeamsH2H(id1, id2).then(function (res) {
        callback(res)
    }, function (err) {
        callback(err)
    })
}
function cupLeagueStats(id, callback) {
    azifpl.getCupTeams(id).then(function (res) {
        callback(res)
    }, function (err) {
        callback(err)
    })
}
function gameweekAverage(callback) {
    azifpl.gameweekAverage().then(function (res) {
        callback(res)
    }, function (err) {
        callback(err)
    })
}
function highestLowest(id, callback) {
    azifpl.highestLowest(id).then(function (res) {
        callback(res)
    }, function (err) {
        callback(err)
    })
}
function teamStats(id, callback) {
    azifpl.teamStats(id).then(function (res) {
        callback(res)
    }, function (err) {
        callback(err)
    })
}
function getCaptains(leagueId, event, callback) {


    azifpl.getCaptains(leagueId, event).then(function (res) {
        callback(res)
    }, function (err) {
        callback(err)
    })
}
function getTransfers(event, leagueId, callback) {

    if (event == currentEvent && !finishedEvent ){

        azifpl.getTransfersList(event, leagueId).then(function (res) {
            if (!JSON.stringify(res).includes(429)) {
                transfers[event - 2] = res
                fs.writeFile('archive.json', JSON.stringify(transfers), function (err) {
                    if (err != null) {
                        console.log(err)
                    } else {
                        console.log('file success saved!');
                    }
                });
            }
            callback(res)
        }, function (err) {
            callback(err)
        })
    } else {
        callback(transfers[event - 2])
    }
}
app.get('/set-current-event/:current_event/:finished', function (req, res) {
    currentEvent = req.params.current_event
    finishedEvent = req.params.current_event
    res.send({success: true});
})
app.get('/league-data/:leagueId', function (req, res) {
    leaguePlayers(req.params.leagueId, function (x) {
        res.send(x);
    });
})
app.get('/event-average', function (req, res) {
    gameweekAverage(function (x) {
        res.send(x);
    });
})
app.get('/h2h/:id1/:id2', function (req, res) {
    comparaison(req.params.id1, req.params.id2, function (x) {
        res.send(x);
    });
})
app.get('/lowest-highest/:leagueId', function (req, res) {
    highestLowest(req.params.leagueId, function (x) {
        res.send(x);
    });
})
app.get('/cup/:leagueId', function (req, res) {
    cupLeagueStats(req.params.leagueId, function (x) {
        res.send(x);
    });
})
app.get('/captains/:leagueId/:currentEvent', function (req, res) {
    getCaptains(req.params.leagueId, req.params.currentEvent, function (x) {
        res.send(x);
    });
})
app.get('/transfers/:event/:leagueId', function (req, res) {
    getTransfers(req.params.event, req.params.leagueId, function (x) {
        res.send(x);
    });
})
app.get('/team-stats/:teamId', function (req, res) {
    teamStats(req.params.teamId, function (x) {
        res.send(x);
    });
})
app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
})
app.listen(port, function () {
    console.log('Example app listening on port 8080!');
});
