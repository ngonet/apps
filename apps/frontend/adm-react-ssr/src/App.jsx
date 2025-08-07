import { useEffect, useState, useMemo, useCallback } from 'react';
import Store from 'react-notifications-component';
import Content from './components/content/content';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import SidebarRight from './components/sidebar-right/sidebar-right';
// import ThemePanel from './components/theme-panel/theme-panel';
import TopMenu from './components/top-menu/top-menu';
import { slideToggle } from './composables/slideToggle';
import { AppSettings } from './config/app-settings';

const App = () => {
  const [appTheme] = useState('');
  const [appClass, setAppClass] = useState('');
  const [appDarkMode, setAppDarkMode] = useState(false);
  const [appGradientEnabled, setAppGradientEnabled] = useState(false);
  const [appHeaderNone, setAppHeaderNone] = useState(false);
  const [appHeaderFixed, setAppHeaderFixed] = useState(true);
  const [appHeaderInverse, setAppHeaderInverse] = useState(false);
  const [appHeaderMegaMenu, setAppHeaderMegaMenu] = useState(false);
  const [appHeaderLanguageBar, setAppHeaderLanguageBar] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const [appSidebarNone, setAppSidebarNone] = useState(false);
  const [appSidebarWide, setAppSidebarWide] = useState(false);
  const [appSidebarLight, setAppSidebarLight] = useState(false);
  const [appSidebarMinify, setAppSidebarMinify] = useState(false);
  const [appSidebarMobileToggled, setAppSidebarMobileToggled] = useState(false);
  const [appSidebarTransparent, setAppSidebarTransparent] = useState(false);
  const [appSidebarSearch, setAppSidebarSearch] = useState(false);
  const [appSidebarFixed, setAppSidebarFixed] = useState(true);
  const [appSidebarGrid, setAppSidebarGrid] = useState(false);
  const [appContentNone, setAppContentNone] = useState(false);
  const [appContentClass, setAppContentClass] = useState('');
  const [appContentFullHeight, setAppContentFullHeight] = useState(false);
  const [appTopMenu, setAppTopMenu] = useState(false);
  const [appTopMenuMobileToggled, setAppTopMenuMobileToggled] = useState(false);
  const [appSidebarTwo, setAppSidebarTwo] = useState(false);
  const [appSidebarEnd, setAppSidebarEnd] = useState(false);
  const [appSidebarEndToggled, setAppSidebarEndToggled] = useState(false);
  const [appSidebarEndMobileToggled, setAppSidebarEndMobileToggled] = useState(false);

  const handleSetAppClass = useCallback((value) => {
    setAppClass(value);
  }, []);

  const handleSetAppHeaderNone = useCallback((value) => {
    setAppHeaderNone(value);
  }, []);

  const handleSetAppHeaderInverse = useCallback((value) => {
    setAppHeaderInverse(value);
  }, []);

  const handleSetAppHeaderLanguageBar = useCallback((value) => {
    setAppHeaderLanguageBar(value);
  }, []);

  const handleSetAppHeaderMegaMenu = useCallback((value) => {
    setAppHeaderMegaMenu(value);
  }, []);

  const handleSetAppHeaderFixed = useCallback(
    (value) => {
      if (value === false && appSidebarFixed) {
        Store.addNotification({
          title: 'Warning',
          message:
            'Default Header with Fixed Sidebar option is not supported. ' +
            'Proceeding with Default Header with Default Sidebar.',
          type: 'warning',
          container: 'top-right',
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        setAppSidebarFixed(false);
        if (localStorage) {
          localStorage.appSidebarFixed = false;
        }
      }
      setAppHeaderFixed(value);
      if (localStorage) {
        localStorage.appHeaderFixed = value;
      }
    },
    [appSidebarFixed]
  );

  const handleSetAppSidebarNone = useCallback((value) => {
    setAppSidebarNone(value);
  }, []);

  const handleSetAppSidebarWide = useCallback((value) => {
    setAppSidebarWide(value);
  }, []);

  const handleSetAppSidebarLight = useCallback((value) => {
    setAppSidebarLight(value);
  }, []);

  const handleSetAppSidebarMinified = useCallback((value) => {
    setAppSidebarMinify(value);
  }, []);

  const handleSetAppSidebarTransparent = useCallback((value) => {
    setAppSidebarTransparent(value);
  }, []);

  const handleSetAppSidebarSearch = useCallback((value) => {
    setAppSidebarSearch(value);
  }, []);

  const handleSetAppSidebarFixed = useCallback(
    (value) => {
      if (value === true && !appHeaderFixed) {
        Store.addNotification({
          title: 'Warning',
          message:
            'Default Header with Fixed Sidebar option is not supported. ' +
            'Proceeding with Fixed Header with Fixed Sidebar.',
          type: 'warning',
          container: 'top-right',
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
        setAppHeaderFixed(true);
        if (localStorage) {
          localStorage.appHeaderFixed = true;
        }
      }
      setAppSidebarFixed(value);
      if (localStorage) {
        localStorage.appSidebarFixed = value;
      }
    },
    [appHeaderFixed]
  );

  const handleSetAppSidebarGrid = useCallback((value) => {
    setAppSidebarGrid(value);
    if (localStorage) {
      localStorage.appSidebarGrid = value;
    }
  }, []);

  const toggleAppSidebarMinify = useCallback(() => {
    setAppSidebarMinify(!appSidebarMinify);
  }, [appSidebarMinify]);

  const toggleAppSidebarMobile = useCallback(() => {
    setAppSidebarMobileToggled(!appSidebarMobileToggled);
  }, [appSidebarMobileToggled]);

  const handleSetAppContentNone = useCallback((value) => {
    setAppContentNone(value);
  }, []);

  const handleSetAppContentClass = useCallback((value) => {
    setAppContentClass(value);
  }, []);

  const handleSetAppContentFullHeight = useCallback((value) => {
    setAppContentFullHeight(value);
  }, []);

  const handleSetAppTopMenu = useCallback((value) => {
    setAppTopMenu(value);
  }, []);

  const toggleAppTopMenuMobile = useCallback(() => {
    slideToggle(document.querySelector('.app-top-menu'));
    setAppTopMenuMobileToggled(!appTopMenuMobileToggled);
  }, [appTopMenuMobileToggled]);

  const handleSetAppSidebarTwo = useCallback((value) => {
    setAppSidebarTwo(value);
    setAppSidebarEndToggled(value);
  }, []);

  const handleSetAppBoxedLayout = useCallback((value) => {
    if (value === true) {
      document.body.classList.add('boxed-layout');
    } else {
      document.body.classList.remove('boxed-layout');
    }
  }, []);

  const handleSetAppDarkMode = useCallback((value) => {
    if (value === true) {
      document.querySelector('html').setAttribute('data-bs-theme', 'dark');
    } else {
      document.querySelector('html').removeAttribute('data-bs-theme');
    }
    setAppDarkMode(value);
    if (localStorage) {
      localStorage.appDarkMode = value;
    }
    document.dispatchEvent(new Event('theme-reload'));
  }, []);

  const handleSetAppGradientEnabled = useCallback((value) => {
    setAppGradientEnabled(value);
    if (localStorage) {
      localStorage.appGradientEnabled = value;
    }
  }, []);

  const handleSetAppTheme = useCallback((value) => {
    const newTheme = `theme-${value}`;
    for (let x = 0; x < document.body.classList.length; x++) {
      if (
        document.body.classList[x].indexOf('theme-') > -1 &&
        document.body.classList[x] !== newTheme
      ) {
        document.body.classList.remove(document.body.classList[x]);
      }
    }
    document.body.classList.add(newTheme);
    if (localStorage && value) {
      localStorage.appTheme = value;
    }
    document.dispatchEvent(new Event('theme-reload'));
  }, []);

  const toggleAppSidebarEnd = useCallback(() => {
    setAppSidebarEndToggled(!appSidebarEndToggled);
  }, [appSidebarEndToggled]);

  const toggleAppSidebarEndMobile = useCallback(() => {
    setAppSidebarEndMobileToggled(!appSidebarEndMobileToggled);
  }, [appSidebarEndMobileToggled]);

  const handleSetAppSidebarEnd = useCallback((value) => {
    setAppSidebarEnd(value);
  }, []);

  const handleSetAppSidebarMobileToggled = useCallback((value) => {
    setAppSidebarMobileToggled(value);
  }, []);

  const contextValue = useMemo(
    () => ({
      appTheme,
      appClass,
      appDarkMode,
      appGradientEnabled,
      appHeaderNone,
      appHeaderFixed,
      appHeaderInverse,
      appHeaderMegaMenu,
      appHeaderLanguageBar,
      hasScroll,
      appSidebarNone,
      appSidebarWide,
      appSidebarLight,
      appSidebarMinify,
      appSidebarMobileToggled,
      appSidebarTransparent,
      appSidebarSearch,
      appSidebarFixed,
      appSidebarGrid,
      appContentNone,
      appContentClass,
      appContentFullHeight,
      appTopMenu,
      appTopMenuMobileToggled,
      appSidebarTwo,
      appSidebarEnd,
      appSidebarEndToggled,
      appSidebarEndMobileToggled,
      handleSetAppTheme,
      handleSetAppClass,
      handleSetAppDarkMode,
      handleSetAppGradientEnabled,
      handleSetAppHeaderNone,
      handleSetAppHeaderFixed,
      handleSetAppHeaderInverse,
      handleSetAppHeaderMegaMenu,
      handleSetAppHeaderLanguageBar,
      handleSetAppSidebarNone,
      handleSetAppSidebarWide,
      handleSetAppSidebarLight,
      handleSetAppSidebarMinified,
      handleSetAppSidebarMobileToggled,
      handleSetAppSidebarTransparent,
      handleSetAppSidebarSearch,
      handleSetAppSidebarFixed,
      handleSetAppSidebarGrid,
      toggleAppSidebarMinify,
      toggleAppSidebarMobile,
      handleSetAppContentNone,
      handleSetAppContentClass,
      handleSetAppContentFullHeight,
      handleSetAppTopMenu,
      toggleAppTopMenuMobile,
      handleSetAppSidebarTwo,
      handleSetAppBoxedLayout,
      toggleAppSidebarEnd,
      toggleAppSidebarEndMobile,
      handleSetAppSidebarEnd,
    }),
    [
      appTheme,
      appClass,
      appDarkMode,
      appGradientEnabled,
      appHeaderNone,
      appHeaderFixed,
      appHeaderInverse,
      appHeaderMegaMenu,
      appHeaderLanguageBar,
      hasScroll,
      appSidebarNone,
      appSidebarWide,
      appSidebarLight,
      appSidebarMinify,
      appSidebarMobileToggled,
      appSidebarTransparent,
      appSidebarSearch,
      appSidebarFixed,
      appSidebarGrid,
      appContentNone,
      appContentClass,
      appContentFullHeight,
      appTopMenu,
      appTopMenuMobileToggled,
      appSidebarTwo,
      appSidebarEnd,
      appSidebarEndToggled,
      appSidebarEndMobileToggled,
      handleSetAppHeaderFixed,
      handleSetAppSidebarFixed,
      handleSetAppTheme,
      handleSetAppClass,
      handleSetAppDarkMode,
      handleSetAppGradientEnabled,
      handleSetAppHeaderNone,
      handleSetAppHeaderInverse,
      handleSetAppHeaderLanguageBar,
      handleSetAppHeaderMegaMenu,
      handleSetAppSidebarNone,
      handleSetAppSidebarWide,
      handleSetAppSidebarLight,
      handleSetAppSidebarMinified,
      handleSetAppSidebarMobileToggled,
      handleSetAppSidebarTransparent,
      handleSetAppSidebarSearch,
      handleSetAppSidebarGrid,
      toggleAppSidebarMinify,
      toggleAppSidebarMobile,
      handleSetAppContentNone,
      handleSetAppContentClass,
      handleSetAppContentFullHeight,
      handleSetAppTopMenu,
      toggleAppTopMenuMobile,
      handleSetAppSidebarTwo,
      handleSetAppBoxedLayout,
      toggleAppSidebarEnd,
      toggleAppSidebarEndMobile,
      handleSetAppSidebarEnd,
    ]
  );

  useEffect(() => {
    handleSetAppTheme(appTheme);
    if (appDarkMode) {
      handleSetAppDarkMode(true);
    }
  }, [appTheme, appDarkMode, handleSetAppTheme, handleSetAppDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScroll(true);
      } else {
        setHasScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppSettings.Provider value={contextValue}>
      <div
        className={`app ${appClass ? `${appClass} ` : ''}${
          appGradientEnabled ? 'app-gradient-enabled ' : ''
        }${appHeaderNone ? 'app-without-header ' : ''}${
          appHeaderFixed && !appHeaderNone ? 'app-header-fixed ' : ''
        }${appSidebarFixed ? 'app-sidebar-fixed ' : ''}${
          appSidebarNone ? 'app-without-sidebar ' : ''
        }${appSidebarEnd ? 'app-with-end-sidebar ' : ''}${
          appSidebarWide ? 'app-with-wide-sidebar ' : ''
        }${appSidebarMinify ? 'app-sidebar-minified ' : ''}${
          appSidebarMobileToggled ? 'app-sidebar-mobile-toggled ' : ''
        }${appTopMenu ? 'app-with-top-menu ' : ''}${
          appContentFullHeight ? 'app-content-full-height ' : ''
        }${appSidebarTwo ? 'app-with-two-sidebar ' : ''}${
          appSidebarEndToggled ? 'app-sidebar-end-toggled ' : ''
        }${
          appSidebarEndMobileToggled ? 'app-sidebar-end-mobile-toggled ' : ''
        }${hasScroll ? 'has-scroll ' : ''}`}
      >
        {!appHeaderNone && <Header />}
        {!appSidebarNone && <Sidebar />}
        {appSidebarTwo && <SidebarRight />}
        {appTopMenu && <TopMenu />}
        {!appContentNone && <Content />}
        {/* <ThemePanel /> */}
      </div>
    </AppSettings.Provider>
  );
};

export default App;
