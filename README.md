# Ping Pong


## API for Referee 

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
Request Parameter-

roundI- created in 1st API
user1- player 1 user id 
user2- player 2 user id
defender- initial defender user id 
attacker- initial attacker user id

Respose-

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



