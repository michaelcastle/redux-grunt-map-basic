module.exports = {
    production: {
        options: {
            paths: ['<%= pkg.directories.source %>/less/'],
            compress: true,
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n'
        },
        files: {
            '<%= pkg.directories.destination %>/css/qglobe.css': '<%= pkg.directories.source %>/less/qglobe.less'
        }
    }
};