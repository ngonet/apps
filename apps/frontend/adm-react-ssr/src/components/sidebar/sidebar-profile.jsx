import React from 'react';
import { Link } from 'react-router-dom';
import { slideToggle } from '../../composables/slideToggle.js';
import { AppSettings } from '../../config/app-settings.js';

const SidebarProfile = () => {
  function handleProfileExpand(e) {
    e.preventDefault();

    const targetSidebar = document.querySelector('.app-sidebar:not(.app-sidebar-end)');
    const targetMenu = e.target.closest('.menu-profile');
    const targetProfile = document.querySelector('#appSidebarProfileMenu');
    const expandTime =
      targetSidebar && targetSidebar.getAttribute('data-disable-slide-animation') ? 0 : 250;

    if (targetProfile) {
      if (targetProfile.style.display === 'block') {
        targetMenu.classList.remove('active');
      } else {
        targetMenu.classList.add('active');
      }
      slideToggle(targetProfile, expandTime);
      targetProfile.classList.toggle('expand');
    }
  }

  return (
    <AppSettings.Consumer>
      {({ appSidebarMinify }) => (
        <div className="menu">
          <div className="menu-profile">
            <Link to="/" onClick={handleProfileExpand} className="menu-profile-link">
              <div className="menu-profile-cover with-shadow" />
              <div className="menu-profile-image">
                <img src="/assets/img/user/user-13.jpg" alt="" />
              </div>
              <div className="menu-profile-info">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">Sean Ngu</div>
                  <div className="menu-caret ms-auto" />
                </div>
                <small>Front end developer</small>
              </div>
            </Link>
          </div>
          <div id="appSidebarProfileMenu" className="collapse">
            <div className="menu-item pt-5px">
              <Link to="/setting" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-cog" />
                </div>
                <div className="menu-text">Settings</div>
              </Link>
            </div>
            <div className="menu-item">
              <Link to="/" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-pencil-alt" />
                </div>
                <div className="menu-text"> Send Feedback</div>
              </Link>
            </div>
            <div className="menu-item pb-5px">
              <Link to="/" className="menu-link">
                <div className="menu-icon">
                  <i className="fa fa-question-circle" />
                </div>
                <div className="menu-text"> Helps</div>
              </Link>
            </div>
            <div className="menu-divider m-0" />
          </div>
        </div>
      )}
    </AppSettings.Consumer>
  );
};

export default SidebarProfile;
