const fs = require('fs');
const gulp = require('gulp');
const template = require('gulp-template');

gulp.task('build-html', () => {
  const exhibitsStr = fs.readFileSync('exhibits.json', 'utf8');
  const exhibits = JSON.parse(exhibitsStr);
  return gulp.src('src/index.html')
    .pipe(template({exhibits}))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', () => {
  gulp.watch(
    ['src/index.html', 'exhibits.json'],
    { ignoreInitial: false },
    gulp.series('build-html')
   );
});
