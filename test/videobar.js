var jsdom = require('mocha-jsdom');
expect = require('expect');
jsdom({});

describe('videobar', function() {

  beforeEach(function() {
    core = require('webrtc-core');
    testUA = core.testUA;
    ExSIP = core.exsip;
    config = {
      enableTransfer: true,
      enableCallStats: false
    };
    testUA.createCore('configuration', config);
    testUA.createCore('sipstack', config);
    testUA.mockWebRTC();
    testUA.createModelAndView('videobar', {
      videobar: require('../'),
      timer: require('webrtc-timer')
    });
    var div = document.createElement("div");
    var div2 = document.createElement("div");
    div.className = 'bdsft-client';
    div2.className = 'client';
    document.body.appendChild(div);
    div.appendChild(div2);
    div2.appendChild(videobarview.view[0]);
  });

  it('hold icon:', function() {
    testUA.isVisible(videobarview.hold.element, false);
  });
  it('resume icon', function() {
    testUA.isVisible(videobarview.resume.element, false);
  });
  it('hold icon on call started with enableHold is false', function() {
    configuration.enableHold = false;
    testUA.startCall();
    testUA.isVisible(videobarview.hold.element, false);
  });
  it('hold icon on call started with enableHold is true', function() {
    configuration.enableHold = true;
    testUA.startCall();
    testUA.isVisible(videobarview.hold.element, true);
  });
  it('resume icon on call started with enableHold is false', function() {
    configuration.enableHold = false;
    testUA.startCall();
    testUA.isVisible(videobarview.resume.element, false);
  });
  it('resume icon on call started with enableHold is true', function() {
    configuration.enableHold = true;
    testUA.startCall();
    testUA.isVisible(videobarview.resume.element, false);
  });
  it('hold icon after call held', function() {
    configuration.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    testUA.isVisible(videobarview.hold.element, false);
  });
  it('resume icon after call held', function() {
    configuration.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    expect(videobarview.hold.disabled).toEqual(false);
    testUA.isVisible(videobarview.resume.element, true);
  });
  it('hold icon after call resumed', function() {
    configuration.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    videobarview.resume.element.trigger("click");
    expect(videobarview.resume.disabled).toEqual(false);
    testUA.isVisible(videobarview.hold.element, true);
  });
  it('resume icon after call resumed', function() {
    configuration.enableHold = true;
    testUA.startCall();
    videobarview.hold.element.trigger("click");
    videobarview.resume.element.trigger("click");
    testUA.isVisible(videobarview.resume.element, false);
  });
  it('hold icon on call ended', function() {
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
});