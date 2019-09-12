function isModalClick(evt) {
  return eventHasTargetClass(evt, 'modal-content');
}

function isMenuTap(evt) {
  return eventHasTargetClass(evt, 'dropdown-menu-container');
}

function isMenuIconTap(evt) {
  return eventHasTargetClass(evt, 'menu-icon-container');
}

function eventHasTargetClass(evt, className) {
  let target = evt.target;
  while (target != document) {
    if (target.classList.contains(className)) {
      return true;
    }
    target = target.parentNode;
  }
  return false;
}

function hideModals() {
  removeClassName('modal', 'modal-opened', 'modal-border');
  removeClassName('modal-open-text', 'selected');
}

function removeClassName(selectorClass, className, classNameAfterAnimation) {
  const modals = document.getElementsByClassName(selectorClass);
  for (let modal of modals) {
    if (!modal.classList.contains(className)) {
      continue;
    }
    modal.classList.remove(className);
    if (classNameAfterAnimation) {
      let removedClassName = false;
      modal.addEventListener('transitionend', () => {
        if (removedClassName) {
          return;
        }
        removedClassName = true;
        modal.classList.remove(classNameAfterAnimation);
      });
    }
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

function fadeElements(elToShow, elToHide) {
  elToHide.classList.remove(...FADE_IN_CLASSES);
  elToHide.classList.add(...FADE_OUT_CLASSES);
  elToShow.classList.remove('hidden');
  elToShow.classList.remove(...FADE_OUT_CLASSES);
  elToShow.classList.add(...FADE_IN_CLASSES);
}

function hideAllExhibits() {
  const exhibits = document.getElementsByClassName('exhibit-open');
  for (let exhibit of exhibits) {
    exhibit.classList.remove('exhibit-open');
  }
}

function setExhibitListeners() {
  const exhibits = document.getElementsByClassName('exhibit');
  for (let exhibit of exhibits) {
    exhibit.addEventListener('mouseenter', () => {
      if (isExpanded(exhibit)) {
        return;
      };
      const readerInfo = exhibit.querySelector('.reader-info');
      const declarationInfo = exhibit.querySelector('.declaration-info');
      fadeElements(declarationInfo, readerInfo);
    });
    exhibit.addEventListener('mouseleave', () => {
      if (isExpanded(exhibit)) {
        return;
      };
      const readerInfo = exhibit.querySelector('.reader-info');
      const declarationInfo = exhibit.querySelector('.declaration-info');
      fadeElements(readerInfo, declarationInfo);
    });
    exhibit.addEventListener('click', (evt) => {
      const exhibitSection = exhibit.parentNode;
      if (exhibitSection.classList.contains('exhibit-open')) {
        hideAllExhibits();
      } else {
        hideAllExhibits();
        exhibitSection.classList.add('exhibit-open');
      }

      const readerInfo = exhibit.querySelector('.reader-info');
      const declarationInfo = exhibit.querySelector('.declaration-info');
      fadeElements(readerInfo, declarationInfo);
    });
  }
}

function isMobile() {
  return window.innerWidth <= 480;
}

function openModal(evt, modalOpener) {
  hideModals();
  const modalOpenerText = modalOpener.querySelector('.modal-open-text');
  if (modalOpenerText) {
    modalOpenerText.classList.add('selected');
  }
  const targetModalId = modalOpener.dataset.modalid;
  const modal = document.getElementById(targetModalId);
  if (isMobile()) {
    modal.style.top = `${window.pageYOffset - 2}px`;
  }
  modal.classList.add('modal-opened');
  modal.classList.add('modal-border');
}


function setModalOpenListeners() {
  const modalOpeners = document.getElementsByClassName("modal-open");
  for (let modalOpener of modalOpeners) {
    modalOpener.addEventListener('click', (evt) => {
      evt.stopPropagation();
      openModal(evt, modalOpener);
      hideMenu();
    });
  }
}

function setModalCloseListeners() {
  const modalCloseBtns = document.getElementsByClassName("modal-close");
  for (let closeBtn of modalCloseBtns) {
    closeBtn.addEventListener('click', (evt) => {
      evt.stopPropagation();
      hideModals();
    });
  }

  window.addEventListener('click', (evt) => {
    if (isModalVisible() && !isModalClick(evt)) {
      hideModals();
    }
  });
}

function isMenuOpen() {
  const dropdownMenu = document.getElementsByClassName('dropdown-menu-container')[0];
  return dropdownMenu.classList.contains('dropdown-menu-container-open');
}

function hideMenu() {
  document.querySelector('.menu-icon').classList.remove('rotated');
  removeClassName(
    'dropdown-menu-container',
    'dropdown-menu-container-open',
    'dropdown-menu-container-border'
  );
}

function setMenuIconListener() {
  const menuIconContainer = document.getElementsByClassName('menu-icon-container')[0];
  const dropdownMenu = document.getElementsByClassName('dropdown-menu-container')[0];
  menuIconContainer.addEventListener('touchstart', () => {
    if (isMenuOpen()) {
      hideMenu();
    } else {
      dropdownMenu.classList.add('dropdown-menu-container-border');
      dropdownMenu.classList.add('dropdown-menu-container-open');
      menuIconContainer.querySelector('img').classList.add('rotated');
    }
  });
}

function setMenuCloseListener() {
  window.addEventListener('click', (evt) => {
    if (isMenuOpen() && !isMenuTap(evt) && !isMenuIconTap(evt)) {
      hideMenu();
    }

    if (isModalVisible() && !isModalClick(evt)) {
      hideModals();
    }
  });
}

setExhibitListeners();
setModalOpenListeners();
setModalCloseListeners();
setMenuIconListener();
setMenuCloseListener();
