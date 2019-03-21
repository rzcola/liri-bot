require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var moment = require("moment");

// var spotify = new Spotify(keys.spotify);
// console.log(spotify)

//  hides spotify keys 
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var query = process.argv;
var type = process.argv[2];
var array = [];

//For loop in case the search term is multiple words ------------------------------
for (var i = 3; i < query.length; i++) {
  array.push(query[i]);
  array.push("+");
}
array.splice(-1);

var songSearch = array.join("");
var movieName = array.join("");
var concertSearch = array.join("");
// var doThis = array.join("");


//Switch statement for the commands entered for movies, concert, spotify---------------
switch (type) {
  case "movie-this":
    movieThis();
    break;

  case "concert-this":
    concertThis();
    break;

  case "spotify-this":
    spotifyThis();
    break;

  case "do-what-it-says":
    doIt();
    break;

  default:
    console.log(
      "Please enter a valid command 'movie-this' 'concert-this' 'spotify-this' or 'do-what-it-says"
    );
}
function spotifyThis() {
    if (songSearch === "") {
      songSearch = "I+believe+I+can+fly";
    }
  
    spotify.search({ type: "artist,track",  query: songSearch },

      function(err, data) {
        if (err) {
          return console.log("Error occurred: " + err);
        }
        console.log("Artist: ", data.tracks.items[0].artists[0].name);
        console.log("Song Title: ", data.tracks.items[0].name);
        console.log("Preview Song Link: ", data.tracks.items[0].preview_url);
        console.log("Album Title: ", data.tracks.items[0].album.name);
      }
    );
  }
// MOVIES (movie-this) ---------------------------
// Function to get movie from OMDB
function movieThis() {
    if (!movieName) {
        movieName = "Good Will Hunting";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // Creating a request with axios to the queryUrl
    axios.get(queryUrl).then(
        function (response) {
            if (!movieName) {
                movieName = "Good Will Hunting";
            }// console.log(response.data);
            // Data of Movie
            console.log("\n_Movie Info_" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);


        }
    );
}
// CONCERTS (conert-this) -----------------------------------------------

function concertThis() {
    if (concertSearch === "") {
      console.log("Invalid - please try again");
    } else {
      axios.get("https://rest.bandsintown.com/artists/" + concertSearch + "/events?app_id=codingbootcamp")
        .then(function(response) {
        
          if (response.data.length === 0) {
            console.log("No info for this artist");
          } else {
            for (var i = 0; i < response.data.length; i++) {
            console.log("Venue: ", response.data[i].venue.name);
            console.log("Venue City:", response.data[i].venue.city);
            console.log(("************** Date **************"));
            console.log((moment(response.data[i].datatime).format("")));
            }
          }
        });
    }
  }
  

// function searchSong(songName){
//     spotify
//     .search({ type: 'track', query: songName, limit: 1 })
//     .then(function(response) {
//        console.log("Artist: " , response.tracks.items[0].artists[0].name);
//     //    console.log("Name: " , response.tracks.items[0].[0]);


//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// }
// function searchConcert(bandName){
//     spotify
//     .search({ type: 'track', query: bandName })
//     .then(function(response) {
//       console.log(response);
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// }

// function findMovie(moiveName){
//     spotify
//     .search({ type: 'track', query: movieName })
//     .then(function(response) {
//       console.log(response);
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// }
// function doThis(){
//     fs.readFile("random.txt", "utf8", function(error, data) {

//         // If the code experiences any errors it will log the error to the console.
//         if (error) {
//           return console.log(error);
//         }
      
//         // We will then print the contents of data
//         // console.log(data);
      
//         // Then split it by commas (to make it more readable)
//         var dataArr = data.split(",");
//         dataArr[1] = dataArr[1].replace(/(\r\n|\n|\r)/gm, "");
//         // We will then re-display the content as an array for later use.
//         // console.log(dataArr[1]);

//         searchSong(JSON.parse(dataArr[1]));
//       });
      
//      };
      
// }
// searchSong("PRBLMS");
// function whatToSearch (command) {
// 	if (command === 'concert-this') {
//     searchConcert(process.argv[3])
//   } else if (command === 'spotify-this-song') {
//     searchSong(process.argv[3])
//   } // keep going with the other two functions
// }

// // then at very end of code 
// whatToSearch(process.argv[2])