import gulp from 'gulp';
import runSequence from 'run-sequence';

const localConfig = {
  scssWatchedFiles: 'landing/*.css',
  jsWatchedFiles: 'landing/*.js',
  pugWatchedFiles: 'landing/*.html'
};

gulp.task('watch:scss', () => {
  gulp.watch(localConfig.scssWatchedFiles, ['css']);
});

gulp.task('watch:js', () => {
  gulp.watch(localConfig.jsWatchedFiles, () => {
    runSequence('scripts', 'inject');
  });
});

gulp.task('watch:pug', () => {
  gulp.watch(localConfig.pugWatchedFiles, () => {
    runSequence('html', 'inject');
  });
});

gulp.task('watch', ['watch:pug', 'watch:js', 'watch:scss']);
