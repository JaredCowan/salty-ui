module.exports = function (grunt) {
  'use strict';

  grunt.file.defaultEncoding = 'utf8';
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    secret: grunt.file.readJSON('.secret.json'),
    banner: '/*! \n' +
            ' * <%= pkg.title %>  v<%= pkg.version %> \n' +
            ' * License: <%= pkg.license.type %> <%= pkg.license.url %> \n' +
            ' * Web: <%= pkg.homepage %> \n' +
            ' * repository: <%= pkg.repository.url %> \n' +
            ' * Changed: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
            '*/ \n',
    cssBanner: '<%= banner %>' +
               '/*! \n' +
               ' // 01.) Normalize CSS                  ( Around line 22   ) \n' +
               ' // 02.) Fonts CSS                      ( Around line 293  ) \n' +
               ' // 03.) Basic Element Styles           ( Around line 2246 ) \n' +
               ' // 04.) Columns and Containers         ( Around line 2743 ) \n' +
               ' // 05.) Tables CSS                     ( Around line 3420 ) \n' +
               ' // 06.) Inputs & Form Fields           ( Around line 3667 ) \n' +
               ' // 07.) Buttons & Button Groups        ( Around line 4128 ) \n' +
               ' // 08.) Navigation Styles              ( Around line 5024 ) \n' +
               ' // 09.) Breadcrumb & Pagination Styles ( Around line 5757 ) \n' +
               ' // 10.) Labels & Badge Styles          ( Around line 5913 ) \n' +
               ' // 11.) Jumbotron Styles               ( Around line 6031 ) \n' +
               ' // 12.) Thumbnails Images Styles       ( Around line 6076 ) \n' +
               ' // 13.) Alerts Styles                  ( Around line 6109 ) \n' +
               ' // 14.) Progress Bars Styles           ( Around line 6195 ) \n' +
               ' // 15.) Media and List-Group Items     ( Around line 6296 ) \n' +
               ' // 16.) Panel Styles                   ( Around line 6507 ) \n' +
               ' // 17.) Wells Styles                   ( Around line 6852 ) \n' +
               ' // 18.) Modal Styles                   ( Around line 6907 ) \n' +
               ' // 19.) Tooltips & Popovers Styles     ( Around line 7061 ) \n' +
               ' // 20.) Carousel Styles                ( Around line 7297 ) \n' +
               ' // 21.) Misc Element Styles            ( Around line 7526 ) \n' +
               '*/ \n',
   
    // Task configuration.
    clean: {
      dist: 'dist'
    },

    concat: {
      options: {
        stripBanners: true
      },
      saltyJS: {
        options: {
          banner: '<%= banner %> '
        },
        src: [
          'js/req-jquery.js',
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js',
          'js/nicescroll.js',
          'js/scrollto.js',
          'js/boxslider.js',
          'js/accordion.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      saltyCSS: {
        options: {
          banner: '<%= cssBanner %>'
        },
        src: [
          'css/normalize.css',
          'css/print.css',
          'css/icons.css',
          'css/basic.css',
          'css/thumbnails.css',
          'css/code.css',
          'css/columns.css',
          'css/tables.css',
          'css/forms.css',
          'css/buttons.css',
          'css/navbars.css',
          'css/breadcrumbs.css',
          'css/badges.css',
          'css/jumbtrons.css',
          'css/alerts.css',
          'css/progresbars.css',
          'css/media-listgroups.css',
          'css/panels.css',
          'css/wells.css',
          'css/modals.css',
          'css/tooltip-popovers.css',
          'css/carousels.css',
          'css/misc-elements.css',
          'css/salty.css'
        ],
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },

    uglify: {
      options: {
        preserveComments: false,
        banner: '<%= banner %> \n'
      },
      core: {
        src: '<%= concat.saltyJS.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      site: {
        src: '<%= concat.saltyJS.dest %>',
        dest: 'docs/js/<%= pkg.name %>.min.js'
      }
    },

    autoprefixer: {
      options: {
        browsers: '<%= pkg.config.autoprefixerBrowsers %>'
      },
      core: {
        options: {
          map: false
        },
        src: 'dist/css/<%= pkg.name %>.css'
      },
      site: {
        options: {
          map: false
        },
        src: 'docs/css/site.css'
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
          path: '<%= secret.path %>/pages/',
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
  grunt.registerTask('dist-css', ['concat:saltyCSS', 'autoprefixer', 'cssmin:core', 'cssmin:site']);

  // SFTP Common Files
  grunt.registerTask('ftp', ['sftp:distindex', 'sftp:distjs', 'sftp:distcss']);

  // SFTP Common Files
  grunt.registerTask('ftpall', ['sftp']);

  // Test Page Speed
  grunt.registerTask('speed', ['pagespeed']);

  // Default Task.
  grunt.registerTask('default', ['uglify', 'copy:fonts']);

  // Full Distribution Task.
  grunt.registerTask('dist', ['clean:dist', 'copy', 'dist-css', 'dist-js', 'ftpall']);

};