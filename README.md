# Video Bar

Displays a video bar with mute, hold, fullscreen, dialpad, settings, self view and transfer controls.

Namespace : bdsft_webrtc.default.videobar

Dependencies : [Audio](https://github.com/BroadSoft-Xtended/Library-WebRTC-Audio), [Authentication](https://github.com/BroadSoft-Xtended/Library-WebRTC-Authentication), [Call Control](https://github.com/BroadSoft-Xtended/Library-WebRTC-CallControl), [DMS](https://github.com/BroadSoft-Xtended/Library-WebRTC-DMS), [Fullscreen](https://github.com/BroadSoft-Xtended/Library-WebRTC-FullScreen), [SIP Stack](https://github.com/BroadSoft-Xtended/Library-WebRTC-SIPStack), [Sound](https://github.com/BroadSoft-Xtended/Library-WebRTC-Sound), [Timer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer), [Transfer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Transfer), [Video](https://github.com/BroadSoft-Xtended/Library-WebRTC-Video), [XMPP](https://github.com/BroadSoft-Xtended/Library-WebRTC-XMPP)

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
xmppHolder		     |div   |Holds the xmpp toggling icon.

## Configuration
<a name="configuration"></a>

Property    |Type     |Default  |Description
------------|---------|---------|-------------------------------
enableHold  |boolean  |true     |True if hold icon is enabled.

