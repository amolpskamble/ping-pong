var express = require('express');
var router = express.Router();
var gameEngine = require("../app/logic/game-engine/game-engine");
var ErrorResponseBuilder = require('../app/utils/rest/error-response');
var APIResponseBuilder = require('../app/utils/rest//api-response').APIResponseBuilder;

/**
 * Referee API's
 */

/**
 * API - Create Round. eg. First Round, Semifinal Round, Final Round etc.
 * Matches belongs to Round.
 */
router.post('/round', function (req, res, next) {
    try {
        var record = gameEngine.createRound(req.body.name);
        var apiResponse = new APIResponseBuilder()
                .withStatus(201)
                .withResourceName("Round")
                .withData(record)
                .build(true);
        console.log(apiResponse);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        var errorResponse = new ErrorResponseBuilder()
                .withStatus(err.status)
                .withErrors(err.errors)
                .withResourceName("Round")
                .build(true);
        console.log(errorResponse);
        res.status(errorResponse.status).send(errorResponse);
    }
});
/**
 * API - Create match belong to particular round
 */
router.post('/round/:roundId/match', function (req, res, next) {
    try {
        var match = gameEngine.createMatch(req.body.match);
        var apiResponse = new APIResponseBuilder()
                .withStatus(201)
                .withResourceName("Match")
                .withData(match)
                .build(true);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        var errorResponse = new ErrorResponseBuilder()
                .withStatus(err.status)
                .withErrors(err.errors)
                .withResourceName("Match")
                .build(true);
        res.status(errorResponse.status).send(errorResponse);
    }
});
/**
 * API - For debugging purpose. To check current values in the games.
 */
router.get('/game', function (req, res, next) {
    try {
        var game = gameEngine.getGame();
        var apiResponse = new APIResponseBuilder()
                .withStatus(200)
                .withResourceName("Game")
                .withData(game)
                .build(true);
        res.status(apiResponse.status).send(apiResponse);
    } catch (err) {
        var errorResponse = new ErrorResponseBuilder()
                .withStatus(err.status)
                .withErrors(err.errors)
                .withResourceName("Game")
                .build(true);
        res.status(errorResponse.status).send(errorResponse);
    }
});
/**
 * VIEW - Get game report  
 * Gives Champion name, Rounds and resptevie matches and their winners
 */
router.get('/game/report', function (req, res, next) {
    res.render('report', {game: gameEngine.getGame()});
});


/**
 * API - Restart the game 
 * After completion of championship or any other reason 
 */
router.get('/game/restart', function (req, res, next) {
    gameEngine.restartGame();
    res.send(200).send("Game restared.");
});
module.exports = router;
