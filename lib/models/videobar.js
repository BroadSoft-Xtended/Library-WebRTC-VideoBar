module.exports = require('webrtc-core').bdsft.Model(Videobar, {
  config: require('../../js/config.js')
});

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Videobar(sipstack, sound, video, callcontrol, fullscreen, screenshare, transfer, timer, settings, urlconfig, cookieconfig, audio) {
  var self = {};

  self.props = ['classes'];

  self.bindings = {
    classes: {
        videobar: ['enableMute', 'enableHold'],
        sipstack: 'callState',
        screenshare: ['visible', 'enableScreenshare'],
        fullscreen: ['visible', 'enableFullscreen'],
        video: ['visible', 'displayResolution', 'enableSelfView'],
        callcontrol: ['visible', 'enableCallControl'],
        transfer: 'enableTransfer',
        timer: 'enableCallTimer',
        settings: 'enableSettings',
        audio: 'muted',
        urlconfig: ['view', 'hd'],
        cookieconfig: 'hd'
    },
    enableMute: {
      urlconfig: 'enableMute'
    },
    enableHold: {
      urlconfig: 'enableHold'
    }
  };

  return self;
}