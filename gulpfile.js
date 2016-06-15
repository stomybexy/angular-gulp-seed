var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    historyApiFallback = require('connect-history-api-fallback'),
    KarmaServer = require('karma').Server,
    watch = require('gulp-watch'),
    batch = require('gulp-batch');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function() {
    return del([
        'dist'
    ]);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the css build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean-css', function() {
    return del([
        'dist/**/*.css', 'dist/**/*.css.map'
    ]);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the js build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean-js', function() {
    return del([
        'dist/js/**'
    ]);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the template cache build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean-tpl-js', function() {
    return del([
        'dist/templateCachePartials.js'
    ]);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans index.html build
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean-page', function() {
    return del([
        'dist/index.html'
    ]);
});


/////////////////////////////////////////////////////////////////////////////////////
//
// runs bower to install frontend dependencies
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('bower', function() {

    var install = require("gulp-install");

    return gulp.src(['./bower.json'])
        .pipe(install());
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass, creates css source maps
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-css', ['clean-css'], function() {
    return gulp.src('./styles/*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});


/////////////////////////////////////////////////////////////////////////////////////
//
// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-template-cache', ['clean-tpl-js'], function() {

    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");

    return gulp.src("./components/**/*.html")
        .pipe(ngHtml2Js({
            moduleName: function(file) {
                var pathParts = file.path.split(/[/\\]/g);
                var folder = pathParts[pathParts.length - 2];
                var mod =  folder.replace(/-[a-z]/g, function(match) {
                    return match.substr(1).toUpperCase();
                });
                return mod;
            },
            declareModule: false,
            prefix: "/components/"
        }))
        .pipe(concat("templateCachePartials.js"))
        .pipe(gulp.dest("./dist"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs jshint
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('jshint', function() {
    gulp.src(['/{components, services}/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs karma tests
//
/////////////////////////////////////////////////////////////////////////////////////

// gulp.task('test', ['build-js', 'build-template-cache'], function() {
//     var testFiles = [
//         '/components/**/*.test.js',
//         '/services/**/*.test.js'
//     ];
//
//     return gulp.src(testFiles)
//         .pipe(karma({
//             configFile: 'karma.conf.js',
//             action: 'run'
//         }))
//         .on('error', function(err) {
//             console.log('karma tests failed: ' + err);
//             throw err;
//         });
// });

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', ['build'],function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

/////////////////////////////////////////////////////////////////////////////////////
//
// Build a minified Javascript bundle - the order of the js files is determined
// by browserify
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-js', ['clean-js', 'build-template-cache'], function() {
    var b = browserify({
        entries: './app.js',
        debug: true,
        paths: ['./services', './components'],
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// Build index.html
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('build-page', ['clean-page','build-css', 'build-js'] ,function(){
  return gulp.src('index.html')
      .pipe(cachebust.references())
      .pipe(gulp.dest('dist'));
})

/////////////////////////////////////////////////////////////////////////////////////
//
// full build (except sprites), applies cache busting to the main page css and js bundles
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build', ['bower', 'build-css', 'build-template-cache', 'jshint', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});


/////////////////////////////////////////////////////////////////////////////////////
//
// watches file system and triggers a build when a modification is detected
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function() {
    // watch(['./index.html', './components/**/*.html', './components/**/*.js', './services/**/*.js','./styles/*.*css', './*.js', './components/**',
    //  '/services/**','!components/**/tests', '!components/**/tests/**/*', '!services/**/tests/**/*', '!services/**/tests'], batch(function (events, done) {
    //     gulp.start('reload', done);
    // }));
    watch(['./index.html', './{components, services}/**', './styles/*.*css',
    './app.js','!{components, services}/**/{tests, tests/**}'], batch(function (events, done) {
        gulp.start('reload', done);
    }));

    watch(['{components, services}/**/tests/*.test.js', './karma.conf.js'], batch(function (events, done) {
        gulp.start('tdd', done);
    }));
});

gulp.task('reload', ['build', 'tdd'], reload);

/////////////////////////////////////////////////////////////////////////////////////
//
// launches a web server that serves files in the current directory
//
/////////////////////////////////////////////////////////////////////////////////////

// gulp.task('webserver', ['watch', 'build'], function() {
//     gulp.src('./dist')
//         .pipe(webserver({
//             livereload: true,
//             directoryListing: false,
//             // open: "http://localhost:8000/",
//             fallback: 'index.html'
//         }));
// });

// gulp.task('webserver', ['watch', 'build'], function () {
//   var server = serverFactory.create({
//     path: './dist',
//     port: 8000,
//     fallback: 'index.html'
//   });
//
//   server.start();
// });
//
// gulp.task('webserver',['watch', 'build'], function() {
//   gulp.src('./dist')
//     .pipe(server({
//       livereload: true,
//       directoryListing: false,
//       open: false,
//       fallback: 'index.html'
//     }));
// });

gulp.task('webserver', ['watch', 'build', 'tdd'], function() {
  browserSync({
    port: 8000,
    notify: false,
    logPrefix: 'NG-SEED',
    // snippetOptions: {
    //   rule: {
    //     match: '<span id="browser-sync-binding"></span>',
    //     fn: function(snippet) {
    //       return snippet;
    //     }
    //   }
    // },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ["dist"],
      middleware: [historyApiFallback()]
    }
  });
});


/////////////////////////////////////////////////////////////////////////////////////
//
// launch a build upon modification and publish it to a running server
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('dev', ['watch', 'webserver']);

/////////////////////////////////////////////////////////////////////////////////////
//
// generates a sprite png and the corresponding sass sprite map.
// This is not included in the recurring development build and needs to be run separately
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('sprite', function() {

    var spriteData = gulp.src('./images/*.png')
        .pipe(spritesmith({
            imgName: 'todo-sprite.png',
            cssName: '_todo-sprite.scss',
            algorithm: 'top-down',
            padding: 5
        }));

    spriteData.css.pipe(gulp.dest('./dist'));
    spriteData.img.pipe(gulp.dest('./dist'))
});

/////////////////////////////////////////////////////////////////////////////////////
//
// installs and builds everything, including sprites
//
/////////////////////////////////////////////////////////////////////////////////////

// gulp.task('default', ['sprite','build', 'test']);

gulp.task('default', ['sprite', 'build']);


////////////////////////////////////////////////////////////////////////////////////////
