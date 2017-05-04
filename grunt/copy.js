module.exports = {
    build: {
        expand: true,
        cwd: '<%= pkg.directories.source %>',
        src: ['**/*', '!**/less/**', '!**/handlebars/**', '**/helpers/**', '!*.md'],
        dest: '<%= pkg.directories.destination %>/'
    },
    packagejson: {
        expand: true,
        cwd: './',
        src: ['package.json'],
        dest: '<%= pkg.directories.destination %>/'
    },
    production: {
        expand: true,
        cwd: '<%= pkg.directories.build %>/<%= pkg.name %><%= pkg.version %>/',
        src: ['**'],
        dest: '<%= environment.production.dir %>/'
    },
    main: {
        files: [{
            expand: true,
            cwd: '<%= pkg.directories.destination %>',
            src: ['build.html'],
            dest: '<%= pkg.directories.build %>/<%= pkg.name %><%= pkg.version %>/',
            rename: function (dest, src) {
                return dest + 'index.html';
            }
        }]
    },
    buildserver: {
        expand: true,
        cwd: './scripts',
        src: ['testbuild.bat'],
        dest: '<%= pkg.directories.build %>/<%= pkg.name %><%= pkg.version %>/'
    }
};