// # LIRI Bot

//axios for api calls
var axios = require("axios");
var fs = require('fs');
//moment for date formatting
var moment = require('moment');

//dotenv for getting env variables
require("dotenv").config();
var Spotify = require('node-spotify-api');
var divider= "\n===============================================================================================\n";
var endline="*********End of results****************\n"
//Keys.js contain spotify keys


  var keys = require("./keys.js");


//instantiating spotify object

  var spotify = new Spotify(keys.spotify);
  
  // console.log(spotify);

   var command=process.argv[2];
   var choice= process.argv.slice(3).join(" ");
  //  console.log(command);

// ### What Each Command Should Do
action(command,choice);

function action(command,choice){
// 1. `node liri.js concert-this <artist/band name here>`
var command=command;
var choice=choice;
if(command==="concert-this")
{
concertthis(choice);
}


// 2. `node liri.js spotify-this-song '<song name here>'`
else if(command==="spotify-this-song")
{
  spotifysong(choice);
   
}
  
// 3. `node liri.js movie-this '<movie name here>'`
else if(command==="movie-this")
{
  moviethis(choice);
}

// 4. `node liri.js do-what-it-says`
else if(command==="do-what-it-says")
{
dowhatitsays();
}

else {

  console.log("Sorry I dont understand !\n please enter any of the commands below:\n concert-this [artist or band name]\nspotify-this-song [song]\nmovie-this [movie name]\n\n ");
}
}




function concertthis(choice){
   var artist=choice;




  // * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
// console.log("artist"+artist);
// var artists=artist.trim()
if(!artist){
  
    // console.log("Artist"+artist)
    // console.log("**********Sorry I dont recognize the artist .Please enter a valid artist**************");
    var finalstring="**********Sorry I dont recognize the artist .Please enter a valid artist**************\n"+endline;
    writetolog(finalstring);
    console.log(finalstring);
  }
  // console.log("Artist"+artist)
  else {
  var queryURL="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
// console.log(queryURL);
axios
  .get(queryURL)
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    // console.log(divider);
   
    var line1= "\nThe following are the concert details for the " +artist
    +" Band";
   
   var limit=response.data.length;
   if(limit>=5)
   {
     limit=5;
   }
   var loopresult="";
    for(var i=0;i<limit;i++)
    {
      var date=moment(response.data[i].datetime).format('DD-MM-YYYY HH:MM')+"HRS";
      var result =["Name of the venue : "+response.data[i].venue.name,
      "Venue location : "+response.data[i].venue.city+","+response.data[i].venue.region+","+response.data[i].venue.country,
      "Date of the Event : "+date
        ].join("\n\n");
       loopresult=loopresult+divider+"Event "+(i+1)+" Details"+divider+result;

      // console.log(divider);
      // console.log("Event "+(i+1)+" Details")
      // console.log(divider);
  //  console.log("Name of the venue : "+response.data[i].venue.name+"\n");
  //  console.log("Venue location : "+response.data[i].venue.city+","+response.data[i].venue.region+","+response.data[i].venue.country+"\n");
  
    
  //   console.log("Date of the Event : "+date+"\n");
    // return response;
   
    }
    var finalstring=line1+loopresult+divider+endline;
    writetolog(finalstring);
    console.log(finalstring);
   
    // console.log(divider);
    // console.log("*********End of results****************\n");
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
 
}

}

function spotifysong(choice){
  var song=choice
  // console.log(song);
if(!song)
{
  // console.log(divider);
  // console.log("\n No song has been provided,hence displaying the results for The Sign by Ace of Base  song\n");
  // console.log(divider);
  var line1="\n No song has been provided,hence displaying the results for The Sign by Ace of Base  song\n"
  spotify
  .search({ type: 'track', query: "The Sign by Ace of Base",limit: 5})
  .then(function(response) {
   var loopresult="";
    for(var i=0;i< response.tracks.items.length;i++){
      var lineheader=(i+1)+" : "+" Song Details";
    //   console.log(divider);
    // console.log(i+" : "+" Song Details \n")
    // console.log(divider);
      // loops through all Artist(s) and print them
      var artist="";
      for(var j=0;j < response.tracks.items[i].album.artists.length;j++)
      {

artist = artist + response.tracks.items[i].album.artists[j].name+", ";



      }
  // console.log("Artists   : "+artist);
// * The song's name   

      var result =["Artists   : "+artist,
        "Name       : "+ response.tracks.items[i].album.name,
      "Track      : "+response.tracks.items[i].album.external_urls.spotify,
      "Album Name : "+response.tracks.items[i].album.name

        ].join("\n\n");
       loopresult=loopresult+divider+lineheader+divider+result;

  // console.log("Name       : "+ response.tracks.items[i].album.name);

  // //  * A  link of the song from Spotify
  
  // console.log("Track      : "+response.tracks.items[i].album.external_urls.spotify);
  // //  * The album that the song is from
  // console.log("Album Name : "+response.tracks.items[i].album.name);
    }
    var finalstring=line1+loopresult+divider+endline;
    writetolog(finalstring);
    console.log(finalstring);
    
    // console.log(divider);
    // console.log("*********End of results****************\n");
  })
  .catch(function(err) {
    console.log("some issues with spotify"+err);
  });

}
else{  //  * This will show the following information about the song in your terminal/bash window
  // console.log( divider);
  // console.log("\nThe following are the details for the requested " +song+ " song\n");
  var line1="\nThe following are the details for the requested " +song+ " song\n"
  // console.log( divider);
    //  * Artist(s)
    spotify
    .search({ type: 'track', query: song, limit: 5})
    .then(function(response) {

     
      //loop to print all the spotify details found for the song
     
   var loopresult=""
      for(var i=0;i< response.tracks.items.length;i++){
      //   console.log(divider);
      // console.log((i+1)+" : "+" Song Details \n")
      // console.log(divider);
      var lineheader=(i+1)+" : "+" Song Details";
        // loops through all Artist(s) and print them
        var artist="";
        for(var j=0;j < response.tracks.items[i].album.artists.length;j++)
        {

artist = artist + response.tracks.items[i].album.artists[j].name+", ";

 

        }
        var result =["Artists   : "+artist,
        "Name       : "+ response.tracks.items[i].album.name,
      "Track      : "+response.tracks.items[i].album.external_urls.spotify,
      "Album Name : "+response.tracks.items[i].album.name

        ].join("\n\n");
       loopresult=loopresult+divider+lineheader+divider+result;


        //Print all artists
  //   console.log("Artists    : "+artist);
  // // * The song's name   
  //   console.log("Name       : "+ response.tracks.items[i].album.name);

  //   //  * A  link of the song from Spotify
    
  //   console.log("Track      : "+response.tracks.items[i].album.external_urls.spotify);
  //   //  * The album that the song is from
  //   console.log("Album Name : "+response.tracks.items[i].album.name);
      }
    //   console.log(divider);
    // console.log("*********End of results****************\n");
    var finalstring=line1+loopresult+divider+endline;
    writetolog(finalstring);
    console.log(finalstring);
    })
    .catch(function(err) {
      console.log("some issues with spotify"+err);
    });

  }
}

  



