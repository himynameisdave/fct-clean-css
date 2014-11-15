// 		A gulpfile by Dave Lunny
var gulp 	= require('gulp'),
	plug 	= require('gulp-load-plugins')({
					scope: ['devDependencies'],
					replaceString: 'gulp-',
				});


///tinyproduction
gulp.task('production', function(){
	console.log('Production Task Start!');

	gulp.src( 'app/lib/js/*.js' )
		.pipe(plug.uglify())
		.on('error', function(e){
        	console.log('uglify js files error');
        	console.log(e);
        })
		.pipe(gulp.dest('app/lib/js/'));

	var js = 'app/lib/js/';
	gulp.src([ 
				js+'angular.js',
				js+'jquery.js',
				js+'hex-to-rgb.js',
				'app/js/app.js'
			])
		.pipe(plug.concat('core.js'))
		.pipe(gulp.dest( 'public/js/' ));


	gulp.src( 'app/css/style.less' )
		.pipe(plug.less())
		.on('error', function(e){
			console.log('ERROR ON LINE ' + e.line);
			console.log(e.message);
		})
		.pipe(gulp.dest('public/css/'));

	gulp.src( 'app/index.html' )
		.pipe( gulp.dest('public/') );

});



///////////////////////////////////////////////////////
//	//											//	//
//	//				DEVELOPMENT					//	//
//	//											//	//
///////////////////////////////////////////////////////

gulp.task('reload', function(){
	plug.livereload.listen()
	gulp.watch(['app/css/*.css','app/js/app.js','app/index.html', 'app/partials/*.html'], function(){
		console.log('RELOADING PAGE');
	})
	.on('change', plug.livereload.changed);
});

gulp.task('less', function(){
	gulp.src('app/css/style.less')
		//LESS compilation
		.pipe(plug.less({
				style: 'compressed'
			}))
		//LESS error catch
		.on('error', function(e){
			console.log('ERROR ON LINE ' + e.line);
			console.log(e.message);
		})
		.pipe(gulp.dest('app/css/'));
});

gulp.task('styles', function(){
	gulp.watch('app/css/style.less', ['less']);
});	

	


///////////////////////////////////////////////////////
//	//					DEFAULT					//	//
//	//											//	//
	gulp.task('default', ['reload', 'styles']); //	//
//	//											//	//
///////////////////////////////////////////////////////