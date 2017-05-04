module.exports = {
    businesslogic: {
        files: [{
            expand: true,
            cwd: '<%= pkg.directories.source %>\\js',
            src: '**\\*.js',
            dest: '<%= pkg.directories.destination %>\\js'
        }]
    },
    build: {
        options: {
            sourceMap: true,
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) - <%= pkg.author %> */\n'
        },
        files: {
            '<%= pkg.directories.build %>/<%= pkg.name %><%= pkg.version %>/dojo/dojo.min.js': [
                '<%= pkg.directories.build %>/<%= pkg.name %><%= pkg.version %>/dojo/dojo.js'
            ]
        }
    }
};