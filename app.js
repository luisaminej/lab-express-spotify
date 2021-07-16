require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const app = express();
const SpotifyWebApi = require('spotify-web-api-node');


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

 



// setting the spotify-api goes here:

// Our routes go here:

//RUTAS

app.get("/", (req, res) => {
    
    res.render("index")
})

app.get("/artist-search", (req, res) => {
   

    spotifyApi
    .searchArtists(req.query.artist)
    .then(data => {
        
      console.log('The received data from the API: ', data.body.artists.items);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    
      res.render("artist-search-results", {artistInfo: data.body.artists.items
        
    })
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
    
})

app.get('/albums/:artistId', (req, res) => {
    // .getArtistAlbums() code goes here
    spotifyApi
    .getArtistAlbums(req.params.artistId)
    .then(data => {
        
      console.log('The received data from the API: ', data.body.items);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    
      res.render("albums", {albumInfo: data.body.items
        })
  })
  .catch(err => console.log('The error while searching albums occurred: ', err));
}); app.get('/tracks/:AlbumId', (req, res) => {
    // .getArtistAlbums() code goes here
    spotifyApi
    .getAlbumTracks(req.params.AlbumId)
    .then(data => {
        
      console.log('The received data from the API: ', data.body.items);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    
      res.render("tracks", {tracks: data.body.items
        })
  })
  .catch(err => console.log('The error while searching tracks occurred: ', err));
});



app.listen(process.env.PORT, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
