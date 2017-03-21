/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var validator = require('validator');

var game = require('../game-attributes/game-attribute');
/**
 * Store default game attributes to reset the game to starting point if required
 * @type String
 */
var defaultGameAttributes=JSON.stringify(game);

/**
 * gameEngine - contains all the functions required to play the game
 */
var gameEngine = {};

/**
 * Restart the game after championship or for any reason
 */
gameEngine.restartGame=function(){
    game=JSON.parse(defaultGameAttributes);
    return game;
};

/**
 * Create the round. eg. First Round, Semifinal etc.
 */
gameEngine.createRound = function (name) {
    if (!name || validator.isEmpty(name)) {
        reportError(400, [name + " is not a valid round name"]);
    }
    var existingRound = gameEngine.getRoundByName(name);
    if (existingRound && existingRound.length > 0) {
        reportError(409, [name + ' round already exists']);
    }
    game.championship.rounds.push({id: Date.now(), name: name, matches: []});
    return game.championship.rounds[game.championship.rounds.length - 1];
};

/**
 *  Join the championship before playing the game. Referee can't start the
 *  game until and unless all the player join
 */
gameEngine.joinChampionship = function (playerId) {
    var user = gameEngine.getUserById(playerId);
    user.join = true;
    gameEngine.updateUser(user);
    return user;
};
/**
 * Create the match - user1,user2,defender,attacker,round etc.
 * @param {type} match
 * @returns {unresolved}
 */
gameEngine.createMatch = function (match) {
    if (!match) {
        reportError(400, ['match is required parameter']);
    }
    if (!match.user1 || !match.user2 || !match.defender || !match.attacker) {
        reportError(400, ['user1, user2, defender, attacker are required parameters']);
    }
    if (!gameEngine.isEveryUserJoin()) {
        reportError(400, ['Some users are not yet joined.']);
    }
    gameEngine.validateTheUser(match.user1);
    gameEngine.validateTheUser(match.user2);
    gameEngine.validateTheUser(match.defender);
    gameEngine.validateTheUser(match.attacker);

    match.id = Date.now();
    var round = gameEngine.getRoundById(match.roundId);
    if (!round || round.length <= 0) {
        reportError(404, [round + " round does not exists."]);
    }
    var oldMatch = gameEngine.getMatchByUsers(round[0].id, {user1: match.user1, user2: match.user2});
    if (oldMatch && oldMatch.length > 0) {
        reportError(409, "Match with given information is already exists");
    }
    match.points = {};
    match.points.user1 = 0;
    match.points.user2 = 0;
    match.user1Details = gameEngine.getUserById(match.user1);
    match.user2Details = gameEngine.getUserById(match.user2);
    match.winner = -1;
    match.defenderInputs = [];
    match.attackerInput = -1;
    round[0].matches.push(match);
    return match;
};
/**
 * Update the match for several cases.
 * @param {type} match
 * @returns {unresolved}
 */
gameEngine.updateMatch = function (match) {
    for (var i = 0; i < game.championship.rounds.length; i++) {
        var round = game.championship.rounds[i];
        if (match.roundId === round.id) {
            for (var j = 0; j < round.matches.length; j++) {
                if (round.matches[j] === match.id) {
                    round.matches[j] = match;
                    return match;
                }
            }
        }
    }
};
/**
 * Private method which take match object and defence as array and further process the move
 * @param {type} match
 * @param {type} inputs
 * @returns {unresolved}
 */
gameEngine._saveDefenderMove = function (match, inputs) {
    if (match.defenderInputs && match.defenderInputs.length > 0) {
        reportError(400, "Defender have already given defence set.");
    }
    gameEngine.validateTheUser(match.defender);
    var defender = gameEngine.getUserById(match.defender);
    if (defender.defenceSetLength !== inputs.length) {
        reportError(400, "Defender allowed to give " + defender.defenceSetLength + " defences");
    }
    for (var i = 0; i < inputs.length; i++) {
        if (!(inputs[i] >= 1 && inputs[i] <= 10)) {
            reportError(400, ['Enter defence value between 1 to 10']);
        }
    }
    match.defenderInputs = inputs;
    gameEngine.updateMatch(match);
    if (gameEngine.isMoveCompleted(match)) {
        gameEngine.givePoints(match);
    }
    delete match.attackerInput;
    return match;
};

