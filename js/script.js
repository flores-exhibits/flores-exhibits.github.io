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
    modal.style.display = 'none';
  }
}

function isModalVisible() {
  const modals = document.getElementsByClassName('modal');
  for (let modal of modals) {
    if (modal.style.display == 'block') {
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


const exhibits = document.getElementsByClassName('exhibit');
for (let exhibit of exhibits) {
  exhibit.addEventListener('mouseenter', () => {
    const readerInfo = exhibit.querySelector('.reader-info');
    const declarationInfo = exhibit.querySelector('.declaration-info');
    readerInfo.style.display = 'none';
    declarationInfo.style.display = 'block';
  });
  exhibit.addEventListener('mouseleave', () => {
    const readerInfo = exhibit.querySelector('.reader-info');
    const declarationInfo = exhibit.querySelector('.declaration-info');
    readerInfo.style.display = 'block';
    declarationInfo.style.display = 'none';
  });
}

const modalOpeners = document.getElementsByClassName("modal-open");
for (let modalOpener of modalOpeners) {
  modalOpener.addEventListener('click', (evt) => {
    evt.stopPropagation();
    hideModals();
    const targetModalId = modalOpener.dataset.modalid;
    const modal = document.getElementById(targetModalId);
    modal.style.display = 'block';
  });
}

const modalCloseBtns = document.getElementsByClassName("modal-close");
for (let closeBtn of modalCloseBtns) {
  closeBtn.addEventListener('click', (evt) => {
    evt.stopPropagation();
    const modal = findParentWithClassName(closeBtn, 'modal');
    modal.style.display = 'none';
  });
}

window.addEventListener('click', (evt) => {
  if (isModalVisible() && !isModalClick(evt)) {
    hideModals();
  }
});
