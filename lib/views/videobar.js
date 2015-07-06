module.exports = require('webrtc-core').bdsft.View(VideobarView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles')
});

var Icon = require('webrtc-core').icon;
var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function VideobarView(eventbus, sipstack, sound, timerView, videobar, callcontrol, video, settings, fullscreen, screenshare, audio, transfer) {
  var self = {};

  self.elements = ['transfer', 'settings', 'dialpadShow', 'dialpadHide', 'timerHolder', 'hangup', 'fullscreenExpand', 'fullscreenContract',
    'mute', 'unmute', 'selfViewShow', 'selfViewHide', 'screenshareStart', 'screenshareStop', 'hold', 'resume'
  ];

  var clickHander = function(callback){
    return function(e) {
      e.preventDefault();
      sound.playClick();
      callback();
    }
  }
  self.init = function() {
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
    self.screenshareStart.bind('click', clickHander(function() {
      screenshare.start();
    }));
    self.screenshareStop.bind('click', clickHander(function() {
      screenshare.stop();
    }));
    self.fullscreenExpand.bind('click', clickHander(function() {
      fullscreen.start();
    }));
    self.fullscreenContract.bind('click', clickHander(function() {
      fullscreen.stop();
    }));
    self.selfViewHide.bind('click', clickHander(function() {
      video.visible = false;
    }));
    self.selfViewShow.bind('click', clickHander(function() {
      video.visible = true;
    }));
    self.mute.bind('click', clickHander(function() {
      audio.mute();
    }));
    self.unmute.bind('click', clickHander(function() {
      audio.unmute();
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