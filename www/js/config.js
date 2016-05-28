/**
 * Config
 *
 * see doc:
 */



//
// auto set API
if (window.location.protocol == 'http:' || window.location.protocol == 'https:') {
    API     =   window.location.protocol + '//' + window.location.hostname + '/api';
    CDN     =   window.location.protocol + '//' + window.location.hostname;
} else {
    alert('Please use the browser to open WEBAPP');
    alert('Please use the browser to open WEBAPP');
    alert('Please use the browser to open WEBAPP');
}


console.debug('the API is: ' + API);
console.debug('the CDN is: ' + CDN);
