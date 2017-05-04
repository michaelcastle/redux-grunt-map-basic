module.exports = {
    dist: {
        options: {
            releaseDir: '<%= pkg.directories.build %>/<%= pkg.name %><%= pkg.version %>'
        }
    },
    options: {
        profile: 'build.profile.js',
        dojo: 'bower_components/dojo/dojo.js',
        load: 'build',
        cwd: './'
        //basePath: '<%= pkg.directories.destination %>',
        //dojoConfig: '<%= pkg.directories.destination %>/js/config.js'
    }
};