module.exports = {
    options: {
        separator: ';',
        sourceMap: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n'
    },
    vendors: {
        files: {
            '<%= pkg.directories.destination %>/vendor/vendors.js': [
                'bower_components/jquery/dist/jquery.min.js',
                'node_modules/handlebars/dist/handlebars.min.js',
                'bower_components/jquery-ui/ui/minified/core.js',
                'bower_components/jquery-ui/ui/minified/widget.js',
                'bower_components/jquery-ui/ui/minified/position.js',
                'node_modules/redux/dist/redux.min.js'
            ]
        }
    },
    publish: {
        files: {
            '<%= pkg.directories.destination %>/allScripts.js': [
                '<%= pkg.directories.source %>/js/*.js',
                '<%= pkg.directories.source %>/js/**/*.js',
                '<%= pkg.directories.source %>/js/**/**/*.js',
                '!<%= pkg.directories.source %>/js/config.js'
            ]
        }
    }
};