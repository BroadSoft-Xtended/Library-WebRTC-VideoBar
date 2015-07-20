module.exports = {"videobar":".bdsft-webrtc .videoBar{position:relative;top:0;left:0;width:100%;height:40px;background:#000;background-image:-ms-linear-gradient(center top,#404040,#000);background-image:linear-gradient(to bottom,#404040,#000);background-image:-webkit-linear-gradient(#404040,#000);background-image:-moz-linear-gradient(top,#404040,#000);border-radius:4px;border:2px solid #ddd;box-shadow:0 0 10px #000;margin-top:5px;background-image:none;border-radius:0;border:0;box-shadow:none;margin-top:0;background:#292929;border-top:1px solid #3c3c3c}.bdsft-webrtc .videoBar .icon{margin:0 2.5px;position:absolute}.bdsft-webrtc .videoBar .table{height:100%;margin:6px;margin:0}.bdsft-webrtc .videoBar .cell{position:relative;top:0;left:0;width:35px;width:36px}.bdsft-webrtc .videoBar .cell .icon{width:100%;text-align:center;margin-top:10px;margin-right:0;margin-left:0}.bdsft-webrtc .videoBar .cell .icon a{margin:0}.bdsft-webrtc .videoBar .cell:first-child{padding:0}.bdsft-webrtc .videoBar span{color:#808080}.bdsft-webrtc .videoBar .unmuteAudio{margin-top:-1px}.bdsft-webrtc .videoBar .leftSpacer{width:8px}.bdsft-webrtc .videoBar .cell-hangup{width:42px}.bdsft-webrtc .videoBar .subtitle{display:none}.bdsft-webrtc .videoBar .timerHolder{position:relative;top:0;left:0;width:auto}.bdsft-webrtc .videoBar .rightSpacer{width:8px}.bdsft-webrtc .videoBar._960x720{width:960px}.bdsft-webrtc .videoBar._640x360,.bdsft-webrtc .videoBar._640x480{width:640px}.bdsft-webrtc .videoBar._320x180,.bdsft-webrtc .videoBar._320x240{width:320px}.bdsft-webrtc .videoBar._1280x720,.bdsft-webrtc .videoBar.hd{width:1280px}.bdsft-webrtc .videoBar._1920x1080{width:1920px}.bdsft-webrtc .hangup,.bdsft-webrtc .fullScreen,.bdsft-webrtc .selfView,.bdsft-webrtc .mute,.bdsft-webrtc .dialpadIcon,.bdsft-webrtc .messages{top:0;left:0}.bdsft-webrtc #videoBar #settings{width:auto;background-color:transparent}.bdsft-webrtc .videoBar.audioOnly{display:inline-block;width:auto}.bdsft-webrtc .videoBar.audioOnly .table{table-layout:auto;width:auto}.bdsft-webrtc .videoBar.audioOnly .cell-hangup{width:35px!important}.bdsft-webrtc .videoBar.conference .cell-hangup{width:30px!important;top:2px}.bdsft-webrtc .videoBar.conference .cell .hangup{margin-top:0;width:140px;background-color:#f00;border-radius:5px;margin-left:10px;height:36px;line-height:14px}.bdsft-webrtc .videoBar.conference .hangup .subtitle{display:block!important;font-size:14px;color:#fff}.bdsft-webrtc .videoBar .icon,.bdsft-webrtc .videoBar a{font-size:20px;color:#808080;text-decoration:none}.bdsft-webrtc .videoBar .hold,.bdsft-webrtc .videoBar .resume{margin-top:-1px}.bdsft-webrtc .videoBar .settings{margin-top:12px!important}.bdsft-webrtc .videoBar .settings .icon-settings{margin:0;font-size:18px;color:#fff}.bdsft-webrtc .videoBar.fullscreen-shown{top:auto!important;bottom:0;position:absolute;width:100%}.bdsft-webrtc .videoBar.conference .icon-hangup:before,.bdsft-webrtc .videoBar.conference .icon-hangup:hover:before{color:#fff!important}.bdsft-webrtc .videoBar.conference .selfViewHide,.bdsft-webrtc .videoBar.conference .selfViewShow{text-align:right!important}.bdsft-webrtc .videoBar.conference .fullscreenExpand,.bdsft-webrtc .videoBar.conference .fullscreenContract{text-align:left!important}.bdsft-webrtc .videoBar.audioOnly .fullscreenExpand,.bdsft-webrtc .videoBar.audioOnly .fullscreenContract,.bdsft-webrtc .videoBar.audioOnly .selfViewHide,.bdsft-webrtc .videoBar.audioOnly .selfViewShow,.bdsft-webrtc .videoBar.audioOnly .cell-fullScreen,.bdsft-webrtc .videoBar.audioOnly .cell-selfView{display:none!important}.bdsft-webrtc .videoBar.selfViewShow a,.bdsft-webrtc .videoBar.dialpadHide a,.bdsft-webrtc .videoBar.unmuteAudio a,.bdsft-webrtc .videoBar.fullscreenContract a{color:#04aff0!important}.bdsft-webrtc .videoBar.started .hangup,.bdsft-webrtc .videoBar.calling .hangup,.bdsft-webrtc .videoBar:not(.held).enableHold.started .hold,.bdsft-webrtc .videoBar.enableHold.held .resume,.bdsft-webrtc .videoBar.enableSettings .settings,.bdsft-webrtc .videoBar.enableSelfView:not(.video-hidden) .selfViewHide,.bdsft-webrtc .videoBar.enableSelfView.video-hidden .selfViewShow,.bdsft-webrtc .videoBar.enableTransfer.started .transfer,.bdsft-webrtc .videoBar.enableCallControl.callcontrol-shown .dialpadHide,.bdsft-webrtc .videoBar.enableCallControl:not(.callcontrol-shown) .dialpadShow{transition:all 1s linear;opacity:1;z-index:20}.bdsft-webrtc .videoBar.connected .hangup,.bdsft-webrtc .videoBar.disconnected .hangup,.bdsft-webrtc .videoBar.held .hold,.bdsft-webrtc .videoBar:not(.started) .hold,.bdsft-webrtc .videoBar:not(.started) .resume,.bdsft-webrtc .videoBar:not(.held) .resume,.bdsft-webrtc .videoBar:not(.enableSettings) .settings,.bdsft-webrtc .videoBar.enableSelfView.video-hidden .selfViewHide,.bdsft-webrtc .videoBar.enableSelfView:not(.video-hidden) .selfViewShow,.bdsft-webrtc .videoBar.enableTransfer.connected .transfer,.bdsft-webrtc .videoBar.enableTransfer.disconnected .transfer,.bdsft-webrtc .videoBar.enableCallControl:not(.callcontrol-shown) .dialpadHide,.bdsft-webrtc .videoBar.enableCallControl.callcontrol-shown .dialpadShow{transition:all 1s linear;opacity:0;z-index:-1}.bdsft-webrtc .videoBar:not(.enableTransfer) .cell-transfer,.bdsft-webrtc .videoBar:not(.enableHold) .cell-hold,.bdsft-webrtc .videoBar:not(.enableCallTimer) .cell-timer,.bdsft-webrtc .videoBar:not(.enableFullscreen) .cell-fullScreen,.bdsft-webrtc .videoBar:not(.enableSelfView) .cell-selfView,.bdsft-webrtc .videoBar:not(.enableSettings) .cell-settings,.bdsft-webrtc .videoBar:not(.enableCallControl) .cell-dialpad,.bdsft-webrtc .videoBar:not(.enableMute) .muteHolder,.bdsft-webrtc .videoBar:not(.enableCallTimer) .timerHolder,.bdsft-webrtc .videoBar:not(.enableFullscreen) .fullscreenHolder{display:none!important}"}