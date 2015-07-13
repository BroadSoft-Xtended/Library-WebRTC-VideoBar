# Video Bar

Displays a video bar with mute, hold, fullscreen, dialpad, settings, self view and transfer controls.

Model : bdsft_webrtc.default.videobar
View : bdsft_webrtc.default.videobarview
Dependencies : [Audio](../audio), [Authentication](../authentication), [Call Control](../callcontrol), [Fullscreen](../fullscreen), [SIP Stack](../sipstack), [Sound](../sound), [Timer](../timer), [Transfer](../transfer), [Video](../video)

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

