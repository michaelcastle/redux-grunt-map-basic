module.exports = {
    files: [
        'Gruntfile.js',
        '<%= pkg.directories.source %>/js/*.js',
        '<%= pkg.directories.source %>/js/**/*.js',
        '!<%= pkg.directories.source %>/js/handlebars/**.js',
        '!<%= pkg.directories.source %>/site/**.js'
    ],
    options: {
        globals: {
            jQuery: true
        }
    }
};