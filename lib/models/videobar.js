module.exports = require('webrtc-core').bdsft.Model(Videobar, {
  config: require('../../js/config.js')
});

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Videobar(sipstack, sound, video, callcontrol, fullscreen, transfer, timer, settings, urlconfig, cookieconfig) {
  var self = {};

  self.props = ['classes'];

  self.bindings = {
    classes: {
        videobar: ['enableHold'],
        sipstack: 'callState',
        fullscreen: ['visible', 'enableFullscreen'],
        video: ['visible', 'displayResolution', 'enableSelfView'],
        callcontrol: ['visible', 'enableCallControl'],
        transfer: 'enableTransfer',
        timer: 'enableCallTimer',
        settings: 'enableSettings',
        urlconfig: ['view', 'hd'],
        cookieconfig: 'hd'
    },
    enableHold: {
      urlconfig: 'enableHold'
    }
  };

  return self;
}