# foswig
## Project title and Deployed Link
LIRI is a command line version of Siri. It accepts commands from the command line and outputs the result which fits the command

## Motivation
It is an intersting way to learn and practice  Node js , though it is a part of assignment

## Technologies used and why
Ex. -

<b>Axios npm package</b>
- [Axios]https://www.npmjs.com/package/axios
<b>is used to make calls to API's<b>

<b>Spotify npm package</b>
- [Spotify]https://www.npmjs.com/package/node-spotify-api
<b>is used to pull song details from spotify api<b>

<b>OMDB API</b>
- [OMDB API](http://www.omdbapi.com/?apikey=[yourkey])
<b>is used to the information for a movie<b>

<<b>Moment JS</b>
-  [Moment](https://www.npmjs.com/package/moment)
<b>is used to modify date format<b>

<<b>FS npm package</b>
- [FS](https://www.npmjs.com/package/fs)
<b>is used to append content  to files<b>

<<b>Bands in town</b>
- [bands in town api](http://www.artists.bandsintown.com/bandsintown-api)
<b>is used to get the information on event details for the required band<b>

<<b>DotEnv/b>
- [DotEnv](https://www.npmjs.com/package/dotenv)
<b>to read environment variables from env file<b>


 



## Features
The functional aspect,handling defaults

## Screenshots
Please find the demo in the below link:
https://drive.google.com/file/d/1Ds4jOuRnSzkMM5sP9uesHF36DjJdCneW/view

## Code Example
when the user types in command thgen it will output result based on the command entered.It is also built to handle defaults .It also logs output to log.txt

## Installation
git clone the package from the location:
git pull the code
 run npm install to install all the required node modules
 start running the program by typing in one of the below commands:
 * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

you can change the content in random.txt file to  any of the above commands if you want to run the do_what_it_says_command.By defaukt it is configured to run `spotify-this-song` for "I Want it That Way,"

## How to use?
 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
 liri can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`



 LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.


3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

     * It's on Netflix!

   

4. `node liri.js do-what-it-says`

   *  LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * Edit the text in random.txt to test out the feature for movie-this and concert-this.




## Credits
My CLI class room task

#### Anything else that seems useful

## License
A short snippet describing the license (MIT, Apache etc)

MIT © [Alekhya]()
