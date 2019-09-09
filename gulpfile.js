const fs = require('fs');
const gulp = require('gulp');
const template = require('gulp-template');

gulp.task('build-html', () => {
  const aboutModal = fs.readFileSync('src/_about-modal.html', 'utf8');
  const head = fs.readFileSync('src/_head.html', 'utf8');
  const credits = fs.readFileSync('src/_credits.html', 'utf8');
  const navbar = fs.readFileSync('src/_navbar.html', 'utf8');
  const socialLinks = fs.readFileSync('src/_social-links.html', 'utf8');
  const topSection = fs.readFileSync('src/_top-section.html', 'utf8');
  const takeActionModal = fs.readFileSync('src/_take-action-modal.html', 'utf8');
  const exhibitsStr = fs.readFileSync('exhibits.json', 'utf8');
  const exhibits = JSON.parse(exhibitsStr);
  return gulp.src('src/index.html')
    .pipe(template({
      credits,
      exhibits,
      aboutModal,
      socialLinks,
      takeActionModal,
      navbar,
      topSection,
      head
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
