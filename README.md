# HighFiver Server

Skip any of the following steps if you have the thing already.

1. Clone repo and `cd` into directory
* Install node / npm: <http://nodejs.org/>
* Install express globally: `sudo npm install -g express`
* Install node packages: `npm install`
* Install homebrew: `ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"`
* Install mongodb (took a while for me): `brew install mongodb`
* Run application: `node app`
* Run mongo: `mongod`
* Load application: <http://localhost:3000/>

To POST a new High Five: `curl -i -X POST -H 'Content-Type: application/json' -d '{"player_id":"sam", "strength":10}' http://localhost:3000/highfives/new`

