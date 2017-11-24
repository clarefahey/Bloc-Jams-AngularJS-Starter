(function() {
     function SongPlayer($rootScope, Fixtures) {
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
      stopSong();
    }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
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
* @desc Current playback time (in seconds) of currently playing song
* @type {Number}
*/
      SongPlayer.currentTime = null;

/**
@desc current volume
@type {Number}
*/

      SongPlayer.volume = null;

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
*@function stopSong
*@desc stops song using buzz library stop method
*@param {Object} song
*/

  var stopSong = function(song) {
    currentBuzzObject.stop();
    SongPlayer.currentSong.playing = null;
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

/**
*@function SongPlayer.next
*@desc goes to the next song
*@param {Object} song
*/

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

        if (currentSongIndex > currentAlbum.length) {
          stopSong();
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
        }
    };

/**
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time
*/
    SongPlayer.setCurrentTime = function(time) {
        if (currentBuzzObject) {
          currentBuzzObject.setTime(time);
    }
  };

/**
*@function setVolume
*@desc sets current volume
*@param {Number}
*/

    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject){
        currentBuzzObject.setVolume(volume);
      }
    };
          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer',['$rootScope','Fixtures', SongPlayer]);
 })();
