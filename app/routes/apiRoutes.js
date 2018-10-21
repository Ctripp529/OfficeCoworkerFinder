//route to show our coworker array
// var path = require("path");
var coworkerAPI= require("../data/coworkers.js");
var friendsAPI = require("../data/friends.js");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  //office coworker api
  app.get("/data/coworkers", function(req, res) {
    res.json(coworkerAPI);
    
  });
  //new friends api
  app.get("/data/friends", function(req, res){
    res.json(friendsAPI);
  })

  app.post("/data/friends", function(req, res) {
    var userInput = req.body;
    //console.log("user input: " + JSON.stringify(userInput));

    var surveyScores = userInput.scores;
    console.log("scores: "+ JSON.stringify(surveyScores));

    var coworkerMatch = "";
    var coworkerMatchImg = "";
    var totalDiff = 10000;

    for (var i =0; i< coworkerAPI.length; i++){
      var difference = 0;
      for (var c = 0; c < surveyScores.length; c++){
        difference += Math.abs(coworkerAPI[i].scores[c] - surveyScores[c]);
      }
        console.log(JSON.stringify(difference));
        if (difference <= totalDiff){
          totalDiff = difference;
          coworkerMatch = coworkerAPI[i].name;
          coworkerMatchImg =coworkerAPI[i].photo;
        }
      
    }
 
      // coworkerAPI.push(userInput);
      friendsAPI.push(userInput);
      coworkerAPI.push(userInput);
      res.json({status: 'OK', coworkerMatch: coworkerMatch, coworkerMatchImg: coworkerMatchImg});
   
  });

};