import React, { useEffect, useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import { slideToggle } from '../../composables/slideToggle.js';
import { AppSettings } from '../../config/app-settings.js';
import SidebarMinifyBtn from './sidebar-minify-btn.jsx';
import SidebarNav from './sidebar-nav.jsx';
import SidebarProfile from './sidebar-profile.jsx';

const Sidebar = () => {
  const context = useContext(AppSettings);

  useEffect(() => {
    let appSidebarFloatSubmenuTimeout = '';
    let appSidebarFloatSubmenuDom = '';

    function handleGetHiddenMenuHeight(elm) {
      elm.setAttribute(
        'style',
        'position: absolute; visibility: hidden; display: block !important'
      );
      const targetHeight = elm.clientHeight;
      elm.removeAttribute('style');
      return targetHeight;
    }

    function handleSidebarMinifyFloatMenuClick() {
      const elms = [].slice.call(
        document.querySelectorAll('#app-sidebar-float-submenu .menu-item.has-sub > .menu-link')
      );
      if (elms) {
        elms.map(function (elm) {
          elm.onclick = function (e) {
            e.preventDefault();
            const targetItem = this.closest('.menu-item');
            const target = targetItem.querySelector('.menu-submenu');
            const targetStyle = getComputedStyle(target);
            const close = targetStyle.getPropertyValue('display') !== 'none';
            const expand = targetStyle.getPropertyValue('display') === 'none';

            slideToggle(target);

            const loopHeight = setInterval(function () {
              const targetMenu = document.querySelector('#app-sidebar-float-submenu');
              const targetMenuArrow = document.querySelector('#app-sidebar-float-submenu-arrow');
              const targetMenuLine = document.querySelector('#app-sidebar-float-submenu-line');
              const targetHeight = targetMenu.clientHeight;
              const targetOffset = targetMenu.getBoundingClientRect();
              const targetOriTop = targetMenu.getAttribute('data-offset-top');
              const targetMenuTop = targetMenu.getAttribute('data-menu-offset-top');
              let targetTop = targetOffset.top;
              const windowHeight = document.body.clientHeight;
              if (close) {
                if (targetTop > targetOriTop) {
                  targetTop = targetTop > targetOriTop ? targetOriTop : targetTop;
                  targetMenu.style.top = `${targetTop}px`;
                  targetMenu.style.bottom = 'auto';
                  targetMenuArrow.style.top = '20px';
                  targetMenuArrow.style.bottom = 'auto';
                  targetMenuLine.style.top = '20px';
                  targetMenuLine.style.bottom = 'auto';
                }
              }
              if (expand) {
                if (windowHeight - targetTop < targetHeight) {
                  const arrowBottom = windowHeight - targetMenuTop - 22;
                  targetMenu.style.top = 'auto';
                  targetMenu.style.bottom = 0;
                  targetMenuArrow.style.top = 'auto';
                  targetMenuArrow.style.bottom = `${arrowBottom}px`;
                  targetMenuLine.style.top = '20px';
                  targetMenuLine.style.bottom = `${arrowBottom}px`;
                }
                const floatSubmenuElm = document.querySelector(
                  '#app-sidebar-float-submenu .app-sidebar-float-submenu'
                );
                if (targetHeight > windowHeight) {
                  if (floatSubmenuElm) {
                    const splitClass = 'overflow-scroll mh-100vh'.split(' ');
                    for (let i = 0; i < splitClass.length; i++) {
                      floatSubmenuElm.classList.add(splitClass[i]);
                    }
                  }
                }
              }
            }, 1);
            setTimeout(function () {
              clearInterval(loopHeight);
            }, 250);
          };
          return true;
        });
      }
    }

    function handleSidebarMinifyFloatMenu() {
      const elms = [].slice.call(
        document.querySelectorAll('.app-sidebar .menu > .menu-item.has-sub > .menu-link')
      );
      if (elms) {
        elms.map(function (elm) {
          elm.onmouseenter = function () {
            const appElm = document.querySelector('.app');
            if (appElm && appElm.classList.contains('app-sidebar-minified')) {
              clearTimeout(appSidebarFloatSubmenuTimeout);
              const targetMenu = this.closest('.menu-item').querySelector('.menu-submenu');
              if (
                appSidebarFloatSubmenuDom === this &&
                document.querySelector('#app-sidebar-float-submenu')
              ) {
                return;
              }
              appSidebarFloatSubmenuDom = this;

              const targetMenuHtml = targetMenu.innerHTML;
              if (targetMenuHtml) {
                const bodyStyle = getComputedStyle(document.body);
                const sidebar = document.querySelector('#sidebar');
                const sidebarOffset = sidebar.getBoundingClientRect();
                const sidebarWidth = parseInt(sidebar.clientWidth);
                const sidebarX =
                  !appElm.classList.contains('app-sidebar-end') &&
                  bodyStyle.getPropertyValue('direction') !== 'rtl'
                    ? sidebarOffset.left + sidebarWidth
                    : document.body.clientWidth - sidebarOffset.left;
                const targetHeight = handleGetHiddenMenuHeight(targetMenu);
                const targetOffset = this.getBoundingClientRect();
                const targetTop = targetOffset.top;
                const targetLeft =
                  !appElm.classList.contains('app-sidebar-end') &&
                  bodyStyle.getPropertyValue('direction') !== 'rtl'
                    ? sidebarX
                    : 'auto';
                const targetRight =
                  !appElm.classList.contains('app-sidebar-end') &&
                  bodyStyle.getPropertyValue('direction') !== 'rtl'
                    ? 'auto'
                    : sidebarX;
                const darkMode = sidebar.getAttribute('data-bs-theme') === 'dark';
                const windowHeight = document.body.clientHeight;

                if (!document.querySelector('#app-sidebar-float-submenu')) {
                  let overflowClass = '';
                  if (targetHeight > windowHeight) {
                    overflowClass = 'overflow-scroll mh-100vh';
                  }
                  const html = document.createElement('div');
                  if (darkMode) {
                    html.setAttribute('data-bs-theme', 'dark');
                  }
                  html.setAttribute('id', 'app-sidebar-float-submenu');
                  html.setAttribute('class', 'app-sidebar-float-submenu-container');
                  html.setAttribute('data-offset-top', targetTop);
                  html.setAttribute('data-menu-offset-top', targetTop);
                  html.innerHTML =
                    `` +
                    `	<div class="app-sidebar-float-submenu-arrow" id="app-sidebar-float-submenu-arrow"></div>` +
                    `	<div class="app-sidebar-float-submenu-line" id="app-sidebar-float-submenu-line"></div>` +
                    `	<div class="app-sidebar-float-submenu ${overflowClass}">${
                      targetMenuHtml
                    }</div>`;
                  appElm.appendChild(html);

                  const elm = document.getElementById('app-sidebar-float-submenu');
                  elm.onmouseover = function () {
                    clearTimeout(appSidebarFloatSubmenuTimeout);
                  };
                  elm.onmouseout = function () {
                    appSidebarFloatSubmenuTimeout = setTimeout(() => {
                      document.querySelector('#app-sidebar-float-submenu').remove();
                    }, 250);
                  };
                } else {
                  const floatSubmenu = document.querySelector('#app-sidebar-float-submenu');
                  const floatSubmenuInnerElm = document.querySelector(
                    '#app-sidebar-float-submenu .app-sidebar-float-submenu'
                  );

                  if (targetHeight > windowHeight) {
                    if (floatSubmenuInnerElm) {
                      const splitClass = 'overflow-scroll mh-100vh'.split(' ');
                      for (let i = 0; i < splitClass.length; i++) {
                        floatSubmenuInnerElm.classList.add(splitClass[i]);
                      }
                    }
                  }
                  floatSubmenu.setAttribute('data-offset-top', targetTop);
                  floatSubmenu.setAttribute('data-menu-offset-top', targetTop);
                  floatSubmenuInnerElm.innerHTML = targetMenuHtml;
                }

                const targetSubmenuHeight = document.querySelector(
                  '#app-sidebar-float-submenu'
                ).clientHeight;
                const floatSubmenuElm = document.querySelector('#app-sidebar-float-submenu');
                const floatSubmenuArrowElm = document.querySelector(
                  '#app-sidebar-float-submenu-arrow'
                );
                const floatSubmenuLineElm = document.querySelector(
                  '#app-sidebar-float-submenu-line'
                );
                if (windowHeight - targetTop > targetSubmenuHeight) {
                  if (floatSubmenuElm) {
                    floatSubmenuElm.style.top = `${targetTop}px`;
                    floatSubmenuElm.style.left = `${targetLeft}px`;
                    floatSubmenuElm.style.bottom = 'auto';
                    floatSubmenuElm.style.right = `${targetRight}px`;
                  }
                  if (floatSubmenuArrowElm) {
                    floatSubmenuArrowElm.style.top = '20px';
                    floatSubmenuArrowElm.style.bottom = 'auto';
                  }
                  if (floatSubmenuLineElm) {
                    floatSubmenuLineElm.style.top = '20px';
                    floatSubmenuLineElm.style.bottom = 'auto';
                  }
                } else {
                  const arrowBottom = windowHeight - targetTop - 21;
                  if (floatSubmenuElm) {
                    floatSubmenuElm.style.top = 'auto';
                    floatSubmenuElm.style.left = `${targetLeft}px`;
                    floatSubmenuElm.style.bottom = 0;
                    floatSubmenuElm.style.right = `${targetRight}px`;
                  }
                  if (floatSubmenuArrowElm) {
                    floatSubmenuArrowElm.style.top = 'auto';
                    floatSubmenuArrowElm.style.bottom = `${arrowBottom}px`;
                  }
                  if (floatSubmenuLineElm) {
                    floatSubmenuLineElm.style.top = '20px';
                    floatSubmenuLineElm.style.bottom = `${arrowBottom}px`;
                  }
                }
                handleSidebarMinifyFloatMenuClick();
              } else {
                document.querySelector('#app-sidebar-float-submenu-line').remove();
                appSidebarFloatSubmenuDom = '';
              }
            }
          };
          elm.onmouseleave = function () {
            const elm = document.querySelector('.app');
            if (elm && elm.classList.contains('app-sidebar-minified')) {
              appSidebarFloatSubmenuTimeout = setTimeout(() => {
                const elm = document.querySelector('#app-sidebar-float-submenu-line');
                if (elm) {
                  elm.remove();
                }
                appSidebarFloatSubmenuDom = '';
              }, 250);
            }
          };
          return true;
        });
      }
    }

    handleSidebarMinifyFloatMenu();
  }, []);

  return (
    <AppSettings.Consumer>
      {({
        toggleAppSidebarMinify,
        toggleAppSidebarMobile,
        appSidebarTransparent,
        appSidebarGrid,
        appSidebarLight,
      }) => (
        <>
          <div
            id="sidebar"
            className={`app-sidebar ${
              appSidebarTransparent ? 'app-sidebar-transparent' : ''
            }${appSidebarGrid ? 'app-sidebar-grid' : ''}`}
            data-bs-theme={appSidebarLight ? '' : 'dark'}
          >
            <PerfectScrollbar className="app-sidebar-content" options={{ suppressScrollX: true }}>
              {!context.appSidebarSearch && <SidebarProfile />}
              <SidebarNav />
              <SidebarMinifyBtn />
            </PerfectScrollbar>
          </div>
          <div className="app-sidebar-bg" data-bs-theme={appSidebarLight ? '' : 'dark'} />
          <div className="app-sidebar-mobile-backdrop">
            <Link to="/" onClick={toggleAppSidebarMobile} className="stretched-link" />
          </div>
        </>
      )}
    </AppSettings.Consumer>
  );
};

export default Sidebar;
