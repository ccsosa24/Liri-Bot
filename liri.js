require('dotenv').config();

var keys = require("./keys");
var request = require("request");
var filename = ("./random.txt");
//var log = require('simple-node-logger').createSimpleFileLogger(filename);
// log.setLevel('all');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: "8405cfc60e7440e187cd5a0aba67eca2",
    secret: "603df7a5b27a4c8fa1bf3bb8b7acaa6f"
  });
  

//var spotify = new Spotify(spotify);

var getArtistName = function (artist) {
    return artist.name;
};


var userCommand = process.argv[2]
var secondCommand = process.argv[3]

for(var i = 5; i < process.length; i++){
    secondCommand += '+' + process.argv[i];
}

mySwitch(userCommand);


// SPOTIFY 
function spotifyMe(songName) {

  if (songName === undefined) {
    songName = "Freak like me";
  }

  spotify.search({ type: 'track', query: songName, limit: 5 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }


    var songs = data.tracks;
    console.log(songs);

    for (var i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("artist(s): " + songs[i].artist.map(getArtistName));
      console.log("song name: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("-------------------------");
      }

    }
  );
};


function testfun(){
    console.log("your in the test function")
}


function mySwitch(userCommand) {
  switch (userCommand) {
    case 'concert-this':
      hearMyBands(secondCommand);
      break;
    case 'spotify-this-song':
    //    testfun()
      spotifyMe(secondCommand);
      break;
    case 'movie-this':
      movieUs(secondCommand);
      break;
    case 'do-what-it-says':
      doWhat(secondCommand);
      break;

    
  };





  // MOVIES

  function movieUs(movieName) {
   
      //var movieName = secondCommand;
      var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200){
            var body = JSON.parse(body);

           
            console.log('================ Movie Info =============');
            console.log("Title: " +body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.Year);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[0].Value);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
            console.log('================= FIN ==================');

        }
        else {
            console.log("Error occurred.")
        }
        if (movieName === "Mr. Nobody") {
            console.log("---------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should:  http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix");
        }



        
    });
  
}


 function doWhat() {
     fs.readFile("ramdon.txt", "utf8", function (error, data) {
         if(!error);
         console.log(data.toString());

         var cmds = data.toString().split(',');
     });
 }



  // BAND IN TOWN
  function hearMyBands(artist) {
    var url = 'https://rest.bandsintown.com/artists/' + artist + '/events?';
    axios.get(url, {
      params: {
        app_id: 'codingbootcamp'
      }
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



}

