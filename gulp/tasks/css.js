import gulp from 'gulp';
import gulpif from 'gulp-if';
import del from 'del';
import { proj } from '../config';


const localConfig = {
  src: `./${proj}/*.css`,
  dest: './build/css/',
  cleanSrc: ['./build/css/*.css'],
};

gulp.task('clean:css', () => {
  return del(localConfig.cleanSrc);
});

gulp.task('css', ['clean:css'], () => {
  return gulp.src(localConfig.src)
    .pipe(gulp.dest(localConfig.dest));
});
