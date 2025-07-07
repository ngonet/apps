import { Link } from 'react-router-dom';
import { AppSettings } from '../../config/app-settings.js';
import DropdownLanguage from './dropdown/language.jsx';
import DropdownMegaMenu from './dropdown/mega.jsx';
import DropdownNotification from './dropdown/notification.jsx';
import DropdownProfile from './dropdown/profile.jsx';
import SearchForm from './search/form.jsx';

const Header = () => {
  return (
    <AppSettings.Consumer>
      {({
        toggleAppSidebarMobile,
        toggleAppSidebarEnd,
        toggleAppSidebarEndMobile,
        toggleAppTopMenuMobile,
        appHeaderLanguageBar,
        appHeaderMegaMenu,
        appHeaderInverse,
        appSidebarTwo,
        appTopMenu,
        appSidebarNone,
      }) => (
        <div id="header" className="app-header" data-bs-theme={appHeaderInverse ? 'dark' : ''}>
          <div className="navbar-header">
            {appSidebarTwo && (
              <button
                type="button"
                className="navbar-mobile-toggler"
                onClick={toggleAppSidebarEndMobile}
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            )}
            <Link to="/" className="navbar-brand">
              <span className="navbar-logo" /> <b>School</b> Tech
            </Link>

            {appHeaderMegaMenu && (
              <button
                type="button"
                className="navbar-mobile-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#top-navbar"
              >
                <span className="fa-stack fa-lg text-inverse">
                  <i className="far fa-square fa-stack-2x" />
                  <i className="fa fa-cog fa-stack-1x" />
                </span>
              </button>
            )}
            {appTopMenu && !appSidebarNone && (
              <button
                type="button"
                className="navbar-mobile-toggler"
                onClick={toggleAppTopMenuMobile}
              >
                <span className="fa-stack fa-lg text-inverse">
                  <i className="far fa-square fa-stack-2x" />
                  <i className="fa fa-cog fa-stack-1x" />
                </span>
              </button>
            )}
            {appSidebarNone && appTopMenu && (
              <button
                type="button"
                className="navbar-mobile-toggler"
                onClick={toggleAppTopMenuMobile}
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            )}
            {!appSidebarNone && (
              <button
                type="button"
                className="navbar-mobile-toggler"
                onClick={toggleAppSidebarMobile}
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            )}
          </div>

          {appHeaderMegaMenu && <DropdownMegaMenu />}

          <div className="navbar-nav">
            <SearchForm />
            <DropdownNotification />

            {appHeaderLanguageBar && <DropdownLanguage />}

            <DropdownProfile />

            {appSidebarTwo && <div className="navbar-divider d-none d-md-block" />}

            {appSidebarTwo && (
              <div className="navbar-item d-none d-md-block">
                <Link to="/" onClick={toggleAppSidebarEnd} className="navbar-link icon">
                  <i className="fa fa-th" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </AppSettings.Consumer>
  );
};

export default Header;
