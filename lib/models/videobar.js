module.exports = require('webrtc-core').bdsft.Model(Videobar);

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function Videobar(eventbus, sipstack, configuration) {
  var self = {};

  self.props = {'classes': true, 'videoVisible': {
    onSet: function(){
      updateClasses();
    }
  }};

  var updateClasses = function(){
    self.classes = [
      sipstack.callState, 
      self.videoVisible ? 'video-shown' : 'video-hidden',
    ].concat(configuration.enabledFeatures());
  };

  self.listeners = function(sipstackDatabinder, configurationDatabinder) {
    eventbus.on('viewChanged', function(e){
      if(e.view === 'video') {
        self.videoVisible = e.visible;
      }
    });
    sipstackDatabinder.onModelPropChange(['registered', 'callState'], function(){
      updateClasses();
    });
    configurationDatabinder.onModelPropChange(['enableMute', 'enableTransfer', 'enableHold', 'enableCallTimer', 
      'enableFullScreen', 'enableSelfView', 'enableSettings', 'enableDialpad', 'enableShareScreen', 'enableCallControl'], function(){
      updateClasses();
    });
    updateClasses();
  };

  return self;
}