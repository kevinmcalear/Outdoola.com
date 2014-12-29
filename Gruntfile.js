// Generated on 2014-09-14 using generator-angularfire 0.8.2-7
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      coffee: {
        files: ["<%= yeoman.app %>/scripts/**/*.coffee"],
        tasks: ["coffee:dist"]
      },
      js: {
        files: [
          '<%= yeoman.app %>/scripts/{,*/}*.js',
          '<%= yeoman.app %>/scripts/**/*.js'
        ],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '<%= yeoman.app %>/views/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        // cwd: '<%= yeoman.app %>'
      },
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Compiles Coffee to JavaScript and generates necessary files if requested
    coffee: {
      server: {
        options: {
          sourceMap: true,
          sourceRoot: ""
        },
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>/scripts",
            src: "**/*.coffee",
            dest: ".tmp/scripts",
            ext: ".js"
          }
        ]
      },
      dist: {
        options: {
          sourceMap: false,
          sourceRoot: ""
        },
        files: [
          {
            expand: true,
            cwd: "<%= yeoman.app %>/scripts",
            src: "**/*.coffee",
            dest: ".tmp/scripts",
            ext: ".js"
          }
        ]
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
              '<%= yeoman.dist %>/scripts/app.js',
              '<%= yeoman.dist %>/scripts/routes.js',
              '<%= yeoman.dist %>/scripts/filters/reverse.js',
              '<%= yeoman.dist %>/scripts/angularfire/config.js',
              '<%= yeoman.dist %>/scripts/angularfire/firebase.utils.js',
              '<%= yeoman.dist %>/scripts/angularfire/simpleLogin.js',
              '<%= yeoman.dist %>/scripts/controllers/main.js',
              '<%= yeoman.dist %>/scripts/controllers/chat.js',
              '<%= yeoman.dist %>/scripts/controllers/login.js',
              '<%= yeoman.dist %>/scripts/controllers/account.js',
              '<%= yeoman.dist %>/scripts/controllers/adventure.js',
              '<%= yeoman.dist %>/scripts/controllers/showAdventure.js',
              '<%= yeoman.dist %>/scripts/directives/ngShowAuth.js',
              '<%= yeoman.dist %>/scripts/directives/ngHideAuth.js',
              '<%= yeoman.dist %>/scripts/shared/directives.js',
              '<%= yeoman.dist %>/scripts/shared/localize.js',
              '<%= yeoman.dist %>/scripts/shared/main.js',
              '<%= yeoman.dist %>/scripts/shared/Nav.js',
              '<%= yeoman.dist %>/scripts/Form/FormCtrl.js',
              '<%= yeoman.dist %>/scripts/Form/FormDirective.js',
              '<%= yeoman.dist %>/scripts/Form/FormValidation.js',
              '<%= yeoman.dist %>/scripts/Table/TableCtrl.js',
              '<%= yeoman.dist %>/scripts/Task/Task.js',
              '<%= yeoman.dist %>/scripts/UI/Map.js',
              '<%= yeoman.dist %>/scripts/UI/UICtrl.js',
              '<%= yeoman.dist %>/scripts/UI/UIDirective.js',
              '<%= yeoman.dist %>/scripts/UI/UIService.js',
              '<%= yeoman.dist %>/scripts/Chart/ChartCtrl.js',
              '<%= yeoman.dist %>/scripts/Chart/ChartDirective.js',
              '<%= yeoman.dist %>/scripts/Page/PageCtrl.js'
          ],'<%= yeoman.dist %>/scripts/vendor.js': [
              '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
              '<%= yeoman.dist %>/bower_components/jquery/dist/jquery.js',
              '<%= yeoman.dist %>/bower_components/angular/angular.js',
              '<%= yeoman.dist %>/bower_components/json3/lib/json3.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
              '<%= yeoman.dist %>/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
              '<%= yeoman.dist %>/bower_components/angular-resource/angular-resource.js',
              '<%= yeoman.dist %>/bower_components/angular-cookies/angular-cookies.js',
              '<%= yeoman.dist %>/bower_components/angular-sanitize/angular-sanitize.js',
              '<%= yeoman.dist %>/bower_components/angular-animate/angular-animate.js',
              '<%= yeoman.dist %>/bower_components/angular-touch/angular-touch.js',
              '<%= yeoman.dist %>/bower_components/angular-route/angular-route.js',
              '<%= yeoman.dist %>/bower_components/firebase/firebase.js',
              '<%= yeoman.dist %>/bower_components/firebase-simple-login/firebase-simple-login.js',
              '<%= yeoman.dist %>/bower_components/mockfirebase/dist/mockfirebase.js',
              '<%= yeoman.dist %>/bower_components/angularfire/dist/angularfire.min.js',
              '<%= yeoman.dist %>/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
              '<%= yeoman.dist %>/bower_components/ngmap/build/scripts/ng-map.js',
              '<%= yeoman.dist %>/bower_components/angular-xeditable/dist/js/xeditable.js',
              '<%= yeoman.dist %>/bower_components/angular-base64-upload/src/angular-base64-upload.js',
              '<%= yeoman.dist %>/bower_components/jquery.slimscroll/jquery.slimscroll.min.js',
              '<%= yeoman.dist %>/bower_components/gauge.js/dist/gauge.js',
              '<%= yeoman.dist %>/bower_components/gauge.js/dist/gauge.min.js',
              '<%= yeoman.dist %>/bower_components/jquery-steps/build/jquery.steps.js',
              '<%= yeoman.dist %>/bower_components/angular-wizard/dist/angular-wizard.js',
              '<%= yeoman.dist %>/bower_components/textAngular/dist/textAngular.min.js',
              '<%= yeoman.dist %>/bower_components/angular-ui-tree/dist/angular-ui-tree.js',
              '<%= yeoman.dist %>/bower_components/ng-tags-input/ng-tags-input.min.js',
              '<%= yeoman.dist %>/bower_components/flot/jquery.flot.js',
              '<%= yeoman.dist %>/bower_components/flot.tooltip/js/jquery.flot.tooltip.js',
              '<%= yeoman.dist %>/bower_components/angular-loading-bar/build/loading-bar.js',
              '<%= yeoman.dist %>/bower_components/raphael/raphael.js',
              '<%= yeoman.dist %>/bower_components/mocha/mocha.js',
              '<%= yeoman.dist %>/bower_components/morris.js/morris.js'
          ]
        }
      }
    },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
