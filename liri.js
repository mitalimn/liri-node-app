
//npm packages
var inquirer = require("inquirer");
var keys = require('./keys');
var Twitter = require('twitter');

inquirer.prompt([{
    type: "list",
    name: "doWhat",
    message: "Hi, Im Liri , How can I help you??",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
}]).then(function(choices) {
    switch (choices.doWhat) {
        case "my-tweets":
            tweet();
            break;
        case "spotify-this-song":
            spotifySong(mySong);
            break;
        case "movie-this":
            myMovie();
            break;
        case "do-what-it-says":
            doAsSaid();
            break;
        default:
            console.log("Please Select from the options- my-tweets, spotify-this-song, movie-this, do-what-it-says");
    }
});



function tweet(){
var client = new Twitter({
	consumer_key: keys.consumer_key,
  	consumer_secret: keys.consumer_secret,
  	access_token_key: keys.access_token_key,
  	access_token_secret: keys.access_token_secret
})

 var params = {
        screen_name: 'mitali_mn',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log("There's an error === tweets !!!! ");
            console.log(error);
        } else {
            console.log("\n********Here are my top 20 tweets...!!********\n");
            for (var i = 0; i < 20; i++) {
                console.log(tweets[i].text);

                console.log("\nCreated At " + tweets[i].created_at + "\n");
                console.log("==============================");
            }
        }
    });
}


function spotifySong(mySong){

}

function myMovie(){
	console.log("======================\n Movie details\n======================");
    movieArgs = process.argv;
    var request = require('request');
    if (process.argv[2] == null) {
        movieName = "Mr+Nobody";
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";
        request(queryUrl, function(error, response, body) {
            // If the request is successful
            if (!error && response.statusCode === 200) {
                console.log("Movie Title : " + JSON.parse(body).Title+
                	"\nRelease Year : " + JSON.parse(body).Year+
                	 "\nIMDB Rating : " + JSON.parse(body).imdbRating+
                	 "\nCountry : " + JSON.parse(body).Country+
                	 "\nLanguage : " + JSON.parse(body).Language+
                	 "\nPlot : " + JSON.parse(body).Plot+
                	 "\nActors : " + JSON.parse(body).Actors+
                	 "\nRotten Tomatoes Rating : " + JSON.parse(body).tomatoRating+
                	 "\nRotten Tomatoes URL : " + JSON.parse(body).tomatoURL + "\n");
            }
        });

    } else {
        var movieName = "";
        for (var i = 2; i < movieArgs.length; i++) {
            movieName = movieName + " " + movieArgs[i];
        }
        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";

        request(queryUrl, function(error, response, body) {

            // If the request is successful
            if (!error && response.statusCode === 200) {
                console.log("Movie Title : " + JSON.parse(body).Title+
                	"\nRelease Year : " + JSON.parse(body).Year+
                	"\nIMDB Rating : " + JSON.parse(body).imdbRating+
                	"\nCountry : " + JSON.parse(body).Country+
                	"\nLanguage : " + JSON.parse(body).Language+
                	"\nPlot : " + JSON.parse(body).Plot+
                	"\nActors : " + JSON.parse(body).Actors+
                	"\nRotten Tomatoes Rating : " + JSON.parse(body).tomatoRating+
                	"\nRotten Tomatoes URL : " + JSON.parse(body).tomatoURL+"\n");
            }
        });
    }
}

function doAsSaid(){

}