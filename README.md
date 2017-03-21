# Ping Pong


## API for Referee 

#### 1. Create the round
```sh
POST http://localhost:3000/referee/round

body :
{
	"name":"Final Round"
}
```

#### Create the match
```sh
POST http://localhost:3000/referee/round/:roundId/match

body :
{
	"match":{
		"roundId":1490081496239, // roundId created in above 1st API
		"user1":7, // player 1 user id 
		"user2":6, // player 2 user id 
		"defender":7, // current defender user id 
		"attacker":6  // current attacker user id 
	}
}
```
