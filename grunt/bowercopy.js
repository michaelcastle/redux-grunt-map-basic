module.exports = {
    vendor: {
        options: {
            srcPrefix: 'node_modules',
            destPrefix: '<%= pkg.directories.destination %>/vendor'
        },
        files: {
            'Redux': 'redux/dist/redux.min.js',
            'ReduxUndo': 'redux-undo/dist/redux-undo.js'
        }
    }
};