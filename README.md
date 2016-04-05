To run locally:  

Clone down this repo and run `npm install`  
- spin up mongodb: `mongod --dbpath ~/data/db`
- if you haven't already, create a database with a collection called 'teams' and manually insert a team with the following attributes: name : "Team 1". email: "team1@sky.uk", token: "1d914750-d8bc-0133-6ff8-16878d48352d"    
- run the node server with `node app.js`  

Commit 5b08e35 has the code for grabbing the database URI when deployed to Nimbus (Cloud Foundry).