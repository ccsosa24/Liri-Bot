// Basic Node application for requesting data from the OMDB website via axios
// Here we incorporate the "axios" npm package
var axios = require("axios");
var action = process.argv[2]
var movie= process.argv[3]
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "8405cfc60e7440e187cd5a0aba67eca2",
  secret: "603df7a5b27a4c8fa1bf3bb8b7acaa6f"
});


var songlist=function(song) {
  
 
spotify.search({ type: 'track', query: 'Sock it 2 Me' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
}


// We then run the request with axios module on a URL with a JSON
var movieThis=function(banana){
axios.get("http://www.omdbapi.com/?t="+banana+"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log(response.data.Title)
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);
}

if (action==="movie"){
  movieThis(movie)
}


songlist()