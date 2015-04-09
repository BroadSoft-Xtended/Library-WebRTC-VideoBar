(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function e(e){return null!=e&&""!==e}function n(t){return(Array.isArray(t)?t.map(n):t&&"object"==typeof t?Object.keys(t).filter(function(e){return t[e]}):[t]).filter(e).join(" ")}var t={};return t.merge=function r(n,t){if(1===arguments.length){for(var a=n[0],i=1;i<n.length;i++)a=r(a,n[i]);return a}var o=n["class"],s=t["class"];(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),n["class"]=o.concat(s).filter(e));for(var l in t)"class"!=l&&(n[l]=t[l]);return n},t.joinClasses=n,t.cls=function(e,r){for(var a=[],i=0;i<e.length;i++)a.push(r&&r[i]?t.escape(n([e[i]])):n(e[i]));var o=n(a);return o.length?' class="'+o+'"':""},t.style=function(e){return e&&"object"==typeof e?Object.keys(e).map(function(n){return n+":"+e[n]}).join(";"):e},t.attr=function(e,n,r,a){return"style"===e&&(n=t.style(n)),"boolean"==typeof n||null==n?n?" "+(a?e:e+'="'+e+'"'):"":0==e.indexOf("data")&&"string"!=typeof n?(-1!==JSON.stringify(n).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&"function"==typeof n.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+e+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'"):r?(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+t.escape(n)+'"'):(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+n+'"')},t.attrs=function(e,r){var a=[],i=Object.keys(e);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],l=e[s];"class"==s?(l=n(l))&&a.push(" "+s+'="'+l+'"'):a.push(t.attr(s,l,!1,r))}return a.join("")},t.escape=function(e){var n=String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+e?e:n},t.rethrow=function a(e,n,t,r){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||r))throw e.message+=" on line "+t,e;try{r=r||require("fs").readFileSync(n,"utf8")}catch(i){a(e,null,t)}var o=3,s=r.split("\n"),l=Math.max(t-o,0),f=Math.min(s.length,t+o),o=s.slice(l,f).map(function(e,n){var r=n+l+1;return(r==t?"  > ":"    ")+r+"| "+e}).join("\n");throw e.path=n,e.message=(n||"Jade")+":"+t+"\n"+o+"\n\n"+e.message,e},t}();

    var templatizer = {};


    // videobar.jade compiled template
    templatizer["videobar"] = function tmpl_videobar() {
        return '<div class="bdsft-client"><div class="videoBar classes"><div class="table fixed collapse"><div class="cell leftSpacer"></div><div class="cell cell-selfView"><div class="selfViewDisable icon fadeable"><a href="" title="Disable Self View" class="icon-selfViewDisable"></a></div><div class="selfViewEnable icon fadeable"><a href="" title="Enable Self View" class="icon-selfViewEnable"></a></div></div><div class="cell cell-dialpad"><div class="dialpadIconShow icon fadeable"><a href="" title="Show Dialpad" class="icon-dialpadShow"></a></div><div class="dialpadIconHide icon fadeable"><a href="" title="Hide Dialpad" class="icon-dialpadHide"></a></div></div><div class="cell cell-muteAudio"><div class="icon fadeable muteAudioIcon"><a href="" title="Mute Audio" class="icon-muteAudio"></a></div><div class="icon fadeable unmuteAudioIcon"><a href="" title="Unmute Audio" class="icon-unmuteAudio"></a></div></div><div class="cell cell-hold"><div class="hold icon fadeable"><a href="" title="Hold Call" class="icon-hold"></a></div><div class="resume icon fadeable"><a href="" title="Resume Call" class="icon-resume"></a></div></div><div class="cell cell-hangup"><div class="hangup icon fadeable"><a href="" title="Hangup" class="icon-hangup"></a><div class="subtitle">End Conference</div></div></div><div class="cell cell-transfer"><div class="transfer icon fadeable"><a href="" title="Transfer" class="icon-transfer"></a></div></div><div class="cell cell-shareScreen"><div class="icon fadeable shareScreen"><a href="" title="Share Screen" class="icon-screen-sharing"></a></div><div class="icon fadeable stopShareScreen"><a href="" title="Stop Share Screen" class="icon-screen-sharing-off"></a></div></div><div class="cell cellTimer"></div><div class="cell cell-settings"><div class="settings icon fadeable"><a href="" title="Settings" class="icon-settings"></a></div></div><div class="cell cell-fullScreen"><div class="fullScreenExpand icon fadeable"><a href="" title="Expand Full Screen" class="icon-fullScreenExpand"></a></div><div class="fullScreenContract icon fadeable"><a href="" title="Contract Full Screen" class="icon-fullScreenContract"></a></div></div><div class="cell rightSpacer"></div></div></div></div>';
    };

    return templatizer;
}));