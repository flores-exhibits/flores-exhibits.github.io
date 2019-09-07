const modalOpeners = document.getElementsByClassName("modal-open");
for (let modalOpener of modalOpeners) {
  modalOpener.addEventListener('click', (evt) => {
    evt.stopPropagation();
    const targetModalId = modalOpener.dataset.modalid;
    const modal = document.getElementById(targetModalId);
    modal.style.display = 'block';
  });
}

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

const modalCloseBtns = document.getElementsByClassName("modal-close");
for (let closeBtn of modalCloseBtns) {
  closeBtn.addEventListener('click', (evt) => {
    evt.stopPropagation();
    let parent = closeBtn.parentNode;
    while (!parent.classList.contains('modal')) {
      parent = parent.parentNode;
    }
    parent.style.display = 'none';
  });
}

window.addEventListener('click', (evt) => {
  if (isModalVisible() && !isModalClick(evt)) {
    hideModals();
  }
});
