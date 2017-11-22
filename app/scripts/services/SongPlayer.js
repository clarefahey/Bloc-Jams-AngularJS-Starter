(function() {
     function SongPlayer() {
          var SongPlayer = {};
/**
* @desc holds current song
* @type {Object}
*/
          var currentSong = null;
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
        currentSong.playing = null;
    }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

      currentSong = song;
   };

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
         if (currentSong !== song) {
            setSong(song);
            playSong(song);
        } else if (currentSong === song) {
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
      currentBuzzObject.pause();
      song.playing = false;
    };


          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
