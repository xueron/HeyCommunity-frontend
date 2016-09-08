//
// In Array
function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(typeof haystack[i] == 'object') {
            if(arrayCompare(haystack[i], needle)) return true;
        } else {
            if(haystack[i] == needle) return true;
        }
    }
    return false;
}


//
// Get Parameter By Name
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, " "));
}


//
// Get Time
function getMomentDate(date) {
    return moment.utc(date).format();
}


//
// get lang
function getLang() {
    var lang;
    if (navigator
            && navigator.userAgent
            && (lang = navigator.userAgent
                    .match(/android.*\W(\w\w)-(\w\w)\W/i))) {
        lang = lang[1];
    }

    if (!lang && navigator) {
        if (navigator.language) {
            lang = navigator.language;
        } else if (navigator.browserLanguage) {
            lang = navigator.browserLanguage;
        } else if (navigator.systemLanguage) {
            lang = navigator.systemLanguage;
        } else if (navigator.userLanguage) {
            lang = navigator.userLanguage;
        }
    }

    return lang;
}


//
//
function isWeChatBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua)) ? true : false ;
}


//
//
function wechatAutoLogin() {
    if (isWeChatBrowser() && !localStorage.user && getParameterByName('noWeChatOAuth') == undefined) {
        location.assign('http://cloud.hey-community.com/api/wechat/o-auth');
    }
}
wechatAutoLogin();
