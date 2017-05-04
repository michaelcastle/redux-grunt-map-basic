module.exports = {
    server: {
        options: {
            port: 9001,
            base: '<%= pkg.directories.destination %>'
        }
    },
    dojobuild: {
        options: {
            port: 9002,
            base: '<%= pkg.directories.build %>/<%= pkg.name %><%= pkg.version %>'
        }
    }
};