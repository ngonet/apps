import React, { useEffect, useContext } from 'react';
import { useResolvedPath, useMatch, NavLink, useLocation, matchPath } from 'react-router-dom';
import { slideToggle } from '../../composables/slideToggle.js';
import { slideUp } from '../../composables/slideUp.js';
import menus from '../../config/app-menu.jsx';
import { AppSettings } from '../../config/app-settings.js';

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

  useEffect(() => {
    const handleClick = function (e) {
      e.preventDefault();
      const target = this.nextElementSibling;

      // Only close siblings at the same level
      const parentMenu = this.closest('.menu-submenu') || this.closest('.menu');
      const siblingMenus = parentMenu ? Array.from(parentMenu.children) : [];

      siblingMenus.forEach((menu) => {
        const otherTarget = menu.querySelector('.menu-submenu');
        if (otherTarget && otherTarget !== target) {
          slideUp(otherTarget, expandTime);

          const otherTargetMenuItem = otherTarget.closest('.menu-item');
          if (otherTargetMenuItem && otherTargetMenuItem.classList) {
            otherTargetMenuItem.classList.remove('expand');
            otherTargetMenuItem.classList.add('closed');
          }
        }
      });

      const targetItemElm = target?.closest('.menu-item');
      if (targetItemElm && targetItemElm.classList) {
        if (
          targetItemElm.classList.contains('expand') ||
          (targetItemElm.classList.contains('active') && !target.style.display)
        ) {
          targetItemElm.classList.remove('expand');
          targetItemElm.classList.add('closed');
          slideToggle(target, expandTime);
        } else {
          targetItemElm.classList.add('expand');
          targetItemElm.classList.remove('closed');
          slideToggle(target, expandTime);
        }
      }
    };

    const handleSidebarMenuToggle = (menus, expandTime) => {
      menus.forEach((menu) => {
        menu.removeEventListener('click', handleClick); // Ensure old listeners are removed
        menu.addEventListener('click', handleClick);
      });
    };

    // Get sidebar expand time
    const targetSidebar = document.querySelector('.app-sidebar:not(.app-sidebar-end)');
    const expandTime = targetSidebar?.getAttribute('data-disable-slide-animation') ? 0 : 300;

    const menuBaseSelector = '.app-sidebar .menu > .menu-item.has-sub';
    const submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';

    // Select menu items
    const menus = Array.from(document.querySelectorAll(`${menuBaseSelector} > .menu-link`));
    const submenusLvl1 = Array.from(
      document.querySelectorAll(`${menuBaseSelector + submenuBaseSelector} > .menu-link`)
    );
    const submenusLvl2 = Array.from(
      document.querySelectorAll(
        `${menuBaseSelector + submenuBaseSelector + submenuBaseSelector} > .menu-link`
      )
    );

    handleSidebarMenuToggle([...menus, ...submenusLvl1, ...submenusLvl2], expandTime);

    return () => {
      [...menus, ...submenusLvl1, ...submenusLvl2].forEach((menu) => {
        menu.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <div
      className={`menu-item${match || match2 ? ' active' : ''}${menu.children ? ' has-sub' : ''}`}
    >
      {!menu.children && (
        <NavLink className="menu-link" to={menu.path} {...props}>
          {img} {icon} {title}
          {caret} {badge}
        </NavLink>
      )}
      {menu.children && (
        <a href="#/" className="menu-link">
          {img} {icon} {title}
          {caret} {badge}
        </a>
      )}

      {menu.children && (
        <div className="menu-submenu" style={{ display: match || match2 ? ' block' : '' }}>
          {menu.children.map((submenu, i) => (
            <NavItem key={i} menu={submenu} />
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarNav = () => {
  const context = useContext(AppSettings);

  function handleSidebarSearch(e) {
    let targetValue = e.target.value;
    targetValue = targetValue.toLowerCase();

    if (targetValue) {
      const elms = [].slice.call(
        document.querySelectorAll(
          '.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search), .app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item'
        )
      );
      if (elms) {
        elms.map(function (elm) {
          elm.classList.add('d-none');
          return true;
        });
      }
      const elms2 = [].slice.call(
        document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .has-text')
      );
      if (elms2) {
        elms2.map(function (elm) {
          elm.classList.remove('has-text');
          return true;
        });
      }
      const elms3 = [].slice.call(
        document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .expand')
      );
      if (elms3) {
        elms3.map(function (elm) {
          elm.classList.remove('expand');
          return true;
        });
      }
      const elms4 = [].slice.call(
        document.querySelectorAll(
          '.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search) > .menu-link, .app-sidebar .menu-submenu > .menu-item > .menu-link'
        )
      );
      if (elms4) {
        elms4.map(function (elm) {
          let targetText = elm.textContent;
          targetText = targetText.toLowerCase();
          if (targetText.search(targetValue) > -1) {
            const targetElm = elm.closest('.menu-item');
            if (targetElm) {
              targetElm.classList.remove('d-none');
              targetElm.classList.add('has-text');
            }

            const targetElm2 = elm.closest('.menu-item.has-sub');
            if (targetElm2) {
              const targetElm3 = targetElm.querySelector('.menu-submenu .menu-item.d-none');
              if (targetElm3) {
                targetElm3.classList.remove('d-none');
              }
            }

            const targetElm4 = elm.closest('.menu-submenu');
            if (targetElm4) {
              targetElm4.style.display = 'block';

              const targetElm5 = targetElm.querySelector('.menu-item:not(.has-text)');
              if (targetElm5) {
                targetElm5.classList.add('d-none');
              }

              const targetElm6 = elm.closest('.has-sub:not(.has-text)');
              if (targetElm6) {
                targetElm6.classList.remove('d-none');
                targetElm6.classList.add('expand');

                const targetElm7 = targetElm.closest('.has-sub:not(.has-text)');
                if (targetElm7) {
                  targetElm7.classList.remove('d-none');
                  targetElm7.classList.add('expand');
                }
              }
            }
          }
          return true;
        });
      }
    } else {
      const elms5 = [].slice.call(
        document.querySelectorAll(
          '.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search).has-sub .menu-submenu'
        )
      );
      if (elms5) {
        elms5.map(function (elm) {
          elm.removeAttribute('style');
          return true;
        });
      }

      const elms6 = [].slice.call(
        document.querySelectorAll(
          '.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search)'
        )
      );
      if (elms6) {
        elms6.map(function (elm) {
          elm.classList.remove('d-none');
          return true;
        });
      }

      const elms7 = [].slice.call(
        document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item')
      );
      if (elms7) {
        elms7.map(function (elm) {
          elm.classList.remove('d-none');
          return true;
        });
      }

      const elms8 = [].slice.call(
        document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .expand')
      );
      if (elms8) {
        elms8.map(function (elm) {
          elm.classList.remove('expand');
          return true;
        });
      }
    }
  }

  return (
    <div className="menu">
      {context.appSidebarSearch && (
        <div className="menu-search mb-n3">
          <input
            type="text"
            className="form-control"
            placeholder="Sidebar menu filter..."
            onKeyUp={handleSidebarSearch}
          />
        </div>
      )}
      <div className="menu-header">Navigation</div>
      {menus.map((menu, i) => (
        <NavItem key={i} menu={menu} />
      ))}
    </div>
  );
};

export default SidebarNav;
