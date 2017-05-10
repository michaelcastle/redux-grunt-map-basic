module.exports = {
    vendor: {
        options: {
            srcPrefix: 'node_modules',
            destPrefix: '<%= pkg.directories.destination %>/vendor'
        },
        files: {
            'Redux': 'redux/dist/redux.min.js',
            'ReduxUndo': 'redux-undo/dist/redux-undo.js',
            'ReduxObservable': 'redux-observable/dist/redux-observable.min.js',
            'Rx': 'rx/dist/rx.all.js',
            'redux-rx': 'redux-rx/dist/*'
        }
    }
};