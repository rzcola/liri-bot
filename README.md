# liri-bot

* LIRI is a Line Inquirer Response Interpreter bot that handles various API calls from the Command Line Interface using Node.js

## Liri uses inquirer to interpret commands.

* You can select from 4 available commands
1. "concert-this"
LIRI will check the Bands/Artist in your Town or City API for upcoming events from the artist or band(s) input by the user.
Dates format is returned via moment.js

2. "spotify-this"
LIRI will check the Spotify API for the song title input by the user.
If no song is input, LIRI returns the information for "I Believe I Can Fly" by R. Kelly
![Screenshot](/songs.png)

3. "movie-this"
LIRI will check the OMDB API for the movie title input by the user.
If no movie is input, LIRI returns the information for "Good Will Hunting"


* In progress 
- Log.txt
- LIRI will also create and log all search results in "log.txt" for later use.

4. "do-what-it-says"
LIRI will do what IT says.
IT is the included text file "random.txt" which commands LIRI to return the "spotify-this" result for the value in "random.txt" (default: "Look Back at It") 