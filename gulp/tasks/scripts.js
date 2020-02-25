import gulp from 'gulp';
import cached from 'gulp-cached';
import gulpif from 'gulp-if';
import { proj } from '../config';

const localConfig = {
  src () {
    return [`./${proj}/*.js`];
  },
  dest () {
    return './build/js/';
  },
  buildFileName: 'all.js'
};

gulp.task('scripts', () => {
  return gulp.src(localConfig.src())
    .pipe(cached('scripts'))
    .pipe(gulp.dest(localConfig.dest()));
});
