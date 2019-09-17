const fs = require('fs');
const gulp = require('gulp');
const template = require('gulp-template');
const rename = require("gulp-rename");

function loadExhibits() {
  const exhibitsTsv = fs.readFileSync('exhibits.tsv', 'utf8');
  const exhibitsArr = exhibitsTsv.split('\r\n');
  const headers = exhibitsArr[0].split('\t');
  const exhibits = [];
  for (let i = 1; i < exhibitsArr.length; i++) {
    if (!exhibitsArr[i]) {
      continue;
    }
    let exhibit = exhibitsArr[i].split('\t');
    let exhibitObj = {};
    for (let j = 0; j < exhibit.length; j++) {
      exhibitObj[headers[j]] = exhibit[j];
    }
    exhibits.push(exhibitObj);
  }
  return exhibits;
}

gulp.task('build-html', () => {
  const aboutModal = fs.readFileSync('src/_about-modal.html', 'utf8');
  const head = fs.readFileSync('src/_head.html', 'utf8');
  const credits = fs.readFileSync('src/_credits.html', 'utf8');
  const navbar = fs.readFileSync('src/_navbar.html', 'utf8');
  const socialLinks = fs.readFileSync('src/_social-links.html', 'utf8');
  const topSection = fs.readFileSync('src/_top-section.html', 'utf8');
  const takeActionModal = fs.readFileSync('src/_take-action-modal.html', 'utf8');
  const exhibits = loadExhibits();
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

gulp.task('build-multipage', () => {
  const aboutModal = fs.readFileSync('src/_about-modal.html', 'utf8');
  const head = fs.readFileSync('src/_head.html', 'utf8');
  const credits = fs.readFileSync('src/_credits.html', 'utf8');
  const navbar = fs.readFileSync('src/_navbar.html', 'utf8');
  const socialLinks = fs.readFileSync('src/_social-links.html', 'utf8');
  const topSection = fs.readFileSync('src/_top-section.html', 'utf8');
  const takeActionModal = fs.readFileSync('src/_take-action-modal.html', 'utf8');
  const exhibits = loadExhibits();
  return gulp.src('src/multipage.html')
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

gulp.task('build-exhibits-html', function (doneWithTaskCb) {
  const aboutModal = fs.readFileSync('src/_about-modal.html', 'utf8');
  const head = fs.readFileSync('src/_head.html', 'utf8');
  const credits = fs.readFileSync('src/_credits.html', 'utf8');
  const navbar = fs.readFileSync('src/_navbar.html', 'utf8');
  const socialLinks = fs.readFileSync('src/_social-links.html', 'utf8');
  const topSection = fs.readFileSync('src/_top-section.html', 'utf8');
  const takeActionModal = fs.readFileSync('src/_take-action-modal.html', 'utf8');
  const exhibits = loadExhibits();

  function buildExhibitPromise(exhibit) {
    return new Promise((resolve, reject) => {
      gulp.src('src/_exhibit.html')
        .pipe(template({
          credits,
          exhibit,
          aboutModal,
          socialLinks,
          takeActionModal,
          navbar,
          topSection,
          head
        }))
        .pipe(rename(`${exhibit.number}.html`))
        .pipe(gulp.dest(`./exhibits/`))
        .on('end', resolve);
    });
  }
  const promises = [];
  for (let exhibit of exhibits) {
    promises.push(buildExhibitPromise(exhibit));
  }
  return Promise.all(promises)
    .then(() => {
      doneWithTaskCb();
  });
});

gulp.task('watch', () => {
  gulp.watch(
    ['src/*.html', 'exhibits.tsv'],
    { ignoreInitial: false },
    gulp.series('build-html', 'build-exhibits-html', 'build-multipage')
   );
});
