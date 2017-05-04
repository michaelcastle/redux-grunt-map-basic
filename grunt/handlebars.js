module.exports = {
    destination: {
        options: {
            processName: function (filePath) {
                return filePath.replace(/^\.\/src\/js\/handlebars\//, '').replace(/\.hbs$/, '');
            },
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n'
        },
        files: {
            '<%= pkg.directories.destination %>/views/helpers/templates.js': ['<%= pkg.directories.source %>/views/handlebars/**/*.hbs']
        }
    }
};