module.exports = {
    options: {
        accessKeyId: '<%= environment.aws.key %>',
        secretAccessKey: '<%= environment.aws.secret %>',
        bucket: '<%= environment.aws.bucket %>',
        region: '<%= environment.aws.region %>',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
    },
    clean: {
        files: [
            { dest: '/', action: 'delete' }
        ]
    },
    dev: {
        files: [
            {
                expand: true,
                cwd: '<%= pkg.directories.destination %>/', src: ['**'],
                dest: '/', action: 'upload'
            }
        ]
    }
};