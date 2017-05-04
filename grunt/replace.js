var locals = require('../scripts/locals');
module.exports = {
    settings: {
        options: {
            patterns: [
                { match: 'esriVersion', replacement: locals.esriVersion },
                { match: 'version', replacement: '<%= pkg.version %>' },
                { match: 'liveReload', replacement: locals.liveReload }
            ]
        },
        files: [{
            expand: true,
            flatten: true,
            src: ['<%= pkg.directories.source %>/index.html'],
            dest: '<%= pkg.directories.destination %>/'
        }, {
            expand: true,
            flatten: true,
            src: ['<%= pkg.directories.source %>/build.html'],
            dest: '<%= pkg.directories.destination %>/'
        }]
    },
    proxy: {
        options: {
            patterns: [
                { match: 'password', replacement: '<%= environment.proxy.password %>' },
                { match: 'username', replacement: '<%= environment.proxy.username %>' },
                { match: 'proxyserver', replacement: '<%= environment.proxy.server %>' },
                { match: 'proxyport', replacement: '<%= environment.proxy.port %>' }
            ]
        },
        files: [
            { src: ['scripts/_.bowerrc'], dest: 'scripts/.bowerrc' },
            { src: ['scripts/_setproxy.bat'], dest: 'scripts/setproxy.bat' }
        ],
    },
};