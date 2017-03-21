/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * This is object hold the all information related to game. eg. winner,championship id,
 * players, rounds, matches etc.
 */

var game = {};

game.championship = {};

/**
 * Points required to win - per match
 */
game.winnerPoints = 5;
/**
 * Players involved in the championship
 */
game.players = [];

game.players.push({
    id: 1,
    name: "Joey",
    defenceSetLength: 8,
    join: false,
    inChampionship: "YES"
});

game.players.push({
    id: 2,
    name: "Nick",
    defenceSetLength: 8,
    join: false,
    inChampionship: "YES"
});

game.players.push({
    id: 3,
    name: "Russel",
    defenceSetLength: 7,
    join: false,
    inChampionship: "YES"
});

game.players.push({
    id: 4,
    name: "Vivek",
    defenceSetLength: 7,
    join: false,
    inChampionship: "YES"
});

game.players.push({
    id: 5,
    name: "Pritam",
    defenceSetLength: 6,
    join: false,
    inChampionship: "YES"
});

game.players.push({
    id: 6,
    name: "Amit",
    defenceSetLength: 6,
    join: false,
    inChampionship: "YES"
});

game.players.push({
    id: 7,
    name: "Chandler",
    defenceSetLength: 5,
    join: false,
    inChampionship: "YES"
});

game.players.push({
    id: 8,
    name: "Clowin",
    defenceSetLength: 5,
    join: false,
    inChampionship: "YES"
});

game.referee = {
    name: "referee",
    password: "admin"
};


game.championship.id = 1;
/**
 * Round contains matches. eg. Final Round, Semifinal Round etc.
 */
game.championship.rounds = [];
/**
 * matches belong to rounds.
 */
game.championship.rounds.matches = [];
/**
 * Winner of the Championship
 */
game.winner='';



module.exports = game;

