import React, { useEffect } from 'react';
import { slideToggle } from '../../composables/slideToggle.js';
import { slideUp } from '../../composables/slideUp.js';
import TopMenuNav from './top-menu-nav.jsx';

function handleUnlimitedTopMenuRender() {
  // handle page load active menu focus
  function handlePageLoadMenuFocus() {
    const targetMenu = document.querySelector('.app-top-menu .menu');
    if (!targetMenu) {
      return;
    }
    const bodyStyle = window.getComputedStyle(document.body);
    const viewWidth = document.querySelector('.app-top-menu').clientWidth;
    let prevWidth = 0;
    let fullWidth = 0;
    const controlPrevObj = targetMenu.querySelector('.menu-control-start');
    const controlNextObj = targetMenu.querySelector('.menu-control-end');
    const controlNextWidth = controlPrevObj ? controlNextObj.clientWidth : 0;
    let controlWidth = 0;

    const elms = [].slice.call(document.querySelectorAll('.app-top-menu .menu > .menu-item'));
    if (elms) {
      let found = false;
      elms.map(function (elm) {
        if (!elm.classList.contains('menu-control')) {
          fullWidth += elm.clientWidth;
          if (!found) {
            prevWidth += elm.clientWidth;
          }
          if (elm.classList.contains('active')) {
            found = true;
          }
        }
        return true;
      });
    }

    const elm = targetMenu.querySelector('.menu-control.menu-control-end');
    if (prevWidth !== fullWidth && fullWidth >= viewWidth) {
      elm.classList.add('show');
      controlWidth += controlNextWidth;
    } else {
      elm.classList.remove('show');
    }

    const elm2 = targetMenu.querySelector('.menu-control.menu-control-start');
    if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
      elm2.classList.add('show');
    } else {
      elm2.classList.remove('show');
    }

    if (prevWidth >= viewWidth) {
      const finalScrollWidth = prevWidth - viewWidth + controlWidth;
      if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
        targetMenu.style.marginLeft = `-${finalScrollWidth}px`;
      } else {
        targetMenu.style.marginRight = `-${finalScrollWidth}px`;
      }
    }
  }

  function enableFluidContainerDrag(containerClassName) {
    const container = document.querySelector(containerClassName);
    if (!container) {
      return;
    }
    const menu = container.querySelector('.menu');
    const menuItem = menu.querySelectorAll('.menu-item:not(.menu-control)');

    let startX;
    let scrollLeft;
    let mouseDown;
    let menuWidth = 0;
    let maxScroll = 0;

    menuItem.forEach((element) => {
      menuWidth += element.offsetWidth;
    });

    container.addEventListener('mousedown', (e) => {
      mouseDown = true;
      startX = e.pageX;
      scrollLeft = menu.style.marginLeft ? parseInt(menu.style.marginLeft) : 0;
      maxScroll = container.offsetWidth - menuWidth;
    });

    container.addEventListener('touchstart', (e) => {
      mouseDown = true;
      const touch = e.targetTouches[0];
      startX = touch.pageX;
      scrollLeft = menu.style.marginLeft ? parseInt(menu.style.marginLeft) : 0;
      maxScroll = container.offsetWidth - menuWidth;
    });

    container.addEventListener('mouseup', () => {
      mouseDown = false;
    });

    container.addEventListener('touchend', () => {
      mouseDown = false;
    });

    container.addEventListener('mousemove', (e) => {
      if (!startX || !mouseDown) return;
      if (window.innerWidth < 768) return;
      e.preventDefault();
      const x = e.pageX;
      const walkX = (x - startX) * 1;
      let totalMarginLeft = scrollLeft + walkX;
      if (totalMarginLeft <= maxScroll) {
        totalMarginLeft = maxScroll;
        menu.querySelector('.menu-control.menu-control-end').classList.remove('show');
      } else {
        menu.querySelector('.menu-control.menu-control-end').classList.add('show');
      }
      if (menuWidth < container.offsetWidth) {
        menu.querySelector('.menu-control.menu-control-start').classList.remove('show');
      }
      if (maxScroll > 0) {
        menu.querySelector('.menu-control.menu-control-end').classList.remove('show');
      }
      if (totalMarginLeft > 0) {
        totalMarginLeft = 0;
        menu.querySelector('.menu-control.menu-control-start').classList.remove('show');
      } else {
        menu.querySelector('.menu-control.menu-control-start').classList.add('show');
      }
      menu.style.marginLeft = `${totalMarginLeft}px`;
    });

    container.addEventListener('touchmove', (e) => {
      if (!startX || !mouseDown) return;
      if (window.innerWidth < 768) return;
      e.preventDefault();
      const touch = e.targetTouches[0];
      const x = touch.pageX;
      const walkX = (x - startX) * 1;
      let totalMarginLeft = scrollLeft + walkX;
      if (totalMarginLeft <= maxScroll) {
        totalMarginLeft = maxScroll;
        menu.querySelector('.menu-control.menu-control-end').classList.remove('show');
      } else {
        menu.querySelector('.menu-control.menu-control-end').classList.add('show');
      }
      if (menuWidth < container.offsetWidth) {
        menu.querySelector('.menu-control.menu-control-start').classList.remove('show');
      }
      if (maxScroll > 0) {
        menu.querySelector('.menu-control.menu-control-end').classList.remove('show');
      }
      if (totalMarginLeft > 0) {
        totalMarginLeft = 0;
        menu.querySelector('.menu-control.menu-control-start').classList.remove('show');
      } else {
        menu.querySelector('.menu-control.menu-control-start').classList.add('show');
      }
      menu.style.marginLeft = `${totalMarginLeft}px`;
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      const targetElm = document.querySelector('.app-top-menu');
      if (targetElm) {
        targetElm.removeAttribute('style');
      }
      const targetElm2 = document.querySelector('.app-top-menu .menu');
      if (targetElm2) {
        targetElm2.removeAttribute('style');
      }
      const targetElm3 = document.querySelectorAll('.app-top-menu .menu-submenu');
      if (targetElm3) {
        targetElm3.forEach((elm3) => {
          elm3.removeAttribute('style');
        });
      }
      handlePageLoadMenuFocus();
    }
    enableFluidContainerDrag('.app-top-menu');
  });

  if (window.innerWidth >= 768) {
    handlePageLoadMenuFocus();
    enableFluidContainerDrag('.app-top-menu');
  }
}

