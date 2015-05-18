module.exports = require('webrtc-core').bdsft.View(VideobarView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles')
});

var Icon = require('webrtc-core').icon;
var Constants = require('webrtc-core').constants;
var Utils = require('webrtc-core').utils;

function VideobarView(eventbus, sound, timerView, videobar, video, callcontrol, settings, transfer) {
  var self = {};

  self.fullScreen = false;
  self.isScreenSharing = false;
  self.soundEnabled = true;

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
  var toggleSelfView = function(selfViewVisible) {
    video.visible = selfViewVisible || !video.visible;
  };

  var toggleSound = function(soudEnabled) {
    self.enableSound(soudEnabled || !self.soundEnabled);
  };

  var toggleShareScreen = function() {
    self.enableScreenSharing(!self.isScreenSharing);
  };

  var toggleFullScreen = function() {
    self.enableFullScreen(!self.fullScreen);
  };

  self.init = function() {
    toggleSelfView(true);
    toggleSound(self.soundEnabled);

    timerView.view.appendTo(self.cellTimer);

  };

  self.enableScreenSharing = function(enabled) {
    eventbus.screenshare(enabled);
    videobar.screenshareVisible = enabled;
  };

  self.enableFullScreen = function(enable) {
    if(!enable) {
      if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    } else {
      if (document.webkitRequestFullScreen) {
        document.webkitRequestFullScreen();
      }      
    }
    self.fullScreen = enable;
    videobar.fullscreenVisible = enable;
  };

  self.updateFullScreen = function() {
    var enable = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
    self.enableFullScreen(enable);
  };

  self.enableSound = function(enable) {
    self.soundEnabled = enable;
    sound.setMuted(!enable);
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
    eventbus.on('screenshare', function(e) {
      self.isScreenSharing = e.enabled;
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
      toggleShareScreen();
    }));
    self.stopShareScreen.bind('click', clickHander(function() {
      toggleShareScreen();
    }));
    self.fullScreenExpand.bind('click', clickHander(function() {
      toggleFullScreen();
    }));
    self.fullScreenContract.bind('click', clickHander(function() {
      toggleFullScreen();
    }));
    self.selfViewDisable.bind('click', clickHander(function() {
      toggleSelfView();
    }));
    self.selfViewEnable.bind('click', clickHander(function() {
      toggleSelfView();
    }));
    self.muteAudioIcon.bind('click', clickHander(function() {
      toggleSound();
    }));
    self.unmuteAudioIcon.bind('click', clickHander(function() {
      toggleSound();
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
      if (self.fullScreen) {
        self.fullScreenContract.click();
      }
    }));

    Utils.getElement(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
      self.updateFullScreen();
    });
  };

  return self;
}