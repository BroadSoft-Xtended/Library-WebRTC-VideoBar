# Video Bar

Displays a video bar with mute, hold, fullscreen, dialpad, settings, self view and transfer controls.

Model : bdsft_webrtc.default.videobar
View : bdsft_webrtc.default.videobarview
Dependencies : [Audio](https://github.com/BroadSoft-Xtended/Library-WebRTC-Audio), [Authentication](https://github.com/BroadSoft-Xtended/Library-WebRTC-Authentication), [Call Control](https://github.com/BroadSoft-Xtended/Library-WebRTC-CallControl), [Fullscreen](../fullscreen), [SIP Stack](https://github.com/BroadSoft-Xtended/Library-WebRTC-SIPStack), [Sound](https://github.com/BroadSoft-Xtended/Library-WebRTC-Sound), [Timer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer), [Transfer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Transfer), [Video](https://github.com/BroadSoft-Xtended/Library-WebRTC-Video)

## Elements
<a name="elements"></a>

Element             |Type  |Description
--------------------|------|------------------------------------------
audioHolder          |div   |Holds the audio view.
dialpadHide          |div   |Hides the dialpad.
dialpadShow          |div   |Shows the dialpad.
fullscreenHolder     |div   |Holds the fullscreen view.
hangup               |div   |Ends the call.
hold                 |div   |Puts the call on hold.
resume               |div   |Resumes the call.
selfViewHide         |div   |Hides the self view.
selfViewShow         |div   |Shows the self view.
settings             |div   |Shows the settings view.
timerHolder          |div   |Holds the timer view.
transfer             |div   |Shows the transfer view.

## Configuration
<a name="configuration"></a>

Property    |Type     |Default  |Description
------------|---------|---------|-------------------------------
enableHold  |boolean  |true     |True if hold icon is enabled.

