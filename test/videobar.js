test = require('../node_modules/webrtc-sipstack/test/includes/common')(require('../node_modules/webrtc-core/test/includes/common'));
describe('videobar', function() {

  before(function() {
    test.setupLocalStorage();
    test.createModelAndView('sipstack', {
      sipstack: require('webrtc-sipstack')
    });
    test.createModelAndView('videobar', {
      videobar: require('../'),
      timer: require('webrtc-timer'),
      history: require('webrtc-history'),
      stats: require('webrtc-stats'),
      callcontrol: require('webrtc-callcontrol'),
      settings: require('webrtc-settings'),
      video: require('webrtc-video'),
      transfer: require('webrtc-transfer'),
      messages: require('webrtc-messages'),
      authentication: require('webrtc-authentication'),
      sipstack: require('webrtc-sipstack'),
      audio: require('webrtc-audio'),
      sound: require('webrtc-sound'),
      fullscreen: require('webrtc-fullscreen'),
      xmpp: require('webrtc-xmpp'),
      dms: require('webrtc-dms')
    });
    callcontrol = bdsft_client_instances.test.callcontrol.callcontrol;
    urlconfig = bdsft_client_instances.test.core.urlconfig;
    transfer = bdsft_client_instances.test.transfer.transfer;
    video = bdsft_client_instances.test.video.video;
    settings = bdsft_client_instances.test.settings.settings;
  });

  it('with audioOnly', function() {
    urlconfig.view = 'audioOnly';
    expect(videobar.classes.indexOf('sendVideo')).toEqual(-1);
    urlconfig.view = '';
  });
  it('hold icon:', function() {
    test.isVisible(videobarview.hold.element, false);
  });
  it('resume icon', function() {
    test.isVisible(videobarview.resume.element, false);
  });
  it('transfer icon', function() {
    test.isVisible(videobarview.transfer, false);
  });
  it('transfer icon on started', function() {
    test.isVisible(videobarview.transfer, false);
    test.startCall();
    test.isVisible(videobarview.transfer, true);
    test.endCall();
    test.isVisible(videobarview.transfer, false);
  });
  it('transfer icon on started and enableTransfer = false', function() {
    transfer.enableTransfer = false;
    test.isVisible(videobarview.transfer, false);
    test.startCall();
    test.isVisible(videobarview.transfer, false);
    test.endCall();
    test.isVisible(videobarview.transfer, false);
  });
  it('selfView icons', function() {
    test.isVisible(videobarview.selfViewShow, false);
    test.isVisible(videobarview.selfViewHide, true);

    videobarview.selfViewHide.trigger('click');
    test.isVisible(videobarview.selfViewShow, true);
    test.isVisible(videobarview.selfViewHide, false);
    
    videobarview.selfViewShow.trigger('click');
    test.isVisible(videobarview.selfViewShow, false);
    test.isVisible(videobarview.selfViewHide, true);
  });
  it('dialpad icons', function() {
    test.isVisible(videobarview.dialpadShow, true);
    test.isVisible(videobarview.dialpadHide, false);

    videobarview.dialpadShow.trigger('click');
    test.isVisible(videobarview.dialpadShow, false);
    test.isVisible(videobarview.dialpadHide, true);
    
    videobarview.dialpadHide.trigger('click');
    test.isVisible(videobarview.dialpadShow, true);
    test.isVisible(videobarview.dialpadHide, false);
  });
  it('hold icon on call started with enableHold is false', function() {
    videobar.enableHold = false;
    test.startCall();
    test.isVisible(videobarview.hold.element, false);
    test.endCall();
  });
  it('hold icon on call started with enableHold is true', function() {
    videobar.enableHold = true;
    test.startCall();
    test.isVisible(videobarview.hold.element, true);
    test.endCall();
  });
  it('resume icon on call started with enableHold is false', function() {
    videobar.enableHold = false;
    test.startCall();
    test.isVisible(videobarview.resume.element, false);
    test.endCall();
  });
  it('resume icon on call started with enableHold is true', function() {
    videobar.enableHold = true;
    test.startCall();
    test.isVisible(videobarview.resume.element, false);
    test.endCall();
  });
  it('call held', function() {
    videobar.enableHold = true;
    var session = test.startCall();
    session.hold = function(success) {if (success) { success(); }}
    videobarview.hold.element.trigger("click");
    expect(videobarview.resume.disabled).toEqual(false);
    expect(videobarview.hold.disabled).toEqual(true);
    test.isVisible(videobarview.hold.element, true);
    test.isVisible(videobarview.resume.element, false);
    session.held();
    test.isVisible(videobarview.hangup, true);
    expect(videobarview.resume.disabled).toEqual(false);
    expect(videobarview.hold.disabled).toEqual(false);
    test.isVisible(videobarview.hold.element, false);
    test.isVisible(videobarview.resume.element, true);
    test.endCall();
  });
  it('call resumed', function() {
    videobar.enableHold = true;
    var session = test.startCall();
    session.hold = function(success) {if (success) { success(); }}
    session.unhold = function(success) {if (success) { success(); }}
    videobarview.hold.element.trigger("click");
    session.held();
    videobarview.resume.element.trigger("click");
    expect(videobarview.resume.disabled).toEqual(true);
    expect(videobarview.hold.disabled).toEqual(false);
    test.isVisible(videobarview.hold.element, false);
    test.isVisible(videobarview.resume.element, true);
    session.resumed();
    expect(videobarview.resume.disabled).toEqual(false);
    expect(videobarview.hold.disabled).toEqual(false);
    test.isVisible(videobarview.hold.element, true);
    test.isVisible(videobarview.resume.element, false);
    test.endCall();
  });
  it('resume icon after call resumed', function() {
    videobar.enableHold = true;
    test.startCall();
    videobarview.hold.element.trigger("click");
    videobarview.resume.element.trigger("click");
    test.isVisible(videobarview.resume.element, false);
    test.endCall();
  });
  it('hold icon on call ended', function() {
    videobar.enableHold = true;
    test.startCall();
    test.endCall();
    test.isVisible(videobarview.hold.element, false);
  });
  it('resume icon on call ended', function() {
    test.startCall();
    videobarview.hold.element.trigger("click");
    test.endCall();
    test.isVisible(videobarview.resume.element, false);
  });
  it('settings icon', function() {
    settings.enableSettings = true;
    test.isVisible(videobarview.settings, true);
  });
  it('settings icon with enableSettings = false', function() {
    settings.enableSettings = false;
    test.isVisible(videobarview.settings, false);
  });  
  it('hangup', function() {
    test.isVisible(videobarview.hangup, false);
  });
  it('hangup on incoming call:', function() {
    sipstack.enableAutoAnswer = false;
    test.connect();
    var session = test.incomingSession();
    test.incomingCall(session);
    test.isVisible(videobarview.hangup, true);
    videobarview.hangup.trigger('click');
    test.isVisible(videobarview.hangup, false);
  });
  it('selfView icon', function() {
    video.enableSelfView = true;
    test.isVisible(videobarview.selfViewShow, false);
    test.isVisible(videobarview.selfViewHide, true);
  });
  it('selfView icon with enableSelfView = false', function() {
    video.enableSelfView = false;
    test.isVisible(videobarview.selfViewShow, false);
    test.isVisible(videobarview.selfViewHide, false);
  });
  it('selfView icon after click', function() {
    video.enableSelfView = true;
    videobarview.selfViewHide.trigger('click');
    test.isVisible(videobarview.selfViewShow, true);
    test.isVisible(videobarview.selfViewHide, false);
    videobarview.selfViewShow.trigger('click');
    test.isVisible(videobarview.selfViewShow, false);
    test.isVisible(videobarview.selfViewHide, true);
  });
  it('dialpad icon', function() {
    callcontrol.enableCallControl = true;
    test.isVisible(videobarview.dialpadShow, true);
    test.isVisible(videobarview.dialpadHide, false);
  });
  it('dialpad icon with enableDialpad = false', function() {
    callcontrol.enableCallControl = false;
    test.isVisible(videobarview.dialpadShow, false);
    test.isVisible(videobarview.dialpadHide, false);
  });
  it('dialpad icon after click and in call', function() {
    callcontrol.enableCallControl = true;
    test.connectAndStartCall();
    test.isVisible(videobarview.hangup, true);
    videobarview.dialpadShow.trigger('click');
    test.isVisible(videobarview.hangup, true);
    videobarview.dialpadHide.trigger('click');
    test.isVisible(videobarview.hangup, true);
    test.endCall();
  });
  it('hangup on call started', function() {
    test.connectAndStartCall();
    test.isVisible(videobarview.hangup, true);
    test.endCall();
  });
  it('hangup on call ended', function() {
    test.connectAndStartCall();
    test.endCall();
    test.isVisible(videobarview.hangup, false);
  });
});