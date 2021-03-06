var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
                             './public/js/*.js'], {
        read: false
    });
    var injectOptions = {
        ignorePath: '/public'
    };
    var options = {
        verbose: true,
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('nodemon', ['style'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000,
            'NODE_ENV': 'development'
        },
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', ['style'], function (ev) {
            console.log('Restarting .....');
            console.log('File changed on restart:\n' + ev);
        })
        .on('start', ['inject','style'],function (ev) {console.log('Starting .....');})
        .on('crash', function (ev) {console.log('CRASH  .....');})
        .on('exit', function (ev) {console.log('Clean exit .....');})
    ;
});
