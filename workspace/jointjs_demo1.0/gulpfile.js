var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('watch', function () {    // 这里的watch，是自定义的，写成live或者别的也行
    var server = livereload();
    
    // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
    gulp.watch('jointjs_demo/**/*.*', function (file) {
        server.changed(file.path);
    });
});


/*browserSync*/
//const gulp        = require('gulp');
//const browserSync = require('browser-sync').create();
//gulp.task("watch",function(){
//  browserSync.init({
//      /*这里的files写的是需要监控的文件的位置*/
//       files:[             
//           "./src/**/*.html",
//           "./src/css/*.css",
//           "./src/js/*.js"
//       ],
//       logLevel: "debug",
//       logPrefix:"insgeek",
//       /*这里的proxy写的是需要代理的服务器，我自己的wamp启动的是localhost:80*/
//       proxy:"localhost:80",
//       ghostMode: {
//	        clicks: true,
//	        forms: true,
//	        scroll: true
//	     },
//       /*这里写的是代理后，bs在哪个端口打开*/
//       port: 81,
//       /*这里设置的是bs运行时打开的浏览器名称*/
//	     browser: "chrome"
//  });
//});
//
