module.exports = require('webrtc-core').bdsft.Model(Videobar);

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Videobar(eventbus, sipstack, configuration) {
  var self = {};

  self.props = {'classes': true, 
  'videoVisible': true, 'callcontrolVisible' : true, 'fullscreenVisible' : true, 'soundVisible' : true, 'screenshareVisible' : true};

  self.bindings = {
    'classes': {
        videobar: ['videoVisible', 'callcontrolVisible', 'fullscreenVisible', 'soundVisible', 'screenshareVisible'],
        sipstack: 'callState',
        configuration: ['enableMute', 'enableTransfer', 'enableHold', 'enableCallTimer', 
      'enableFullScreen', 'enableSelfView', 'enableSettings', 'enableDialpad', 'enableShareScreen', 'enableCallControl', 'views']
    }
  }

  self.listeners = function() {
    eventbus.on('viewChanged', function(e){
      if(e.view === 'video') {
        self.videoVisible = e.visible;
      }
      else if(e.view === 'callcontrol') {
        self.callcontrolVisible = e.visible;
      }
      else if(e.view === 'fullscreen') {
        self.fullscreenVisible = e.visible;
      }
      else if(e.view === 'sound') {
        self.soundVisible = e.visible;
      }
      else if(e.view === 'screenshare') {
        self.screenshareVisible = e.visible;
      }
    });
  };

  return self;
}