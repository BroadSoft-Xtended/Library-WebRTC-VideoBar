var jsdom = require('mocha-jsdom');
expect = require('expect');
jsdom({});

describe('videobar', function() {

  before(function() {
    core = require('webrtc-core');
    testUA = core.testUA;
    ExSIP = core.exsip;
    config = {
      enableTransfer: true,
      enableCallStats: false,
      enableSelfView: true
    };
    testUA.createCore('configuration', config);
    testUA.createCore('sipstack', config);
    testUA.mockWebRTC();
    testUA.createModelAndView('videobar', {
      videobar: require('../'),
      timer: require('webrtc-timer')
    });
  });

  it('hold icon:', function() {
    testUA.isVisible(videobarview.hold.element, false);
  });
  it('resume icon', function() {
    testUA.isVisible(videobarview.resume.element, false);
  });
  it('selfViewEnable icon', function() {
    testUA.isVisible(videobarview.selfViewEnable, false);
  });
  it('selfViewDisable icon', function() {
    testUA.isVisible(videobarview.selfViewDisable, true);
  });
  it('selfViewEnable icon after click', function() {
    videobarview.selfViewDisable.trigger('click');
    testUA.isVisible(videobarview.selfViewEnable, true);
    testUA.isVisible(videobarview.selfViewDisable, false);
    
    videobarview.selfViewEnable.trigger('click');
    testUA.isVisible(videobarview.selfViewEnable, false);
    testUA.isVisible(videobarview.selfViewDisable, true);
  });
  it('hold icon on call started with enableHold is false', function() {
    configuration.enableHold = false;
    testUA.startCall();
    testUA.isVisible(videobarview.hold.element, false);
    testUA.endCall();
  });
  it('hold icon on call started with enableHold is true', function() {
    configuration.enableHold = true;
    testUA.startCall();
    testUA.isVisible(videobarview.hold.element, true);
    testUA.endCall();
  });
  it('resume icon on call started with enableHold is false', function() {
    configuration.enableHold = false;
    testUA.startCall();
    testUA.isVisible(videobarview.resume.element, false);
    testUA.endCall();
  });
  it('resume icon on call started with enableHold is true', function() {
    configuration.enableHold = true;
    testUA.startCall();
    testUA.isVisible(videobarview.resume.element, false);
    testUA.endCall();
  });
  it('hold icon after call held', function() {
    configuration.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    testUA.isVisible(videobarview.hold.element, false);
    testUA.endCall();
  });
  it('resume icon after call held', function() {
    configuration.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    expect(videobarview.hold.disabled).toEqual(false);
    testUA.isVisible(videobarview.resume.element, true);
    testUA.endCall();
  });
  it('hold icon after call resumed', function() {
    configuration.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    videobarview.resume.element.trigger("click");
    expect(videobarview.resume.disabled).toEqual(false);
    testUA.isVisible(videobarview.hold.element, true);
    testUA.endCall();
  });
  it('resume icon after call resumed', function() {
    configuration.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    videobarview.resume.element.trigger("click");
    testUA.isVisible(videobarview.resume.element, false);
    testUA.endCall();
  });
  it('hold icon on call ended', function() {
    configuration.enableHold = true;
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
    configuration.enableSettings = true;
    testUA.isVisible(videobarview.settings, true);
  });
  it('settings icon with enableSettings = false', function() {
    configuration.enableSettings = false;
    testUA.isVisible(videobarview.settings, false);
  });  
});