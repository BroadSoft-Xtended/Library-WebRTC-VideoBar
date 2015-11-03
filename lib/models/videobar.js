module.exports = require('bdsft-sdk-model')(Videobar, {
  config: require('../../js/config.js')
});

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Videobar(sipstack, sound, video, callcontrol, fullscreen, transfer, timer, settings, urlconfig, cookieconfig, audio) {
  var self = {};

  self.props = ['classes'];

  self.bindings = {
    classes: {
        audio: 'enableMute',
        videobar: ['enableHold'],
        sipstack: ['callState', 'sendVideo', 'receiveVideo'],
        fullscreen: ['visible', 'enableFullscreen'],
        video: ['displayResolution', 'enableSelfView', 'showLocal'],
        callcontrol: ['visible', 'enableCallControl'],
        transfer: 'enableTransfer',
        timer: 'enableCallTimer',
        settings: 'enableSettings',
        urlconfig: ['hd'],
        cookieconfig: 'hd'
    },
    enableHold: {
      urlconfig: 'enableHold'
    }
  };

  return self;
}