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
      transfer: require('webrtc-transfer'),
      messages: require('webrtc-messages'),
      authentication: require('webrtc-authentication')
    });
    screenshare = bdsft_client_instances.test.screenshare;
    fullscreen = bdsft_client_instances.test.fullscreen;
    callcontrol = bdsft_client_instances.test.callcontrol;
    urlconfig = bdsft_client_instances.test.urlconfig;
    transfer = bdsft_client_instances.test.transfer;
    video = bdsft_client_instances.test.video;
    settings = bdsft_client_instances.test.settings;
  });

  it('fullscreen', function() {
    testUA.isVisible(videobarview.fullscreenExpand, true);
    testUA.isVisible(videobarview.fullscreenContract, false);

    videobarview.fullscreenExpand.trigger('click');
    testUA.isVisible(videobarview.fullscreenExpand, false);
    testUA.isVisible(videobarview.fullscreenContract, true);
    expect(videobar.classes.indexOf('fullscreen-shown')).toNotEqual(-1);

    videobarview.fullscreenContract.trigger('click');
    testUA.isVisible(videobarview.fullscreenExpand, true);
    testUA.isVisible(videobarview.fullscreenContract, false);
    expect(videobar.classes.indexOf('fullscreen-hidden')).toNotEqual(-1);
  });
  it('screenshare', function() {
    screenshare.enableScreenshare = true;
    testUA.isVisible(videobarview.screenshareStart, true);
    testUA.isVisible(videobarview.screenshareStop, false);

    videobarview.screenshareStart.trigger('click');
    testUA.isVisible(videobarview.screenshareStart, false);
    testUA.isVisible(videobarview.screenshareStop, true);
    expect(videobar.classes.indexOf('screenshare-shown')).toNotEqual(-1);

    videobarview.screenshareStop.trigger('click');
    testUA.isVisible(videobarview.screenshareStart, true);
    testUA.isVisible(videobarview.screenshareStop, false);
    expect(videobar.classes.indexOf('screenshare-hidden')).toNotEqual(-1);
    screenshare.enableScreenshare = false;
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
    testUA.isVisible(videobarview.selfViewShow, false);
    testUA.isVisible(videobarview.selfViewHide, true);

    videobarview.selfViewHide.trigger('click');
    testUA.isVisible(videobarview.selfViewShow, true);
    testUA.isVisible(videobarview.selfViewHide, false);
    
    videobarview.selfViewShow.trigger('click');
    testUA.isVisible(videobarview.selfViewShow, false);
    testUA.isVisible(videobarview.selfViewHide, true);
  });
  it('dialpad icons', function() {
    testUA.isVisible(videobarview.dialpadShow, true);
    testUA.isVisible(videobarview.dialpadHide, false);

    videobarview.dialpadShow.trigger('click');
    testUA.isVisible(videobarview.dialpadShow, false);
    testUA.isVisible(videobarview.dialpadHide, true);
    
    videobarview.dialpadHide.trigger('click');
    testUA.isVisible(videobarview.dialpadShow, true);
    testUA.isVisible(videobarview.dialpadHide, false);
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
  it('call held', function() {
    videobar.enableHold = true;
    var session = testUA.startCall();
    session.hold = function(success) {if (success) { success(); }}
    videobarview.hold.element.trigger("click");
    expect(videobarview.resume.disabled).toEqual(false);
    expect(videobarview.hold.disabled).toEqual(true);
    testUA.isVisible(videobarview.hold.element, true);
    testUA.isVisible(videobarview.resume.element, false);
    session.held();
    testUA.isVisible(videobarview.hangup, true);
    testUA.isVisible(videobarview.mute, true);
    expect(videobarview.resume.disabled).toEqual(false);
    expect(videobarview.hold.disabled).toEqual(false);
    testUA.isVisible(videobarview.hold.element, false);
    testUA.isVisible(videobarview.resume.element, true);
    testUA.endCall();
  });
  it('call resumed', function() {
    videobar.enableHold = true;
    var session = testUA.startCall();
    session.hold = function(success) {if (success) { success(); }}
    session.unhold = function(success) {if (success) { success(); }}
    videobarview.hold.element.trigger("click");
    session.held();
    videobarview.resume.element.trigger("click");
    expect(videobarview.resume.disabled).toEqual(true);
    expect(videobarview.hold.disabled).toEqual(false);
    testUA.isVisible(videobarview.hold.element, false);
    testUA.isVisible(videobarview.resume.element, true);
    session.resumed();
    expect(videobarview.resume.disabled).toEqual(false);
    expect(videobarview.hold.disabled).toEqual(false);
    testUA.isVisible(videobarview.hold.element, true);
    testUA.isVisible(videobarview.resume.element, false);
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
    testUA.isVisible(videobarview.mute, false);
  });
  it('unmuteAudio', function() {
    testUA.isVisible(videobarview.unmute, false);
  });
  it('hangup', function() {
    testUA.isVisible(videobarview.hangup, false);
  });
  it('muteAudio on call started', function() {
    testUA.connectAndStartCall();
    testUA.isVisible(videobarview.mute, true);
    testUA.endCall();
  });
  it('muteAudio on mute triggered', function() {
    testUA.connectAndStartCall();
    videobarview.mute.trigger("click");
    testUA.isVisible(videobarview.mute, false);
    testUA.isVisible(videobarview.unmute, true);
    videobarview.unmute.trigger("click");
    testUA.isVisible(videobarview.unmute, false);
    testUA.isVisible(videobarview.mute, true);
    testUA.endCall();
  });
  it('fullScreen icon', function() {
    fullscreen.enableFullscreen = true;
    testUA.isVisible(videobarview.fullscreenExpand, true);
    testUA.isVisible(videobarview.fullscreenContract, false);
  });
  it('fullScreen icon with enableFullScreen = false', function() {
    fullscreen.enableFullscreen = false;
    testUA.isVisible(videobarview.fullscreenExpand, false);
    testUA.isVisible(videobarview.fullscreenContract, false);
  });
  it('fullScreen icon after click', function() {
    fullscreen.enableFullscreen = true;
    videobarview.fullscreenExpand.trigger('click');
    testUA.isVisible(videobarview.fullscreenExpand, false);
    testUA.isVisible(videobarview.fullscreenContract, true);
    videobarview.fullscreenContract.trigger('click');
    testUA.isVisible(videobarview.fullscreenExpand, true);
    testUA.isVisible(videobarview.fullscreenContract, false);
  });
  it('selfView icon', function() {
    video.enableSelfView = true;
    testUA.isVisible(videobarview.selfViewShow, false);
    testUA.isVisible(videobarview.selfViewHide, true);
  });
  it('selfView icon with enableSelfView = false', function() {
    video.enableSelfView = false;
    testUA.isVisible(videobarview.selfViewShow, false);
    testUA.isVisible(videobarview.selfViewHide, false);
  });
  it('selfView icon after click', function() {
    video.enableSelfView = true;
    videobarview.selfViewHide.trigger('click');
    testUA.isVisible(videobarview.selfViewShow, true);
    testUA.isVisible(videobarview.selfViewHide, false);
    videobarview.selfViewShow.trigger('click');
    testUA.isVisible(videobarview.selfViewShow, false);
    testUA.isVisible(videobarview.selfViewHide, true);
  });
  it('dialpad icon', function() {
    callcontrol.enableCallControl = true;
    testUA.isVisible(videobarview.dialpadShow, true);
    testUA.isVisible(videobarview.dialpadHide, false);
  });
  it('dialpad icon with enableDialpad = false', function() {
    callcontrol.enableCallControl = false;
    testUA.isVisible(videobarview.dialpadShow, false);
    testUA.isVisible(videobarview.dialpadHide, false);
  });
  it('dialpad icon after click and in call', function() {
    callcontrol.enableCallControl = true;
    testUA.connectAndStartCall();
    testUA.isVisible(videobarview.hangup, true);
    videobarview.dialpadShow.trigger('click');
    testUA.isVisible(videobarview.hangup, true);
    videobarview.dialpadHide.trigger('click');
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
    testUA.isVisible(videobarview.mute, false);
    testUA.endCall();
  });
  it('unmuteAudio on call started and disabled muted', function() {
    videobar.enableMute = false;
    testUA.connectAndStartCall();
    testUA.isVisible(videobarview.unmute, false);
    testUA.endCall();
  });
  it('muteAudio on call ended', function() {
    videobar.enableMute = true;
    testUA.connectAndStartCall();
    testUA.endCall();
    testUA.isVisible(videobarview.mute, false);
  });
  it('unmuteAudio on call ended', function() {
    videobar.enableMute = true;
    testUA.isVisible(videobarview.mute, false);
    testUA.isVisible(videobarview.unmute, false);
    testUA.connectAndStartCall();
    testUA.isVisible(videobarview.mute, true);
    testUA.isVisible(videobarview.unmute, false);
    videobarview.mute.trigger("click");
    testUA.isVisible(videobarview.unmute, true);
    testUA.isVisible(videobarview.mute, false);
    testUA.endCall();
    expect(sipstack.getCallState()).toEqual("connected");
    testUA.isVisible(videobarview.mute, false);
    testUA.isVisible(videobarview.unmute, false);
  });
  it('hangup on call ended', function() {
    videobar.enableMute = true;
    testUA.connectAndStartCall();
    testUA.endCall();
    testUA.isVisible(videobarview.hangup, false);
  });
});