function handleTopMenuToggle(menus, forMobile = false) {
  menus.map(function (menu) {
    menu.onclick = function (e) {
      e.preventDefault();

      if (!forMobile || (forMobile && document.body.clientWidth < 768)) {
        const target = this.nextElementSibling;
        menus.map(function (m) {
          const otherTarget = m.nextElementSibling;
          if (otherTarget !== target) {
            slideUp(otherTarget);
            otherTarget.closest('.menu-item').classList.remove('expand');
            otherTarget.closest('.menu-item').classList.add('closed');
          }
          return true;
        });

        slideToggle(target);
      }
    };
    return true;
  });
}

function handleTopMenuSubMenu() {
  const menuBaseSelector = '.app-top-menu .menu > .menu-item.has-sub';
  const submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';

  // 14.1 Menu - Toggle / Collapse
  const menuLinkSelector = `${menuBaseSelector} > .menu-link`;
  const menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
  handleTopMenuToggle(menus, true);

  // 14.2 Menu - Submenu lvl 1
  const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
  const submenusLvl1 = [].slice.call(
    document.querySelectorAll(`${submenuLvl1Selector} > .menu-link`)
  );
  handleTopMenuToggle(submenusLvl1);

  // 14.3 submenu lvl 2
  const submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
  const submenusLvl2 = [].slice.call(
    document.querySelectorAll(`${submenuLvl2Selector} > .menu-link`)
  );
  handleTopMenuToggle(submenusLvl2);
}

const TopMenu = () => {
  useEffect(() => {
    handleUnlimitedTopMenuRender();
    handleTopMenuSubMenu();
  });

  return (
    <div id="top-nav" className="app-top-menu" data-bs-theme="dark">
      <TopMenuNav />
    </div>
  );
};

export default TopMenu;
