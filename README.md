# Ping Pong


## API for the Referee 

#### 1. Create the round
```sh
POST http://localhost:3000/referee/round

body :
{
	"name":"Final Round"
}

name - name of the round
```

#### 2. Create the match
```sh
POST http://localhost:3000/referee/round/:roundId/match

body :

{
	"match":{
		"roundId":1490081496239, 
		"user1":7, 
		"user2":6, 
		"defender":7,
		"attacker":6 
	}
}

roundI- created in 1st API
user1- player 1 user id 
user2- player 2 user id
defender- initial defender user id 
attacker- initial attacker user id

Respose

id- match id

```

#### 3. Get the game object - for debugging
```sh
GET http://localhost:3000/referee/game
```

#### 4. Restart the game after compleption of the championship or any other reason
```sh
GET http://localhost:3000/referee/game/restart
```
#### The Game Report
```sh
GET http://localhost:3000/referee/game/report
```


## API for the Player 

#### 5. Join the game 
```sh
PUT http://localhost:3000/player/:playerId/join

Path parameter:

playerId- palyer id

```

#### 6. Save the defender inputs for the game
```sh
PUT http://localhost:3000/player/playerId/round/:roundId/match/:matchId/defend

Path parameter: 
playerId- palyer id
roundId- round id created in 1st API or 2nd API
matchId- id created in 2nd API

body:

{
   "defenderInputs" : [3,1,2,6,8]
}

defenderInputs- defence inputs array
```

#### 7. Save the attacker input for the game
```sh
PUT http://localhost:3000/player/playerId/round/:roundId/match/:matchId/attack

Path parameter:

playerId- palyer id
roundId- round id created in 1st API or 2nd API
matchId- id created in 2nd API

body: 

{
	"attackerInput" : 9
}

attackerInput- attacker input
```

#### 8. Check game stasus 
```sh
GET http://localhost:3000/player/playerId/round/:roundId/match/:matchId

Path parameter:

playerId- palyer id
roundId- round id created in 1st API or 2nd API
matchId- id created in 2nd API

```



## Instructions
	- Create the round before starting the matches
	- Join the game before making moves
	- Terminology
		user1 - Player 1
		user2 - Player 2
		round - Round such Final Round, Semifinal Round. Matches belong to the round.
		match - Match between two users. One round may contains several matches depending on the number of users.
		move - Action of defending, attacking.
	- Restart the game using 4th API if any unexpected errors are coming up.
	- Use 5th API to check the game progress and scoreboard.
	- Use player id given in the following section for API's calls.
	
#### Player Details

```sh
[ { id: 1,
    name: 'Joey',
    defenceSetLength: 8,
    join: false,
    inChampionship: 'YES' },
  { id: 2,
    name: 'Nick',
    defenceSetLength: 8,
    join: false,
    inChampionship: 'YES' },
  { id: 3,
    name: 'Russel',
    defenceSetLength: 7,
    join: false,
    inChampionship: 'YES' },
  { id: 4,
    name: 'Vivek',
    defenceSetLength: 7,
    join: false,
    inChampionship: 'YES' },
  { id: 5,
    name: 'Pritam',
    defenceSetLength: 6,
    join: false,
    inChampionship: 'YES' },
  { id: 6,
    name: 'Amit',
    defenceSetLength: 6,
    join: false,
    inChampionship: 'YES' },
  { id: 7,
    name: 'Chandler',
    defenceSetLength: 5,
    join: false,
    inChampionship: 'YES' },
  { id: 8,
    name: 'Clowin',
    defenceSetLength: 5,
    join: false,
    inChampionship: 'YES' } ]
```
