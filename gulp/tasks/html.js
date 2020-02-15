import gulp from 'gulp';
import del from 'del';
import { errorHandler, getSecretKeys } from '../config';

const localConfig = {
  src: './landing/*.html',
  dest: './build',
  cleanSrc: './build/*.html'
};

gulp.task('clean:html', () => {
  return del([localConfig.cleanSrc]);
});

gulp.task('html', ['clean:html'], () => {
  return gulp.src(localConfig.src)
  .pipe(gulp.dest(localConfig.dest));
});
