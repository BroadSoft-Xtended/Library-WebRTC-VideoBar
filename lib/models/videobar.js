module.exports = require('webrtc-core').bdsft.Model(Videobar);

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Videobar(eventbus, sipstack, configuration) {
  var self = {};

  self.props = {'classes': true, 'videoVisible': {
    onSet: function(){
      updateClasses();
    }
  }, 'callcontrolVisible' : {
    onSet: function(){
      updateClasses();
    }
  }, 'fullscreenVisible' : {
    onSet: function(){
      updateClasses();
    }
  }, 'soundVisible' : {
    onSet: function(){
      updateClasses();
    }
  }, 'screenshareVisible' : {
    onSet: function(){
      updateClasses();
    }
  }};

  var updateClasses = function(){
    self.classes = [
      sipstack.callState, 
      self.videoVisible ? 'video-shown' : 'video-hidden',
      self.callcontrolVisible ? 'callcontrol-shown' : 'callcontrol-hidden',
      self.fullscreenVisible ? 'fullscreen-shown' : 'fullscreen-hidden',
      self.soundVisible ? 'sound-shown' : 'sound-hidden',
      self.screenshareVisible ? 'screenshare-shown' : 'screenshare-hidden'
    ].concat(configuration.enabledFeatures()).concat(configuration.views);
  };

  self.listeners = function(sipstackDatabinder, configurationDatabinder) {
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
    sipstackDatabinder.onModelPropChange(['registered', 'callState'], function(){
      updateClasses();
    });
    configurationDatabinder.onModelPropChange(['enableMute', 'enableTransfer', 'enableHold', 'enableCallTimer', 
      'enableFullScreen', 'enableSelfView', 'enableSettings', 'enableDialpad', 'enableShareScreen', 'enableCallControl', 'views'], function(){
      updateClasses();
    });
  };

  return self;
}