/**
 * Private method which take match object and attack value as input and process the move
 * @param {type} match
 * @param {type} input
 * @returns {unresolved}
 */
gameEngine._saveAttackerMove = function (match, input) {
    if (match.attackerInput > 0) {
        reportError(400, "Attacker have already given attack input");
    }
    if (!(input >= 1 && input <= 10)) {
        reportError(400, "Attack value should be between 1 to 10.");
    }
    gameEngine.validateTheUser(match.attacker);
    match.attackerInput = input;
    gameEngine.updateMatch(match);
    if (gameEngine.isMoveCompleted(match)) {
        gameEngine.givePoints(match);
    }
    delete match.defenderInputs;
    return match;
};
/**
 * Save defender move for the match
 * @param {type} roundId
 * @param {type} matchId
 * @param {type} playerId
 * @param {type} defenderInputs
 * @returns {gameEngine._saveDefenderMove.match}
 */
gameEngine.saveDefenderMove = function (roundId, matchId, playerId, defenderInputs) {
    if (!roundId || !matchId || !playerId || !defenderInputs || defenderInputs.length <= 0) {
        reportError(400, ['path parameter roundId, matchId, playerId'
                    + ' and body parameter defenderInputs array are required parameters']);
    }
    var match = gameEngine.getMatchById(roundId, matchId);

    if (match.defender !== playerId) {
        reportError(403, ['You are not the defender for the current move.']);
    }
    return gameEngine._saveDefenderMove(match, defenderInputs);
};
/**
 * Save attaker move for the match
 * @param {type} roundId
 * @param {type} matchId
 * @param {type} playerId
 * @param {type} attackerInput
 * @returns {gameEngine._saveAttackerMove.match}
 */
gameEngine.saveAttackerMove = function (roundId, matchId, playerId, attackerInput) {
    if (!roundId || !matchId || !playerId || !attackerInput) {
        reportError(400, ['path parameter roundId, matchId, playerId'
                    + ' and body parameter attackerInput are required parameters']);
    }
    var match = gameEngine.getMatchById(roundId, matchId);

    if (match.attacker !== playerId) {
        reportError(403, ['You are not the attacker for the current move.']);
    }


    return gameEngine._saveAttackerMove(match, attackerInput);
};
/**
 * Check the status of the game. Return match object
 */
gameEngine.checkGameStatus = function (roundId, matchId, playerId) {
    if (!roundId || !matchId || !playerId) {
        reportError(400, ['path parameter roundId, matchId, playerId']);
    }
    var match = gameEngine.getMatchById(roundId, matchId);

    if (match.user1 !== playerId && match.user2 !== playerId) {
        reportError(403, ['Your do not belong to this match']);
    }

    delete match.defenderInputs;
    delete match.attackerInput;

    return match;

};

/**
 * To check if both defender and atacker has played their move
 * @param {type} match
 * @returns {Boolean}
 */
gameEngine.isMoveCompleted = function (match) {
    return match.defenderInputs && match.defenderInputs.length > 0 && match.attackerInput > 0;
};
/**
 * Perform points dsitribution if both defender and attacker has played their move.
 * Decide the winner for particular move and match.
 * @param {type} match
 * @returns {unresolved}
 */
gameEngine.givePoints = function (match) {
    if (match.winner > 0) {
        reportError(400, "Winner already decided for the match");
    }
    if (!(gameEngine.isMoveCompleted(match))) {
        reportError(400, "Defender and Attacker Input are required ");
    }
    if (match.defender === match.user1) {
        if (match.defenderInputs.indexOf(match.attackerInput) === -1) {
            match.points.user2 = match.points.user2 + 1;
        } else {
            match.defender = match.user2;
            match.attacker = match.user1;
        }
        if (match.points.user2 === game.winnerPoints) {
            match.winner = match.user2;
            match.winnerName = match.user2Details.name;
            var user = gameEngine.getUserById(match.user1);
            user.inChampionship = "NO";
            gameEngine.updateMatch(user);
        }
    } else {
        if (match.defenderInputs.indexOf(match.attackerInput) === -1) {
            match.points.user1 = match.points.user1 + 1;
        } else {
            match.defender = match.user1;
            match.attacker = match.user2;
        }
        if (match.points.user1 === game.winnerPoints) {
            match.winner = match.user1;
            match.winnerName = match.user1Details.name;
            var user = gameEngine.getUserById(match.user2);
            user.inChampionship = "NO";
            gameEngine.updateMatch(user);
        }
    }
    match.defenderInputs = [];
    match.attackerInput = -1;
    gameEngine.updateMatch(match);
    if(match.winner > 0 && isChampion(match.user)){
        game.winner=match.winnerName;
    }
    return match;
};
/**
 * Check if given user id is only participant remaining in the champioship
 * @param {type} userId
 * @returns {Boolean}
 */
