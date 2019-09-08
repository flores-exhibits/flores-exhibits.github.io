function isModalClick(evt) {
  let target = evt.target;
  while (target != document) {
    if (target.classList.contains('modal-content')) {
      return true;
    }
    target = target.parentNode;
  }
  return false;
}

function hideModals() {
  const modals = document.getElementsByClassName('modal');
  for (let modal of modals) {
    modal.classList.remove('modal-opened');
  }
}

function isModalVisible() {
  const modals = document.getElementsByClassName('modal');
  for (let modal of modals) {
    if (modal.classList.contains('modal-opened')) {
      return true;
    }
  }
  return false;
}

function findParentWithClassName(element, className) {
  while (element !== document && !element.classList.contains('modal')) {
    element = element.parentNode;
  }
  return element;
}

function isExpanded(exhibit) {
  return exhibit.parentNode.classList.contains('exhibit-open');
}

const FADE_IN_CLASSES = ['animated', 'fadeIn'];
const FADE_OUT_CLASSES = ['animated', 'fadeOut'];

const exhibits = document.getElementsByClassName('exhibit');
for (let exhibit of exhibits) {
  exhibit.addEventListener('mouseenter', () => {
    if (isExpanded(exhibit)) {
      return;
    };
    const readerInfo = exhibit.querySelector('.reader-info');
    const declarationInfo = exhibit.querySelector('.declaration-info');
    readerInfo.classList.remove(...FADE_IN_CLASSES);
    readerInfo.classList.add(...FADE_OUT_CLASSES);
    declarationInfo.classList.remove('hidden');
    declarationInfo.classList.remove(...FADE_OUT_CLASSES);
    declarationInfo.classList.add(...FADE_IN_CLASSES);
  });
  exhibit.addEventListener('mouseleave', () => {
    if (isExpanded(exhibit)) {
      return;
    };
    const readerInfo = exhibit.querySelector('.reader-info');
    const declarationInfo = exhibit.querySelector('.declaration-info');
    readerInfo.classList.remove(...FADE_OUT_CLASSES);
    readerInfo.classList.add(...FADE_IN_CLASSES);
    declarationInfo.classList.remove(...FADE_IN_CLASSES);
    declarationInfo.classList.add(...FADE_OUT_CLASSES);
  });
  exhibit.addEventListener('click', (evt) => {
    evt.stopPropagation();
    const exhibitSection = exhibit.parentNode;
    exhibitSection.classList.toggle('exhibit-open');
    const videoRow = exhibitSection.querySelector('.video-row');
    videoRow.classList.toggle('hidden');
  });
}

const modalOpeners = document.getElementsByClassName("modal-open");
for (let modalOpener of modalOpeners) {
  modalOpener.addEventListener('click', (evt) => {
    evt.stopPropagation();
    hideModals();
    const targetModalId = modalOpener.dataset.modalid;
    const modal = document.getElementById(targetModalId);
    modal.classList.add('modal-opened')
  });
}

const modalCloseBtns = document.getElementsByClassName("modal-close");
for (let closeBtn of modalCloseBtns) {
  closeBtn.addEventListener('click', (evt) => {
    evt.stopPropagation();
    const modal = findParentWithClassName(closeBtn, 'modal');
    modal.classList.remove('modal-opened');
  });
}

window.addEventListener('click', (evt) => {
  if (isModalVisible() && !isModalClick(evt)) {
    hideModals();
  }
});
