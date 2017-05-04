module.exports = {
    dist: {
        src: [
            './README.md',
            '<%= pkg.directories.source %>/js/**/*.js'
        ],
        options: {
            destination: '<%= pkg.directories.destination %>/doc/api'
        }
    }
};