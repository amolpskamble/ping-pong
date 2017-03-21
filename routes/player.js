var express = require('express');
var router = express.Router();
var gameEngine = require("../app/logic/game-engine/game-engine");
var ErrorResponseBuilder = require('../app/utils/rest/error-response');
var APIResponseBuilder = require('../app/utils/rest/api-response').APIResponseBuilder;

/**
 * API - Get the Match status by playerId, roundId, matchId
 */

router.get('/:playerId/round/:roundId/match/:matchId', function (req, res) {
    try {
        if (typeof req.params.roundId === 'string') {
            req.params.roundId = parseInt(req.params.roundId);
        }
        if (typeof req.params.matchId === 'string') {
            req.params.matchId = parseInt(req.params.matchId);
        }
        if (typeof req.params.playerId === 'string') {
            req.params.playerId = parseInt(req.params.playerId);
        }
        var move = gameEngine.checkGameStatus(req.params.roundId,
                req.params.matchId, req.params.playerId);
        var apiResponse = new APIResponseBuilder()
                .withStatus(200)
                .withResourceName("Match")
                .withData(move)
                .build(true);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        console.log(err);
        var errorResponse = new ErrorResponseBuilder()
                .withStatus(err.status)
                .withErrors(err.errors)
                .withMessage(err.message)
                .withResourceName("Match")
                .build(true);
        res.status(errorResponse.status).send(errorResponse);
    }
});


/**
 * API- Save the defence inputs for the game
 */
router.put('/:playerId/round/:roundId/match/:matchId/defend', function (req, res) {
    if (typeof req.params.roundId === 'string') {
        req.params.roundId = parseInt(req.params.roundId);
    }
    if (typeof req.params.matchId === 'string') {
        req.params.matchId = parseInt(req.params.matchId);
    }
    if (typeof req.params.playerId === 'string') {
        req.params.playerId = parseInt(req.params.playerId);
    }
    try {
        var match = gameEngine.saveDefenderMove(req.params.roundId,
                req.params.matchId, req.params.playerId, req.body.defenderInputs);
        var apiResponse = new APIResponseBuilder()
                .withStatus(200)
                .withResourceName("Match")
                .withMessage("Your defence is saved. Check the game status for the result.")
                .withData(match)
                .build(true);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        console.log(err);
        var errorResponse = new ErrorResponseBuilder()
                .withStatus(err.status)
                .withErrors(err.errors)
                .withMessage(err.message)
                .withResourceName("Match")
                .build(true);
        res.status(errorResponse.status).send(errorResponse);
    }
});

/**
 * API- Save attacker input for the game
 */
router.put('/:playerId/round/:roundId/match/:matchId/attack', function (req, res) {
    if (typeof req.params.roundId === 'string') {
        req.params.roundId = parseInt(req.params.roundId);
    }
    if (typeof req.params.matchId === 'string') {
        req.params.matchId = parseInt(req.params.matchId);
    }
    if (typeof req.params.playerId === 'string') {
        req.params.playerId = parseInt(req.params.playerId);
    }
    try {
        var match = gameEngine.saveAttackerMove(req.params.roundId,
                req.params.matchId, req.params.playerId, req.body.attackerInput);
        var apiResponse = new APIResponseBuilder()
                .withStatus(200)
                .withResourceName("Match")
                .withMessage("Your attack is saved. Check the game status for the result")
                .withData(match)
                .build(true);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        console.log(err);
        var errorResponse = new ErrorResponseBuilder()
                .withStatus(err.status)
                .withErrors(err.errors)
                .withMessage(err.message)
                .withResourceName("Match")
                .build(true);
        res.status(errorResponse.status).send(errorResponse);
    }
});
/**
 * API - Join the championship before playing
 */
router.put('/:playerId/join',function(req,res){
    console.log("Joining the championship");
    if (typeof req.params.playerId === 'string') {
        req.params.playerId = parseInt(req.params.playerId);
    }
    try {
        var match = gameEngine.joinChampionship(req.params.playerId);
        var apiResponse = new APIResponseBuilder()
                .withStatus(200)
                .withResourceName("Match")
                .withMessage("You have joined the championship.")
                .withData(match)
                .build(true);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        console.log(err);
        var errorResponse = new ErrorResponseBuilder()
                .withStatus(err.status)
                .withErrors(err.errors)
                .withMessage(err.message)
                .withResourceName("Match")
                .build(true);
        res.status(errorResponse.status).send(errorResponse);
    }
});


module.exports = router;
