const fs = require('fs');
const gulp = require('gulp');
const template = require('gulp-template');
const rename = require("gulp-rename");

const SPECIAL_CHARS = {
  'é': '&eacute;'
};

function formatStr(str) {
  for (let char of Object.keys(SPECIAL_CHARS)) {
    str = str.replace(new RegExp(char, 'g'), SPECIAL_CHARS[char]);
  }
  return str;
}

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
      exhibitObj[headers[j]] = formatStr(exhibit[j]);
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

gulp.task('watch', () => {
  gulp.watch(
    ['src/*.html', 'exhibits.tsv'],
    { ignoreInitial: false },
    gulp.series('build-html')
   );
});
