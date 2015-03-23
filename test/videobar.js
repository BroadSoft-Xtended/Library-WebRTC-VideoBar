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
      enableSelfView: true,
      enableDialpad: true
    };
    testUA.createCore('configuration', config);
    testUA.createCore('sipstack', config);
    testUA.mockWebRTC();
    testUA.createModelAndView('videobar', {
      videobar: require('../'),
      timer: require('webrtc-timer')
    });
  });

  it('with audioOnly', function() {
    configuration.view = 'audioOnly';
    expect(videobar.classes.indexOf('audioOnly')).toNotEqual(-1);
    configuration.view = '';
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
    configuration.enableTransfer = false;
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
  // TODO - fix test case not depending on toggleView
  // it('dialpad icons', function() {
  //   testUA.isVisible(videobarview.dialpadIconShow, true);
  //   testUA.isVisible(videobarview.dialpadIconHide, false);

  //   videobarview.dialpadIconShow.trigger('click');
  //   testUA.isVisible(videobarview.dialpadIconShow, false);
  //   testUA.isVisible(videobarview.dialpadIconHide, true);
    
  //   videobarview.dialpadIconHide.trigger('click');
  //   testUA.isVisible(videobarview.dialpadIconShow, true);
  //   testUA.isVisible(videobarview.dialpadIconHide, false);
  // });
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