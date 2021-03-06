module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-w3c-html-validation');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['handlebars', 'uglify', 'cssmin']);
    grunt.registerTask('server', [ 'express:dev', 'watch' ]);

    grunt.initConfig(
        {
            validation: {
                options: {
                    doctype: 'HTML5',
                    wrapFile: 'assets/templates/wrapfile.html',
                    generateReport: false
                },
                files: {
                    src: ['**/*.html', '!**/*.hbs', '!node_modules/**', '!assets/lib/**']
                }
            },
            watch: {
                options: {
                    livereload: true
                },
                express: {
                    files:  [ '**/*.js' ],
                    tasks:  [ 'express:dev' ],
                    options: {
                        spawn: false
                    }
                },
                client: {
                    files: ['assets/**/*.html', 'assets/**/*.css', 'assets/**/*.hbs', 'assets/**/*.js', '!assets/**/*.min.js'],
                    tasks: ['handlebars', 'uglify']
                }
            },
            cssmin: {
                target: {
                    files: [{
                        'assets/style/style.min.css': [
                            './assets/lib/dropzone/dist/dropzone.css',
                            './assets/style/fontello-embedded.css',
                            './assets/style/style.css'
                        ]
                    }]
                }
            },
            uglify: {
                scripts: {
                    options: {
                        sourceMap: true,
                        mangle: true
                    },
                    files: {
                        'assets/javascript/scripts.min.js': [
                            'assets/lib/dropzone/dist/dropzone.js',
                            'assets/lib/lodash/dist/lodash.core.min.js',
                            'assets/lib/axios/dist/axios.js',
                            'assets/lib/handlebars/handlebars.js',
                            'assets/javascript/templates.js',
                            'assets/javascript/Components.js',
                            'assets/javascript/App.js',
                            'assets/javascript/BookmarkExplorer.js',
                            'assets/javascript/CreateFolder.js',
                            'assets/javascript/ErrorDialog.js',
                            'assets/javascript/BookmarkCreate.js',
                            'assets/javascript/CreateFolder.js',
                            'assets/javascript/BookmarkEdit.js',
                            'assets/javascript/BookmarkUploader.js'
                        ]
                    }
                }
            },
            handlebars: {
                compile: {
                    options: {
                        namespace: 'App.templates'
                    },
                    files: {
                        'assets/javascript/templates.js': 'assets/templates/**/*.hbs'
                    }
                }
            },
            express: {
                options: {
                    // Override defaults here
                },
                dev: {
                    options: {
                        script: './bin/www'
                    }
                },
                prod: {
                    options: {
                        script: './bin/www',
                        node_env: 'production'
                    }
                }
            }

        });

};
