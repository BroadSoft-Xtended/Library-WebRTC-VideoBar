module.exports = require('webrtc-core').bdsft.Model(VideoBar);

var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function VideoBar(sipstack, configuration) {
  var self = {};

  self.props = {'classes': true};

  var updateClasses = function(){
    self.classes = [sipstack.callState].concat(configuration.enabledFeatures());
  };

  self.listeners = function(sipstackDatabinder, configurationDatabinder) {
    sipstackDatabinder.onModelPropChange(['registered', 'callState'], function(){
      updateClasses();
    });
    configurationDatabinder.onModelPropChange(['enableMute', 'enableTransfer', 'enableHold', 'enableCallTimer', 
      'enableFullScreen', 'enableSelfView', 'enableSettings', 'enableDialpad', 'enableShareScreen', 'enableCallControl'], function(){
      updateClasses();
    });
  };

  return self;
}