(function() {
<<<<<<< HEAD
    function AlbumCtrl() {
        this.albumData = angular.copy(albumPicasso);
    }
=======
    function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum ();
      }
>>>>>>> cp6

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
