# HighFiver

HighFiver is a networked high five competition between three friends at [ITP](http://itp.nyu.edu). A button at ITP will trigger text messages to be sent to the three contestants notifying them that someone is awaiting a high five. The contestants then have to race each other to the floor and high five the waiting participant. All high fives will be logged to a RESTfully-accessible database so we can build things like an online leaderboard.

### Running the server locally for testing

Skip any of the following steps if you have the thing already.

1. Clone repo and `cd` into server directory
* Install node / npm: <http://nodejs.org/>
* Install express globally: `sudo npm install -g express`
* Install node packages: `npm install`
* Install homebrew: `ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"`
* Install mongodb (took a while for me): `brew install mongodb`
* Run application: `node app`
* Run mongo: `mongod`
* Load application: <http://localhost:3000/>

To POST a new High Five: 
```
curl -i -X POST -H 'Content-Type: application/json' -d '{"player_id":"sam", "strength":10}' http://localhost:3000/highfives/new
```

### Deploying the server

Lorem

### Running the Arduino Yun: ATmega side

Lorem

### Running the Arduino Yun: Linux side

Lorem

