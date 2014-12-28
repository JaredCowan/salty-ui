module.exports = function (grunt) {
  'use strict';

  grunt.file.defaultEncoding = 'utf8';
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('config/.csscomb.json'),
    secret: grunt.file.readJSON('config/.secret.json'),

    banner: '/*! \n' +
            ' * <%= pkg.title %>  v<%= pkg.version %> \n' +
            ' * License: <%= pkg.license.type %> <%= pkg.license.url %> \n' +
            ' * Web: <%= pkg.homepage %> \n' +
            ' * repository: <%= pkg.repository.url %> \n' +
            ' * Changed: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
            '*/ \n',
    cssBanner: '<%= banner %>',

    // Task configuration.
    clean: {
      dist: 'dist',
      sasssource: ["sass/source/salty-ui.css", "sass/source/salty-ui.css.map"]
    },

    concat: {
      options: {
        stripBanners: true
      },
      saltyJS: {
        options: {
          banner: '<%= banner %>'
        },
        src: [
          "js/req-jquery.js",
          "js/transition.js",
          "js/alert.js",
          "js/button.js",
          "js/carousel.js",
          "js/collapse.js",
          "js/dropdown.js",
          "js/modal.js",
          "js/tooltip.js",
          "js/popover.js",
          "js/scrollspy.js",
          "js/tab.js",
          "js/affix.js",
          "js/nicescroll.js",
          "js/scrollto.js",
          "js/boxslider.js",
          "js/accordion.js"
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      saltyCSS: {
        options: {
          banner: '<%= cssBanner %>'
        },
        src: [
          "css/normalize.css",
          "css/print.css",
          "css/icons.css",
          "css/basic.css",
          "css/thumbnails.css",
          "css/code.css",
          "css/columns.css",
          "css/tables.css",
          "css/forms.css",
          "css/buttons.css",
          "css/navbars.css",
          "css/breadcrumbs.css",
          "css/badges.css",
          "css/jumbtrons.css",
          "css/alerts.css",
          "css/progresbars.css",
          "css/media-listgroups.css",
          "css/panels.css",
          "css/wells.css",
          "css/modals.css",
          "css/tooltip-popovers.css",
          "css/carousels.css",
          "css/misc-elements.css",
          "css/salty.css"
        ],
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },

    compass: {
      sasssource: {
        options: {
          noLineComments: true,
          sourcemap: true,
          specify: ['sass/source/<%= pkg.name %>.scss'],
          sassDir: 'sass',
          cssDir: 'sass',
          imagesDir: 'docs/img',
          fontsDir: 'fonts',
          relativeAssets: true,
          boring: true,
          debugInfo: false,
          outputStyle: 'expanded',
          raw: "preferred_syntax = :scss\n"
        }
      }
    },

    uglify: {
      options: {
        preserveComments: false,
        banner: '<%= banner %> \n'
      },
      core: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      site: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    autoprefixer: {
      options: {
        browsers: '<%= pkg.config.autoprefixerBrowsers %>',
        map: false
      },
      core: {
        src: 'dist/css/<%= pkg.name %>.css'
      },
      site: {
        src: 'docs/css/site.css'
      },
      sasssource: {
        src: 'sass/source/<%= pkg.name %>.css'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '0',
        noAdvanced: true,
        banner: '<%= banner %>'
      },
      core: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      },
      site: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'docs/css/<%= pkg.name %>.min.css'
      }
    },

    copy: {
      fonts: {
        src: 'fonts/*',
        dest: 'dist/'
      },
      site: {
        src: 'fonts/*',
        dest: 'docs/'
      },
      sasssource: {
        src: 'sass/source/salty-ui.css.map',
        dest: 'sass/dist/salty-ui.css.map'
      }
    },

    pagespeed: {
      options: {
        nokey: true,
        url: "http://salty-ui.com"
      },
      prod: {
        options: {
          url: "http://salty-ui.com",
          locale: "en_US",
          strategy: "desktop",
          threshold: 85
        }
      },
      paths: {
        options: {
          paths: ["/"],
          locale: "<%= pagespeed.prod.options.locale %>",
          strategy: "mobile",
          threshold: 85
        }
      }
    },

    csslint: {
      options: {
        csslintrc: 'config/.csslintrc',
        formatters: [
          {
            id: 'text', dest: 'report/csslint.txt'
          }
        ]
      },
      predist: [
        'css/**.css'
      ],
      dist: [
        'dist/css/salty-ui.css'
      ],
      docs: {
        options: {
          ids: false,
          'overqualified-elements': false
        },
        src: 'docs/css/site.css'
      }
    },

    csscomb: {
      options: {
        config: 'config/.csscomb.json'
      },
      docs: {
        expand: true,
        cwd: 'docs/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'docs/css/'
      },
      predist: {
        expand: true,
        cwd: 'css/',
        src: ['*.css'],
        dest: 'css/'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      },
      sasssource: {
        expand: true,
        cwd: 'sass/source',
        src: ['<%= pkg.name %>.css'],
        dest: 'sass/dist'
      }
    },

    watch: {
      test: {
        files: ['sass/source/*.scss', 'sass/source/**/*.scss'],
        tasks: ['compass', 'autoprefixer:sasssource', 'csscomb:sasssource', 'copy:sasssource', 'clean:sasssource']
      }
    },

    sftp: {
      options: {
          host: '<%= secret.host %>',
          username: '<%= secret.username %>',
          password: '<%= secret.password %>',
          showProgress: true,
          "<%= secret.option %>": '<%= secret.optionans %>'
      },
      distindex: {
        files: {
          "./": "docs/index.html"
        },
        options: {
          path: '<%= secret.path %>/',
          srcBasePath: "docs/"
        },
      },
      distjs: {
        files: {
          "./": "docs/js/**"
        },
        options: {
          path: '<%= secret.path %>/js/',
          srcBasePath: "docs/js/"
        },
      },
      distcss: {
        files: {
          "./": "docs/css/**"
        },
        options: {
          path: '<%= secret.path %>/css/',
          srcBasePath: "docs/css/"
        },
      },
      distfonts: {
        files: {
          "./": "docs/fonts/**"
        },
        options: {
          path: '<%= secret.path %>/fonts/',
          srcBasePath: "docs/fonts/"
        },
      },
      distimg: {
        files: {
          "./": "docs/img/**"
        },
        options: {
          path: '<%= secret.path %>/img/',
          srcBasePath: "docs/img/"
        },
      },
      distpages: {
        files: {
          "./": "docs/pages/**"
        },
        options: {
          path: '<%= secret.path %>/pages',
          srcBasePath: "docs/pages/"
        }
      }
    }
  });

  // Load plugins
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // Dist JS
  grunt.registerTask('dist-js', ['concat:saltyJS', 'uglify:core', 'uglify:site']);

  // Dist CSS
  grunt.registerTask('dist-css', ['concat:saltyCSS', 'autoprefixer', 'csscomb', 'cssmin:core', 'cssmin:site']);

  // SFTP Common Files
  grunt.registerTask('ftp', ['sftp:distindex', 'sftp:distpages', 'sftp:distjs', 'sftp:distcss']);

  // SFTP All Files
  grunt.registerTask('ftpall', ['csscomb','sftp']);

  // CSS Lint PreDist
  grunt.registerTask('lintpredist', ['csscomb', 'csslint:predist']);

  // CSS Lint Docs
  grunt.registerTask('lintdocs', ['csscomb', 'csslint:docs']);

  // CSS Lint Dist
  grunt.registerTask('lintdist', ['csscomb', 'csslint:dist']);

  // CSS Lint All
  grunt.registerTask('lint', ['csscomb', 'csslint:docs', 'csslint:predist']);

  // CSS Comb
  grunt.registerTask('comb', ['csscomb']);

  // Test Page Speed
  grunt.registerTask('speed', ['pagespeed']);

  // Default Task.
  grunt.registerTask('default', ['clean:dist', 'copy', 'dist-css', 'dist-js']);

  // Full Distribution Task.
  grunt.registerTask('dist', ['clean:dist', 'copy', 'dist-css', 'dist-js', 'ftpall']);

};