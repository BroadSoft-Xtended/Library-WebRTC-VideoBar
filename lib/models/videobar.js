module.exports = require('webrtc-core').bdsft.Model(Videobar);

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Videobar(eventbus, sipstack, configuration, sound, video, callcontrol) {
  var self = {};

  self.props = ['classes', 'fullscreenVisible', 'screenshareVisible'];

  self.bindings = {
    'classes': {
        videobar: ['fullscreenVisible', 'screenshareVisible'],
        sipstack: 'callState',
        video: 'visible',
        callcontrol: 'visible',
        sound: 'visible',
        configuration: ['enableMute', 'enableTransfer', 'enableHold', 'enableCallTimer', 
      'enableFullScreen', 'enableSelfView', 'enableSettings', 'enableDialpad', 'enableShareScreen', 'enableCallControl', 'views']
    }
  }

  self.enableScreenshare = function(enabled) {
    eventbus.screenshare(enabled);
    self.screenshareVisible = enabled;
  };

  self.enableFullscreen = function(enable) {
    self.fullscreenVisible = enable;
    if(!enable) {
      if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    } else {
      if (document.webkitRequestFullScreen) {
        document.webkitRequestFullScreen();
      }      
    }
  };

  self.listeners = function(){
    eventbus.on('screenshare', function(e) {
      self.screenshareVisible = e.enabled;
    });
  };

  self.init = function(){
    // self.enableSelfView(true);
    // self.enableSound(!sound.muted);
  };

  return self;
}