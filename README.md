# HighFiver

HighFiver is a networked high five competition between three friends at [ITP](http://itp.nyu.edu). A button at ITP will trigger text messages to be sent to the three contestants notifying them that someone is awaiting a high five. The contestants then have to race each other to the floor and high five the waiting participant. All high fives will be logged to a RESTfully-accessible database so we can build things like an online leaderboard.

### Running the server locally for testing

Skip any of the following steps if you have the thing already.

1. Clone repo and `cd` into server directory
* Install node / npm: <http://nodejs.org/>
* Install express globally: `sudo npm install -g express`
* Install node packages: `npm install`
* Install homebrew: `ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"`
* Install mongodb (took around 10 minutes for me): `brew install mongodb`
* Run application: `node app`
* Run mongod: `mongod`
* Seed game players: <http://localhost:3000/players/seed>
* Load application: <http://localhost:3000/>

To POST a new High Five: 
```
curl -i -X POST -H 'Content-Type: application/json' -d '{"strength":10}' http://localhost:3000/players/sam/highfives/add
```

### Deploying the server to Heroku

1. Sign up for [Heroku](https://id.heroku.com/signup/www-home-top)
* Install the [Heroku Toolbelt](https://toolbelt.herokuapp.com/)
* Create a new app
* Link your clone of this repo to your Heroku repo: `git remote add heroku git@heroku.com:your-app-name.git` 
* Enable websockets on Heroku app: `heroku labs:enable websockets -a your-app-name`
* Enable MongoLab on Heroku app (this might require you to verify your Heroku account): `heroku addons:add mongolab`
* Push to Heroku: `git push heroku master`

### Running the Arduino Yun: ATmega side

Lorem

### Running the Arduino Yun: Linux side

Lorem

### Credits

* Sam Brenner [Website](http://www.samjbrenner.com) [GitHub](http://github.com/sambrenner)
* Xuedi Chen [Website](http://xc-xd.com) [GitHub](http://github.com/dooztron)
* Adam Quinn [Website](http://www.adamquinnstudio.com) [GitHub](http://github.com/agquinn01)

