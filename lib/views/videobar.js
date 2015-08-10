module.exports = require('webrtc-core').bdsft.View(VideobarView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles')
});

var Icon = require('webrtc-core').icon;
var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function VideobarView(eventbus, sipstack, sound, timerView, videobar, callcontrol, video, settings, fullscreenView, audioView, transfer, urlconfig) {
  var self = {};

  self.elements = ['transfer', 'settings', 'dialpadShow', 'dialpadHide', 'timerHolder', 'fullscreenHolder', 'muteHolder', 'hangup', 'selfViewShow', 'selfViewHide',
   'hold', 'resume', 'cell'
  ];

  var clickHander = function(callback){
    return function(e) {
      e.preventDefault();
      sound.playClick();
      callback();
    }
  }

  self.insertView = function(view, position) {
    view.view.insertAfter(self.cell[position]);
  };

  self.init = function() {
    fullscreenView.view.appendTo(self.fullscreenHolder);
    audioView.view.appendTo(self.muteHolder);
    timerView.view.appendTo(self.timerHolder);
  };

  self.listeners = function() {
    self.hold = new Icon(self.hold, sound);
    self.resume = new Icon(self.resume, sound);

    eventbus.on(['held', 'resumed'], function(e) {
      self.hold.enable();
      self.resume.enable();
    });
    self.transfer.bind('click', clickHander(function() {
      transfer.toggle();
    }));
    self.settings.bind('click', clickHander(function() {
      settings.toggle();
    }));
    self.dialpadShow.bind('click', clickHander(function() {
      callcontrol.show();
    }));
    self.dialpadHide.bind('click', clickHander(function() {
      callcontrol.hide();
    }));
    self.selfViewHide.bind('click', clickHander(function() {
      video.showLocal = false;
    }));
    self.selfViewShow.bind('click', clickHander(function() {
      video.showLocal = true;
      video.showRemote = true;
    }));
    self.hold.onClick(function(e) {
      self.hold.disable();
      sipstack.hold();
    });
    self.resume.onClick(function(e) {
      self.resume.disable();
      sipstack.unhold();
    });
    self.hangup.bind('click', clickHander(function() {
      eventbus.endCall();
    }));

  };

  return self;
}