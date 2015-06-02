module.exports = require('webrtc-core').bdsft.Model(Videobar, {
  config: require('../../js/config.js')
});

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Videobar(eventbus, sipstack, sound, video, callcontrol, fullscreen, transfer, timer, settings, urlconfig, cookieconfig) {
  var self = {};

  self.props = ['classes', 'screenshareVisible'];

  self.bindings = {
    classes: {
        videobar: ['screenshareVisible', 'enableMute', 'enableHold', 'enableFullScreen', 'enableDialpad', 'enableShareScreen'],
        sipstack: 'callState',
        fullscreen: 'visible',
        video: ['visible', 'displayResolution', 'enableSelfView'],
        callcontrol: ['visible', 'enableCallControl'],
        transfer: 'enableTransfer',
        timer: 'enableCallTimer',
        settings: 'enableSettings',
        sound: 'visible',
        urlconfig: ['view', 'hd'],
        cookieconfig: 'hd'
    },
    enableFullScreen: {
      urlconfig: 'enableFullScreen'
    },
    enableMute: {
      urlconfig: 'enableMute'
    },
    enableHold: {
      urlconfig: 'enableHold'
    },
    enableDialpad: {
      urlconfig: 'enableDialpad'
    }
  }

  self.enableScreenshare = function(enabled) {
    eventbus.screenshare(enabled);
    self.screenshareVisible = enabled;
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