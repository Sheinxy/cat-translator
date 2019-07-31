function getAndroidVersion(ua) {
    ua = (ua || navigator.userAgent).toLowerCase();
    var match = ua.match(/android\s([0-9\.]*)/);
    return match ? match[1] : undefined;
};

const androidVersion = getAndroidVersion();
if (androidVersion && androidVersion[0] < 7) {
    const scriptTags = document.querySelectorAll("script");

    for (var i = 0; i < scriptTags.length; i++) {
        if (scriptTags[i].src.indexOf("/scripts/compatibility.js") == -1 && scriptTags[i].src.indexOf("/scripts/mobile.js") == -1) {
            var parent = scriptTags[i].parentNode;
            var newTag = document.createElement("script");
            newTag.src = scriptTags[i].src.replace("scripts", "scripts/old-devices");
            parent.removeChild(scriptTags[i]);
            parent.appendChild(newTag);
        }
    }
}