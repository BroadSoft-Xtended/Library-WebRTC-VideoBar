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

  return self;
}