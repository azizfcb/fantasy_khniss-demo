var azifpl = require('azifpl');
var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/public'));

var testVar = [{"playerId": 4138725, "teamName": "spenkes wiiw\nwiiw", "transfers": []}, {"playerId": 3851827, "teamName": "kùn aguero", "transfers": [{"order": 0, "transfer_in": "Monreal", "transfer_out": "Bellerín"}]}, {"playerId": 3601366, "teamName": "Ayed oussama", "transfers": []}, {"playerId": 16559, "teamName": "mohamed amine krayem", "transfers": [{"order": 0, "transfer_in": "King", "transfer_out": "Deeney"}]}, {"playerId": 1463484, "teamName": "taha slimen", "transfers": [{"order": 0, "transfer_in": "Daniels", "transfer_out": "Bellerín"}]}, {"playerId": 63322, "teamName": "Hosni Zan Debbabi", "transfers": [{"order": 0, "transfer_in": "Salah", "transfer_out": "Alli"}, {"order": 1, "transfer_in": "McArthur", "transfer_out": "Paterson"}]}, {"playerId": 567387, "teamName": "ghazi rassas", "transfers": [{"order": 0, "transfer_in": "Camarasa", "transfer_out": "Mooy"}, {"order": 1, "transfer_in": "Aubameyang", "transfer_out": "Kane"}]}, {"playerId": 462383, "teamName": "trimech hsan", "transfers": []}, {"playerId": 715315, "teamName": "saidi Montassar", "transfers": [{"order": 0, "transfer_in": "Young", "transfer_out": "Boly"}, {"order": 1, "transfer_in": "Lukaku", "transfer_out": "Aubameyang"}]}, {"playerId": 906333, "teamName": "adnen korbi", "transfers": [{"order": 0, "transfer_in": "Balbuena", "transfer_out": "Tomkins"}, {"order": 1, "transfer_in": "Murray", "transfer_out": "Wilson"}, {"order": 2, "transfer_in": "Chicharito", "transfer_out": "King"}, {"order": 3, "transfer_in": "Lamela", "transfer_out": "Walcott"}, {"order": 4, "transfer_in": "Davies", "transfer_out": "Alexander-Arnold"}, {"order": 5, "transfer_in": "Fabianski", "transfer_out": "Schmeichel"}, {"order": 6, "transfer_in": "Richarlison", "transfer_out": "Felipe Anderson"}, {"order": 7, "transfer_in": "McCarthy", "transfer_out": "Speroni"}, {"order": 8, "transfer_in": "Sané", "transfer_out": "Richarlison"}, {"order": 9, "transfer_in": "Jiménez", "transfer_out": "Firmino"}]}, {"playerId": 1904484, "teamName": "noureddine chaabannet", "transfers": []}, {"playerId": 351530, "teamName": "brahim guezmil", "transfers": [{"order": 0, "transfer_in": "David Luiz", "transfer_out": "Alonso"}, {"order": 1, "transfer_in": "Monreal", "transfer_out": "Duffy"}]}, {"playerId": 2337240, "teamName": "debbabi hamdi", "transfers": [{"order": 0, "transfer_in": "Pereyra", "transfer_out": "Bernardo Silva"}, {"order": 1, "transfer_in": "Kane", "transfer_out": "Aubameyang"}]}, {"playerId": 835793, "teamName": "mohamed ali benafia", "transfers": [{"order": 0, "transfer_in": "David Luiz", "transfer_out": "Bellerín"}]}, {"playerId": 4978224, "teamName": "Souhail Ben Afia", "transfers": []}, {"playerId": 4924444, "teamName": "salem ayed", "transfers": []}, {"playerId": 625032, "teamName": "sahbi kraiem", "transfers": []}, {"playerId": 2069488, "teamName": "ahmed slimen", "transfers": [{"order": 0, "transfer_in": "Monreal", "transfer_out": "Bellerín"}, {"order": 1, "transfer_in": "Suttner", "transfer_out": "Alexander-Arnold"}, {"order": 2, "transfer_in": "David Luiz", "transfer_out": "Chilwell"}, {"order": 3, "transfer_in": "Sterling", "transfer_out": "Sané"}, {"order": 4, "transfer_in": "Willian", "transfer_out": "Son"}, {"order": 5, "transfer_in": "Agüero", "transfer_out": "Kane"}, {"order": 6, "transfer_in": "Rashford", "transfer_out": "Firmino"}, {"order": 7, "transfer_in": "Chicharito", "transfer_out": "Mitrovic"}, {"order": 8, "transfer_in": "Fabianski", "transfer_out": "Forster"}, {"order": 9, "transfer_in": "Steve Cook", "transfer_out": "Wan-Bissaka"}, {"order": 10, "transfer_in": "Mané", "transfer_out": "Hughes"}, {"order": 11, "transfer_in": "Peltier", "transfer_out": "Jonny"}]}, {"playerId": 1080290, "teamName": "ali trimech", "transfers": []}, {"playerId": 5204289, "teamName": "youssef brahel\nbrahem", "transfers": [{"order": 0, "transfer_in": "Snodgrass", "transfer_out": "Pogba"}, {"order": 1, "transfer_in": "Firmino", "transfer_out": "Arnautovic"}]}, {"playerId": 5193967, "teamName": "Nejmeddine Debbabi", "transfers": []}, {"playerId": 147692, "teamName": "Mohamed Alaa krayem", "transfers": []}, {"playerId": 689993, "teamName": "achraf rassas", "transfers": [{"order": 0, "transfer_in": "Felipe Anderson", "transfer_out": "Milner"}, {"order": 1, "transfer_in": "Jiménez", "transfer_out": "Kane"}, {"order": 2, "transfer_in": "Sané", "transfer_out": "Mooy"}]}, {"playerId": 5493415, "teamName": "achraf ayed", "transfers": []}, {"playerId": 5660989, "teamName": "khalil brahem", "transfers": []}, {"playerId": 5521493, "teamName": "كابتن ماجد", "transfers": [{"order": 0, "transfer_in": "Mahrez", "transfer_out": "Sterling"}, {"order": 1, "transfer_in": "Sterling", "transfer_out": "Mahrez"}]}, {"playerId": 5667855, "teamName": "Maher nahali", "transfers": []}, {"playerId": 5862705, "teamName": "ash rs", "transfers": []}, {"playerId": 5964334, "teamName": "Ben afia Ahmed amine", "transfers": []}, {"playerId": 5965937, "teamName": "debbabi ghassen", "transfers": []}]
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
function getCaptains(leagueId, callback) {
    azifpl.getCaptains(leagueId).then(function (res) {
        callback(res)
    }, function (err) {
        callback(err)
    })
}
function getTransfers(event,leagueId, callback) {
    azifpl.getTransfersList(event,leagueId).then(function (res) {
        callback(res)
    }, function (err) {
        callback(err)
    })
}

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
app.get('/captains/:leagueId', function (req, res) {
    getCaptains(req.params.leagueId, function (x) {
        res.send(x);
    });
})
app.get('/transfers/:event/:leagueId', function (req, res) {
    getTransfers(req.params.event,req.params.leagueId, function (x) {
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