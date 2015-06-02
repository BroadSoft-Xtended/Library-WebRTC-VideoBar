var jsdom = require('mocha-jsdom');
expect = require('expect');
jsdom({});

describe('videobar', function() {

  before(function() {
    core = require('webrtc-core');
    testUA = core.testUA;
    ExSIP = core.exsip;
    testUA.createCore('sipstack');
    testUA.mockWebRTC();
    testUA.createModelAndView('videobar', {
      videobar: require('../'),
      timer: require('webrtc-timer'),
      callcontrol: require('webrtc-callcontrol'),
      settings: require('webrtc-settings'),
      video: require('webrtc-video'),
      transfer: require('webrtc-transfer')
    });
    urlconfig = bdsft_client_instances.test.urlconfig;
    transfer = bdsft_client_instances.test.transfer;
    video = bdsft_client_instances.test.video;
    settings = bdsft_client_instances.test.settings;
    eventbus = bdsft_client_instances.test.eventbus;
  });

  it('fullscreen', function() {
    testUA.isVisible(videobarview.fullScreenExpand, true);
    testUA.isVisible(videobarview.fullScreenContract, false);

    videobarview.fullScreenExpand.trigger('click');
    testUA.isVisible(videobarview.fullScreenExpand, false);
    testUA.isVisible(videobarview.fullScreenContract, true);
    expect(videobar.classes.indexOf('fullscreen-shown')).toNotEqual(-1);

    videobarview.fullScreenContract.trigger('click');
    testUA.isVisible(videobarview.fullScreenExpand, true);
    testUA.isVisible(videobarview.fullScreenContract, false);
    expect(videobar.classes.indexOf('fullscreen-hidden')).toNotEqual(-1);
  });
  it('screenshare', function() {
    videobar.enableShareScreen = true;
    testUA.isVisible(videobarview.shareScreen, true);
    testUA.isVisible(videobarview.stopShareScreen, false);

    videobarview.shareScreen.trigger('click');
    testUA.isVisible(videobarview.shareScreen, false);
    testUA.isVisible(videobarview.stopShareScreen, true);
    expect(videobar.classes.indexOf('screenshare-shown')).toNotEqual(-1);

    videobarview.stopShareScreen.trigger('click');
    testUA.isVisible(videobarview.shareScreen, true);
    testUA.isVisible(videobarview.stopShareScreen, false);
    expect(videobar.classes.indexOf('screenshare-hidden')).toNotEqual(-1);
    videobar.enableShareScreen = false;
  });
  it('with audioOnly', function() {
    urlconfig.view = 'audioOnly';
    expect(videobar.classes.indexOf('audioOnly')).toNotEqual(-1);
    urlconfig.view = '';
  });
  it('hold icon:', function() {
    testUA.isVisible(videobarview.hold.element, false);
  });
  it('resume icon', function() {
    testUA.isVisible(videobarview.resume.element, false);
  });
  it('transfer icon', function() {
    testUA.isVisible(videobarview.transfer, false);
  });
  it('transfer icon on started', function() {
    testUA.isVisible(videobarview.transfer, false);
    testUA.startCall();
    testUA.isVisible(videobarview.transfer, true);
    testUA.endCall();
    testUA.isVisible(videobarview.transfer, false);
  });
  it('transfer icon on started and enableTransfer = false', function() {
    transfer.enableTransfer = false;
    testUA.isVisible(videobarview.transfer, false);
    testUA.startCall();
    testUA.isVisible(videobarview.transfer, false);
    testUA.endCall();
    testUA.isVisible(videobarview.transfer, false);
  });
  it('selfView icons', function() {
    testUA.isVisible(videobarview.selfViewEnable, false);
    testUA.isVisible(videobarview.selfViewDisable, true);

    videobarview.selfViewDisable.trigger('click');
    testUA.isVisible(videobarview.selfViewEnable, true);
    testUA.isVisible(videobarview.selfViewDisable, false);
    
    videobarview.selfViewEnable.trigger('click');
    testUA.isVisible(videobarview.selfViewEnable, false);
    testUA.isVisible(videobarview.selfViewDisable, true);
  });
  it('dialpad icons', function() {
    testUA.isVisible(videobarview.dialpadIconShow, true);
    testUA.isVisible(videobarview.dialpadIconHide, false);

    videobarview.dialpadIconShow.trigger('click');
    testUA.isVisible(videobarview.dialpadIconShow, false);
    testUA.isVisible(videobarview.dialpadIconHide, true);
    
    videobarview.dialpadIconHide.trigger('click');
    testUA.isVisible(videobarview.dialpadIconShow, true);
    testUA.isVisible(videobarview.dialpadIconHide, false);
  });
  it('hold icon on call started with enableHold is false', function() {
    videobar.enableHold = false;
    testUA.startCall();
    testUA.isVisible(videobarview.hold.element, false);
    testUA.endCall();
  });
  it('hold icon on call started with enableHold is true', function() {
    videobar.enableHold = true;
    testUA.startCall();
    testUA.isVisible(videobarview.hold.element, true);
    testUA.endCall();
  });
  it('resume icon on call started with enableHold is false', function() {
    videobar.enableHold = false;
    testUA.startCall();
    testUA.isVisible(videobarview.resume.element, false);
    testUA.endCall();
  });
  it('resume icon on call started with enableHold is true', function() {
    videobar.enableHold = true;
    testUA.startCall();
    testUA.isVisible(videobarview.resume.element, false);
    testUA.endCall();
  });
  it('hold icon after call held', function() {
    videobar.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    testUA.isVisible(videobarview.hold.element, false);
    testUA.endCall();
  });
  it('resume icon after call held', function() {
    videobar.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    expect(videobarview.hold.disabled).toEqual(false);
    testUA.isVisible(videobarview.resume.element, true);
    testUA.endCall();
  });
  it('hold icon after call resumed', function() {
    videobar.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    videobarview.resume.element.trigger("click");
    expect(videobarview.resume.disabled).toEqual(false);
    testUA.isVisible(videobarview.hold.element, true);
    testUA.endCall();
  });
  it('resume icon after call resumed', function() {
    videobar.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    videobarview.resume.element.trigger("click");
    testUA.isVisible(videobarview.resume.element, false);
    testUA.endCall();
  });
  it('hold icon on call ended', function() {
    videobar.enableHold = true;
    testUA.startCall();
    testUA.endCall();
    testUA.isVisible(videobarview.hold.element, false);
  });
  it('resume icon on call ended', function() {
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    testUA.endCall();
    testUA.isVisible(videobarview.resume.element, false);
  });
  it('settings icon', function() {
    settings.enableSettings = true;
    testUA.isVisible(videobarview.settings, true);
  });
  it('settings icon with enableSettings = false', function() {
    settings.enableSettings = false;
    testUA.isVisible(videobarview.settings, false);
  });  
  it('muteAudio', function() {
    testUA.isVisible(videobarview.muteAudioIcon, false);
  });
  it('unmuteAudio', function() {
    testUA.isVisible(videobarview.unmuteAudioIcon, false);
  });
  it('hangup', function() {
    testUA.isVisible(videobarview.hangup, false);
  });
  it('muteAudio on call started', function() {
    testUA.connectAndStartCall();
    testUA.isVisible(videobarview.muteAudioIcon, true);
    testUA.endCall();
  });
  it('muteAudio on mute triggered', function() {
    testUA.connectAndStartCall();
    videobarview.muteAudioIcon.trigger("click");
    testUA.isVisible(videobarview.muteAudioIcon, false);
    testUA.isVisible(videobarview.unmuteAudioIcon, true);
    videobarview.unmuteAudioIcon.trigger("click");
    testUA.isVisible(videobarview.unmuteAudioIcon, false);
    testUA.isVisible(videobarview.muteAudioIcon, true);
    testUA.endCall();
  });
  it('fullScreen icon', function() {
    videobar.enableFullScreen = true;
    testUA.isVisible(videobarview.fullScreenExpand, true);
    testUA.isVisible(videobarview.fullScreenContract, false);
  });
  it('fullScreen icon with enableFullScreen = false', function() {
    videobar.enableFullScreen = false;
    testUA.isVisible(videobarview.fullScreenExpand, false);
    testUA.isVisible(videobarview.fullScreenContract, false);
  });
  it('fullScreen icon after click', function() {
    videobar.enableFullScreen = true;
    videobarview.fullScreenExpand.trigger('click');
    testUA.isVisible(videobarview.fullScreenExpand, false);
    testUA.isVisible(videobarview.fullScreenContract, true);
    videobarview.fullScreenContract.trigger('click');
    testUA.isVisible(videobarview.fullScreenExpand, true);
    testUA.isVisible(videobarview.fullScreenContract, false);
  });
  it('selfView icon', function() {
    video.enableSelfView = true;
    testUA.isVisible(videobarview.selfViewEnable, false);
    testUA.isVisible(videobarview.selfViewDisable, true);
  });
  it('selfView icon with enableSelfView = false', function() {
    video.enableSelfView = false;
    testUA.isVisible(videobarview.selfViewEnable, false);
    testUA.isVisible(videobarview.selfViewDisable, false);
  });
  it('selfView icon after click', function() {
    video.enableSelfView = true;
    videobarview.selfViewDisable.trigger('click');
    testUA.isVisible(videobarview.selfViewEnable, true);
    testUA.isVisible(videobarview.selfViewDisable, false);
    videobarview.selfViewEnable.trigger('click');
    testUA.isVisible(videobarview.selfViewEnable, false);
    testUA.isVisible(videobarview.selfViewDisable, true);
  });
  it('dialpad icon', function() {
    videobar.enableDialpad = true;
    testUA.isVisible(videobarview.dialpadIconShow, true);
    testUA.isVisible(videobarview.dialpadIconHide, false);
  });
  it('dialpad icon with enableDialpad = false', function() {
    videobar.enableDialpad = false;
    testUA.isVisible(videobarview.dialpadIconShow, false);
    testUA.isVisible(videobarview.dialpadIconHide, false);
  });
  it('dialpad icon after click and in call', function() {
    videobar.enableDialpad = true;
    testUA.connectAndStartCall();
    testUA.isVisible(videobarview.hangup, true);
    videobarview.dialpadIconShow.trigger('click');
    testUA.isVisible(videobarview.hangup, true);
    videobarview.dialpadIconHide.trigger('click');
    testUA.isVisible(videobarview.hangup, true);
    testUA.endCall();
  });
  it('hangup on call started', function() {
    testUA.connectAndStartCall();
    testUA.isVisible(videobarview.hangup, true);
    testUA.endCall();
  });
  it('muteAudio on call started and disabled muted', function() {
    videobar.enableMute = false;
    testUA.connectAndStartCall();
    testUA.isVisible(videobarview.muteAudioIcon, false);
    testUA.endCall();
  });
  it('unmuteAudio on call started and disabled muted', function() {
    videobar.enableMute = false;
    testUA.connectAndStartCall();
    testUA.isVisible(videobarview.unmuteAudioIcon, false);
    testUA.endCall();
  });
  it('muteAudio on call ended', function() {
    videobar.enableMute = true;
    testUA.connectAndStartCall();
    testUA.endCall();
    testUA.isVisible(videobarview.muteAudioIcon, false);
  });
  it('unmuteAudio on call ended', function() {
    videobar.enableMute = true;
    testUA.isVisible(videobarview.muteAudioIcon, false);
    testUA.isVisible(videobarview.unmuteAudioIcon, false);
    testUA.connectAndStartCall();
    testUA.isVisible(videobarview.muteAudioIcon, true);
    testUA.isVisible(videobarview.unmuteAudioIcon, false);
    videobarview.muteAudioIcon.trigger("click");
    testUA.isVisible(videobarview.unmuteAudioIcon, true);
    testUA.isVisible(videobarview.muteAudioIcon, false);
    testUA.endCall();
    expect(sipstack.getCallState()).toEqual("connected");
    testUA.isVisible(videobarview.muteAudioIcon, false);
    testUA.isVisible(videobarview.unmuteAudioIcon, false);
  });
  it('hangup on call ended', function() {
    videobar.enableMute = true;
    testUA.connectAndStartCall();
    testUA.endCall();
    testUA.isVisible(videobarview.hangup, false);
  });
});