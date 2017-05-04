/**
 * The map dojo configuration
 * @global 
 * @module js/config
 */
var base = location.href.split('/');
base.pop();
base = base.join('/');

var dojoConfig = {
    async: true,
    isDebug: true,
    cacheBust: 'v=' + buildVersion,
    parseOnLoad: true,
    packages: [
        { name: 'app', location: base + '/js' },
        { name: 'config', location: base + '/config' },
        { name: 'views', location: base + '/views' },
        { name: 'vendor', location: base + '/vendor' }
    ]
};


var isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}
