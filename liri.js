//npm packages
var inquirer = require("inquirer");
var keys = require('./keys');
var Twitter = require('twitter');
var spotify = require('spotify');
//======== Arguments passed by the user ======
var actualArgs = "";
var myArgs = process.argv;

for (i = 2; i < myArgs.length; i++) {
    actualArgs = actualArgs + " " + myArgs[i];
}

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
            spotifySong(actualArgs);
            break;
        case "movie-this":
            myMovie(actualArgs);
            break;
        case "do-what-it-says":
            doAsSaid();
            break;
        default:
            console.log("Please Select from the options- my-tweets, spotify-this-song, movie-this, do-what-it-says");
    }

});



function tweet() {
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


function spotifySong(song) {
    if (song == "") {
        song = "The Sign Ace of base";
    }
    spotify.search({
            type: 'track',
            query: song
        },
        function(err, data) {
            if (err) {
                console.log("There s an error == spotify!!!! ");
                console.log(err);
            }
            console.log("\nHere are the Song details\n=====================")
            console.log("\nArtist Name : " + data.tracks.items[0].artists[0].name + "\nSong name : " + data.tracks.items[0].name + "\nPreview URL : " + data.tracks.items[0].preview_url + "\nAlbum name : " + data.tracks.items[0].album.name + "\n");
        });
}

function myMovie(movieName) {

    var request = require('request');
    console.log("======================\n Movie details\n======================");

    if (movieName == "") {
        movieName = "Mr+Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";
    request(queryUrl, function(error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log("\nMovie Title : " + JSON.parse(body).Title +
                "\n\nRelease Year : " + JSON.parse(body).Year +
                "\n\nIMDB Rating : " + JSON.parse(body).imdbRating +
                "\n\nCountry : " + JSON.parse(body).Country +
                "\n\nLanguage : " + JSON.parse(body).Language +
                "\n\nPlot : " + JSON.parse(body).Plot +
                "\n\nActors : " + JSON.parse(body).Actors +
                "\n\nRotten Tomatoes Rating : " + JSON.parse(body).tomatoRating +
                "\n\nRotten Tomatoes URL : " + JSON.parse(body).tomatoURL + "\n");
        } //if 
    });
} //function closed

function doAsSaid() {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var myArray = data.split(",");
            // 	console.log(myArray[0]);
            // 	console.log(myArray[1]);
            var myString = myArray[1];
            myString = myString[1].substring(1, myString[1].length - 1);

            switch (myArray[0]) {
                case "spotify-this-song":
                    spotifySong(myArray[1]);
                    break;
                case "movie-this":
                    myMovie(myArray[1]);
                    break;
                case "my-tweets":
                    tweet();
                    break;
                default:
                    console.log("send proper comments in the file");
            }
        }
    });
}


function logEverything(logData){
	fs.appendFile("log.txt", logData , function(err){
		if(err){
			console.log("Error in writing file "+err);
		}
		console.log("File updated in log.txt")
	} );
}