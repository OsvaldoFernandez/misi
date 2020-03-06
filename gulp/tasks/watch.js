import gulp from 'gulp';
import runSequence from 'run-sequence';
import { proj } from '../config';

const localConfig = {
  cssWatchedFiles: `${proj}/*.css`,
  scssWatchedFiles: `${proj}/*.scss`,
  jsWatchedFiles: `${proj}/*.js`,
  pugWatchedFiles: `${proj}/*.html`
};

gulp.task('watch:css', () => {
  gulp.watch(localConfig.cssWatchedFiles, ['css']);
});

gulp.task('watch:scss', () => {
  gulp.watch(localConfig.scssWatchedFiles, ['sass']);
});

gulp.task('watch:js', () => {
  gulp.watch(localConfig.jsWatchedFiles, () => {
    runSequence('scripts');
  });
});

gulp.task('watch:pug', () => {
  gulp.watch(localConfig.pugWatchedFiles, () => {
    runSequence('html');
  });
});

gulp.task('watch', ['watch:pug', 'watch:js', 'watch:css', 'watch:scss']);