function moviethis(choice){
  var movie=choice;
  // console.log(movie);
  if(!movie)
  {
// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
var queryURL="http://www.omdbapi.com/?t=" +"Mr. Nobody" + "&y=&plot=short&apikey=trilogy";;
   
// console.log(queryURL);
axios
.get(queryURL)
.then(function(response) {
// If the axios was successful...
// Then log the body from the site!
// console.log(response);
// return response;
// console.log("The following are the details for the Mr.Nobody movie.\nIf you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947It's on Netflix!")
var line1= "The following are the details for the Mr.Nobody movie.\nIf you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947.\nIt's on Netflix!"+divider;
// console.log(divider);
var result =["Movie Title     : "+response.data.Title,
"Year            : "+response.data.Year,
"IMDB Rating     : "+response.data.Ratings[0].Value,
"Rotten Tomatoes : "+response.data.Ratings[1].Value,
"Country         : "+response.data.Country,
"Language        : "+response.data.Language,
"Plot            : "+response.data.Plot,
"Actors          : "+response.data.Actors
        ].join("\n\n");
// console.log("Movie Title     : "+response.data.Title);
// console.log("\nYear            : "+response.data.Year);
// console.log("\nIMDB Rating     : "+response.data.Ratings[0].Value);
// console.log("\nRotten Tomatoes : "+response.data.Ratings[1].Value);
// console.log("\nCountry         : "+response.data.Country);
// console.log("\nLanguage        : "+response.data.Language);
// console.log("\nPlot            : "+response.data.Plot);   
// console.log("\nActors          : "+response.data.Actors);  
// console.log(divider);
var finalstring=line1+result+divider+endline;
writetolog(finalstring);
console.log(finalstring);
// console.log("*********End of results****************\n");
})
.catch(function(error) {
if (error.response) {
 // The request was made and the server responded with a status code
 // that falls out of the range of 2xx
 console.log(error.response.data);
 console.log(error.response.status);
 console.log(error.response.headers);
} else if (error.request) {
 // The request was made but no response was received
 // `error.request` is an object that comes back with details pertaining to the error that occurred.
 console.log(error.request);
} else {
 // Something happened in setting up the request that triggered an Error
 console.log("Error", error.message);
}
console.log(error.config);
});
    ///////////////
    

  }
   else{

    var queryURL="http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
   
    //  console.log(queryURL);

      //  * This will show the following information about the movie in your terminal/bash window
  // console.log(divider);
  // console.log("\nThe following are the details for the requested " +movie+" movie\n");
  var line1="\nThe following are the details for the requested " +movie+" movie"+divider;
  // console.log(divider);
    axios
  .get(queryURL)
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    //console.log(response.data);
    var result =["Movie Title     : "+response.data.Title,
"Year            : "+response.data.Year,
"IMDB Rating     : "+response.data.Ratings[0].Value,
"Rotten Tomatoes : "+response.data.Ratings[1].Value,
"Country         : "+response.data.Country,
"Language        : "+response.data.Language,
"Plot            : "+response.data.Plot,
"Actors          : "+response.data.Actors
        ].join("\n\n");
    var finalstring=line1+result+divider+endline;
    writetolog(finalstring);
console.log(finalstring);
// console.log(divider);
//     console.log("Movie Title     : "+response.data.Title);
//     console.log("\nYear            : "+response.data.Year);
//     console.log("\nIMDB Rating     : "+response.data.Ratings[0].Value);
//     console.log("\nRotten Tomatoes : "+response.data.Ratings[1].Value);
//     console.log("\nCountry         : "+response.data.Country);
//     console.log("\nLanguage        : "+response.data.Language);
//     console.log("\nPlot            : "+response.data.Plot);   
//     console.log("\nActors          : "+response.data.Actors);  
//       console.log(divider);
      
//     console.log("*********End of results****************\n");
    // return response;
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

   }

}

function dowhatitsays(){
  // console.log("Inside do what it says");
  fs.readFile('./random.txt',"utf-8" ,function read(err, data) {
    if (err) {
        throw err;
    }
    var content=data.split(",");
   

    action(content[0],content[1]);
    

    
});
}

function writetolog(finalstring)
{
  fs.appendFile("log.txt", finalstring , function (err) {
    if (err) throw err;

  })
}