gameEngine.isChampion = function (userId) {
    var qualifiedUsers = game.players.filter(function (user) {
        return user.inChampionship === "YES";
    });
    return qualifiedUsers.legth === 1 && qualifiedUsers[0].id === userId;
};
/**
 * Find the object in array and update as given
 * @param {type} user
 * @returns {unresolved}
 */
gameEngine.updateUser = function (user) {
    for (var i = 0; i < game.players.length; i++) {
        if (user.id === game.players[i].id) {
            game.players[i] = user;
            return user;
        }
    }
};
/**
 * Check if player has joined
 * @returns {Boolean}
 */
gameEngine.isEveryUserJoin = function () {
    return game.players.filter(function (user) {
        return user.join;
    }).length > 0;
};
/**
 * Get the user infomation by id
 * @param {type} id
 * @returns {nm$_game-engine.gameEngine.getUserById.users}
 */
gameEngine.getUserById = function (id) {
    if (typeof id === 'string') {
        id = parseInt(id);
    }
    var users = game.players.filter(function (user) {
        return user.id === id;
    });
    if (users.length > 0) {
        return users[0];
    } else {
        reportError(404, ["user with id " + id + " does not exists"]);
    }
};

/**
 * Validate the user by checking existance in player array and also check if user 
 * is still part of the championship or not
 * @param {type} id
 * @returns {Boolean}
 */
gameEngine.validateTheUser = function (id) {
    var user = gameEngine.getUserById(id);
    if (user.inChampionship === "NO") {
        reportError(400, "User " + id + " is no longer part of championship.");
    }
    return true;
};

/**
 * Get the Round details by id
 * @param {type} id
 * @returns {unresolved}
 */
gameEngine.getRoundById = function (id) {
    return game.championship.rounds.filter(function (round) {
        return round.id === id;
    });
};
/**
 * Get the Round details by name
 * @param {type} name
 * @returns {unresolved}
 */
gameEngine.getRoundByName = function (name) {
    return game.championship.rounds.filter(function (round) {
        return round.name === name;
    });
};
/**
 * Get Match given two users
 * @param {type} roundId
 * @param {type} users
 * @returns {unresolved}
 */
gameEngine.getMatchByUsers = function (roundId, users) {

    return gameEngine.getRoundById(roundId)[0].matches.filter(function (match) {
        return (match.user1 === users.user1 || match.user2 === users.user1) ||
                match.user1 === users.user2 || match.user2 === users.user2;
    });
};

/**
 * Return the game object as whole . For debugging and reporting purpose
 */
gameEngine.getGame = function () {
    return game;
};
/**
 * Get the match given by roundId, matchId
 * @param {type} roundId
 * @param {type} matchId
 * @returns {unresolved}
 */
gameEngine.getMatch = function (roundId, matchId) {

    var round = gameEngine.getRoundById(roundId);
    gameEngine.printGameRounds();
    if (!round || round.length <= 0) {
        reportError(404, [roundId + " roundId does not exits."]);
    }
    return round[0].matches.filter(function (match) {
        return match.id === matchId;
    });
};
/**
 * Get the match by roundId, matchId
 * @param {type} roundId
 * @param {type} matchId
 * @returns {nm$_game-engine.gameEngine.getMatchById.match}
 */
gameEngine.getMatchById = function (roundId, matchId) {
    var match = gameEngine.getMatch(roundId, matchId);
    if (!match || match.length <= 0) {
        reportError(404, "No match found with roundId " + roundId + ",matchId " +
                matchId + "does not exists.");
    }
    return match[0];
};
/**
 * Print all the rounds in the championship for debugging purpose
 * @returns {undefined}
 */
gameEngine.printGameRounds = function () {
    console.log("Printing Rounds");
    console.log(JSON.stringify(game.championship.rounds));
};
/**
 * Throw exception if any with http status code and array of erros
 */
var reportError = function (status, errors) {
    var error = new Error();
    error.status = status;
    error.errors = errors;
    throw error;
};


module.exports = gameEngine;


