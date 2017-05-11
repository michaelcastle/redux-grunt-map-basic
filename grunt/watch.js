module.exports = {
    files: [
        '<%= pkg.directories.source %>/views/**',
        '<%= jshint.files %>',
        '<%= pkg.directories.source %>/views/*.html',
        '<%= pkg.directories.source %>/*.html',
        '<%= pkg.directories.source %>/**/*.html',
        '<%= pkg.directories.source %>/css/*.css',
        '<%= pkg.directories.source %>/js/**/**/*.js',
        '<%= pkg.directories.source %>/js/**/*.js',
        '<%= pkg.directories.source %>/config/*.*'
    ],
    options: {
        livereload: 35729
    },
    build: {
        files: [
            '<%= pkg.directories.source %>/config/*.*',
            '<%= pkg.directories.source %>/*.html',
            '<%= pkg.directories.source %>/**/**/**/*.html',
            '<%= pkg.directories.source %>/js/*.js',
            '<%= pkg.directories.source %>/js/**/*.js',
            '<%= pkg.directories.source %>/js/**/**/*.js',
            '<%= pkg.directories.source %>/js/**/**/**/*.js',
            '<%= pkg.directories.source %>/css/*.css',
            '<%= pkg.directories.source %>/views/*.html',
            '<%= pkg.directories.source %>/views/**/*.js'
        ],
        tasks: ['build-min'],
        options: {
            livereload: 35729
        }
    },
    css: {
        files: ['<%= pkg.directories.source %>/css/*.css'],
        tasks: ['build-min']
    }
};