module.exports = {
    destination: ['<%= pkg.directories.destination %>'],
    build: {
        src: ['<%= pkg.directories.build %>/<%= pkg.name %><%= pkg.version %>']
    },
    uncompressed: {
        src: [
            '<%= pkg.directories.build %>/**/*.uncompressed.js'
        ]
    }
};