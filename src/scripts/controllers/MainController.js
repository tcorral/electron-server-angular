(function () {
  'use strict';

  angular
  .module('electron-server-angular', [])
  .controller('MainController', MainController);

  function MainController() {
    this.message = 'Electron server angular';
  }
}());