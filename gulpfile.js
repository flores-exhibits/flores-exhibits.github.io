const fs = require('fs');
const gulp = require('gulp');
const template = require('gulp-template');

gulp.task('build-html', () => {
  const aboutModal = fs.readFileSync('src/_about-modal.html', 'utf8');
  const takeActionModal = fs.readFileSync('src/_take-action-modal.html', 'utf8');
  const exhibitsStr = fs.readFileSync('exhibits.json', 'utf8');
  const exhibits = JSON.parse(exhibitsStr);
  return gulp.src('src/index.html')
    .pipe(template({
      exhibits,
      aboutModal,
      takeActionModal
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', () => {
  gulp.watch(
    ['src/*.html', 'exhibits.json'],
    { ignoreInitial: false },
    gulp.series('build-html')
   );
});
