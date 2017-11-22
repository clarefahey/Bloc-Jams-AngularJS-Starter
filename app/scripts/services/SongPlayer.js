(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
/**
*@desc which album is playing
*@type {Object}
*/
          var currentAlbum = Fixtures.getAlbum();

/**
 * @desc Buzz object audio file
 * @type {Object}
 */
          var currentBuzzObject = null;
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */

   var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        songPlayer.currentSong.playing = null;
    }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

      SongPlayer.currentSong = song;
   };

/**
*@function getSongIndex
*@desc retreives song index for next and prev buttons
*@param {Object} song
*/

   var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
  };

/**
* @desc holds current song
* @type {Object}
*/
      SongPlayer.currentSong = null;

/**
* @function playSong
*@desc Plays song using the buzz library play method
*@param {Object} song
*/

  var playSong = function(song){
    currentBuzzObject.play();
    song.playing = true;
  }

/**
*@function songPlayer
*@desc checks if a song is playing, calls a song when play is pushed, pauses song
*@param {Object} song
*/

   SongPlayer.play = function(song) {
         song = song || SongPlayer.currentSong;
         if (SongPlayer.currentSong !== song) {
            setSong(song);
            playSong(song);
        } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
            playSong(song);
          }
      }
  };

/**
*@function songPlayer.pause
*@desc pauses the song
*@param {Object} song
*/
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

/**
*@function SongPlayer.previous
*@desc goes to the previous song
*@param {Object} song
*/

    SongPlayer.previous = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex--;

    if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
  };


          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer',['Fixtures', SongPlayer]);
 })();
