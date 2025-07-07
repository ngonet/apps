import React, { useEffect } from 'react';
import { useResolvedPath, useMatch, useLocation, matchPath, Link, NavLink } from 'react-router-dom';
import { slideToggle } from '../../composables/slideToggle.js';
import { slideUp } from '../../composables/slideUp.js';
import menus from '../../config/app-menu.jsx';

const NavItem = ({ menu, ...props }) => {
  const resolved = useResolvedPath(menu.path);
  const match = useMatch({ path: resolved.pathname });

  const location = useLocation();
  const match2 = matchPath({ path: menu.path, end: false }, location.pathname);

  const icon = menu.icon && (
    <div className="menu-icon">
      <i className={menu.icon} />
    </div>
  );
  const img = menu.img && (
    <div className="menu-icon-img">
      <img src={menu.img} alt="" />
    </div>
  );
  const caret = menu.children && !menu.badge && <div className="menu-caret" />;
  const label = menu.label && <span className="menu-label ms-5px">{menu.label}</span>;
  const badge = menu.badge && <div className="menu-badge">{menu.badge}</div>;
  const highlight = menu.highlight && <i className="fa fa-paper-plane text-theme" />;
  const title = menu.title && (
    <div className="menu-text">
      {menu.title} {label} {highlight}
    </div>
  );

  return (
    <div
      className={`menu-item${match || match2 ? ' active' : ''}${menu.children ? ' has-sub' : ''}`}
    >
      <NavLink className="menu-link" to={menu.path} {...props}>
        {img} {icon} {title}
        {caret} {badge}
      </NavLink>

      {menu.children && (
        <div className="menu-submenu">
          {menu.children.map((submenu, i) => (
            <NavItem key={i} menu={submenu} />
          ))}
        </div>
      )}
    </div>
  );
};

const TopMenuNav = () => {
  useEffect(() => {
    handlePageLoadMenuFocus();
    handleTopMenuSubMenu();
  });

  function handlePageLoadMenuFocus() {
    const targetMenu = document.querySelector('.app-top-menu .menu');
    if (!targetMenu) {
      return;
    }
    const bodyStyle = window.getComputedStyle(document.body);
    const viewWidth = document.querySelector('.app-top-menu').clientWidth - 128;
    let prevWidth = 0;
    let fullWidth = 0;

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

    if (prevWidth >= viewWidth) {
      const finalScrollWidth = prevWidth - viewWidth + 128;
      if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
        targetMenu.style.marginLeft = `-${finalScrollWidth}px`;
      } else {
        targetMenu.style.marginRight = `-${finalScrollWidth}px`;
      }
    }

    const elm = targetMenu.querySelector('.menu-control.menu-control-end');
    if (prevWidth !== fullWidth && fullWidth >= viewWidth) {
      elm.classList.add('show');
    } else {
      elm.classList.remove('show');
    }

    const elm2 = targetMenu.querySelector('.menu-control.menu-control-start');
    if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
      elm2.classList.add('show');
    } else {
      elm2.classList.remove('show');
    }
  }

  function handleMenuButtonAction(elm, direction) {
    const element = elm.target;
    const obj = element.closest('.menu');
    const objStyle = window.getComputedStyle(obj);
    const bodyStyle = window.getComputedStyle(document.querySelector('body'));
    const targetCss =
      bodyStyle.getPropertyValue('direction') === 'rtl' ? 'margin-right' : 'margin-left';
    const marginLeft = parseInt(objStyle.getPropertyValue(targetCss));
    const containerWidth = document.querySelector('.app-top-menu').clientWidth - 80;
    let totalWidth = 0;
    let finalScrollWidth = 0;

    const elms = [].slice.call(obj.querySelectorAll('.menu-item'));
    if (elms) {
      elms.map(function (elm) {
        if (!elm.classList.contains('menu-control')) {
          totalWidth += elm.clientWidth;
        }
        return true;
      });
    }

    switch (direction) {
      case 'next':
        var widthNextLeft = totalWidth + marginLeft - containerWidth;
        if (widthNextLeft <= containerWidth) {
          finalScrollWidth = widthNextLeft - marginLeft - 88;
          setTimeout(function () {
            obj.querySelector('.menu-control.menu-control-end').classList.remove('show');
          }, 300);
        } else {
          finalScrollWidth = containerWidth - marginLeft - 88;
        }

        if (finalScrollWidth !== 0) {
          obj.style.transitionProperty = 'height, margin, padding';
          obj.style.transitionDuration = '300ms';
          if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
            obj.style.marginLeft = `-${finalScrollWidth}px`;
          } else {
            obj.style.marginRight = `-${finalScrollWidth}px`;
          }
          setTimeout(function () {
            obj.style.transitionProperty = '';
            obj.style.transitionDuration = '';
            obj.querySelector('.menu-control.menu-control-start').classList.add('show');
          }, 300);
        }
        break;
      case 'prev':
        var widthPrevLeft = -marginLeft;

        if (widthPrevLeft <= containerWidth) {
          obj.querySelector('.menu-control.menu-control-start').classList.remove('show');
          finalScrollWidth = 0;
        } else {
          finalScrollWidth = widthPrevLeft - containerWidth + 88;
        }

        obj.style.transitionProperty = 'height, margin, padding';
        obj.style.transitionDuration = '300ms';

        if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
          obj.style.marginLeft = `-${finalScrollWidth}px`;
        } else {
          obj.style.marginRight = `-${finalScrollWidth}px`;
        }

        setTimeout(function () {
          obj.style.transitionProperty = '';
          obj.style.transitionDuration = '';
          obj.querySelector('.menu-control.menu-control-end').classList.add('show');
        }, 300);
        break;
      default:
        break;
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

    const menuLinkSelector = `${menuBaseSelector} > .menu-link`;
    const menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
    handleTopMenuToggle(menus, true);

    const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
    const submenusLvl1 = [].slice.call(
      document.querySelectorAll(`${submenuLvl1Selector} > .menu-link`)
    );
    handleTopMenuToggle(submenusLvl1);

    const submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
    const submenusLvl2 = [].slice.call(
      document.querySelectorAll(`${submenuLvl2Selector} > .menu-link`)
    );
    handleTopMenuToggle(submenusLvl2);

    window.addEventListener('resize', function () {
      const elms = [].slice.call(document.querySelectorAll('.app-top-menu .menu-submenu'));
      elms.map(function (elm) {
        elm.removeAttribute('style');
        return true;
      });
    });
  }

  function controlRight(e) {
    e.preventDefault();
    handleMenuButtonAction(e, 'next');
  }

  function controlLeft(e) {
    e.preventDefault();
    handleMenuButtonAction(e, 'prev');
  }

  return (
    <div id="app-top-menu" className="menu">
      {menus.map((menu, i) => (
        <NavItem key={i} menu={menu} />
      ))}
      <div className="menu-item menu-control menu-control-start">
        <Link className="menu-link" to="/" onClick={controlLeft}>
          <i className="fa fa-angle-left" />
        </Link>
      </div>
      <div className="menu-item menu-control menu-control-end">
        <Link className="menu-link" to="/" onClick={controlRight}>
          <i className="fa fa-angle-right" />
        </Link>
      </div>
    </div>
  );
};

export default TopMenuNav;
