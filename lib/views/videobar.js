module.exports = require('webrtc-core').bdsft.View(VideobarView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles')
});

var Icon = require('webrtc-core').icon;
var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function VideobarView(eventbus, sound, timerView, videobar, callcontrol, video, settings, fullscreen) {
  var self = {};

  self.elements = ['transfer', 'settings', 'dialpadIconShow', 'dialpadIconHide', 'cellTimer', 'hangup', 'fullScreenExpand', 'fullScreenContract',
    'muteAudioIcon', 'unmuteAudioIcon', 'selfViewEnable', 'selfViewDisable', 'shareScreen', 'stopShareScreen', 'hold', 'resume', 'videoBar'
  ];

  var clickHander = function(callback){
    return function(e) {
      e.preventDefault();
      sound.playClick();
      callback();
    }
  }
  self.init = function() {
    timerView.view.appendTo(self.cellTimer);
  };

  self.listeners = function() {
    self.hold = new Icon(self.hold, sound);
    self.resume = new Icon(self.resume, sound);

    eventbus.on('callHeld', function(e) {
      self.hold.enable();
    });
    eventbus.on('callResumed', function(e) {
      self.resume.enable();
    });
    eventbus.on('screenshareFailure', function(e) {
      // TODO - screenSharingUnsupported not implemented
      // no way to distinguish between flag not enabled or simply rejected enabling screen sharing
      if (e.e) {
        self.screenSharingUnsupported.show();
      }
    });
    self.transfer.bind('click', clickHander(function() {
      transfer.toggle();
    }));
    self.settings.bind('click', clickHander(function() {
      settings.toggle();
    }));
    self.dialpadIconShow.bind('click', clickHander(function() {
      callcontrol.show();
    }));
    self.dialpadIconHide.bind('click', clickHander(function() {
      callcontrol.hide();
    }));
    self.shareScreen.bind('click', clickHander(function() {
      videobar.enableScreenshare(true);
    }));
    self.stopShareScreen.bind('click', clickHander(function() {
      videobar.enableScreenshare(false);
    }));
    self.fullScreenExpand.bind('click', clickHander(function() {
      fullscreen.enable(true);
    }));
    self.fullScreenContract.bind('click', clickHander(function() {
      fullscreen.enable(false);
    }));
    self.selfViewDisable.bind('click', clickHander(function() {
      video.visible = false;
    }));
    self.selfViewEnable.bind('click', clickHander(function() {
      video.visible = true;
    }));
    self.muteAudioIcon.bind('click', clickHander(function() {
      sound.setMuted(true);
    }));
    self.unmuteAudioIcon.bind('click', clickHander(function() {
      sound.setMuted(false);
    }));
    self.hold.onClick(function(e) {
      self.hold.disable();
      eventbus.holdCall();
    });
    self.resume.onClick(function(e) {
      self.resume.disable();
      eventbus.resumeCall();
    });
    self.hangup.bind('click', clickHander(function() {
      eventbus.endCall();
    }));

  };

  return self;
}