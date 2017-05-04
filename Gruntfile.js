module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var options = {
        config: {
            src: 'grunt/*.js'
        },
        pkg: grunt.file.readJSON('package.json'),
        environment: grunt.file.readJSON('scripts/environment.json')
    };

    var configs = require('load-grunt-configs')(grunt, options);

    // Project configuration.
    grunt.initConfig(configs);

    // Development
    grunt.registerTask('default', ['build-all', 'develop']);
    grunt.registerTask('build-all', ['clean:destination', 'copy-all', 'bowercopy:vendor', 'replace:settings', 'jsdoc:dist']);
    grunt.registerTask('build-min', ['copy-all', 'replace:settings']);
    grunt.registerTask('copy-all', ['copy:build']);
    grunt.registerTask('develop', ['start-server', 'watch:build']);
    grunt.registerTask('server', ['start-server', 'develop']);
    grunt.registerTask('dojobuild', ['build-all', 'copy:packagejson', 'clean:build', 'dojo', 'after-build']);
    grunt.registerTask('after-build', ['copy:main', 'uglify:build', 'copy:buildserver']);
    grunt.registerTask('deploy-s3', ['build-all', 'aws_s3:clean', 'aws_s3:dev']);

    // Helpers
    grunt.registerTask('start-server', ['connect:server', 'connect:dojobuild']);
    grunt.registerTask('updateproxy', ['replace:proxy']);
};