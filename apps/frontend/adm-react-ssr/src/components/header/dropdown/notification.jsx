import React from 'react';

const DropdownNotification = () => {
  return (
    <div className="navbar-item dropdown">
      <a href="#/" data-bs-toggle="dropdown" className="navbar-link dropdown-toggle icon">
        <i className="fa fa-bell" />
        <span className="badge">5</span>
      </a>
      <div className="dropdown-menu media-list dropdown-menu-end">
        <div className="dropdown-header">NOTIFICATIONS (5)</div>
        <a href="#/" className="dropdown-item media">
          <div className="media-left">
            <i className="fa fa-bug media-object bg-gray-500" />
          </div>
          <div className="media-body">
            <h6 className="media-heading">
              Server Error Reports <i className="fa fa-exclamation-circle text-danger" />
            </h6>
            <div className="text-muted fs-10px">3 minutes ago</div>
          </div>
        </a>
        <a href="#/" className="dropdown-item media">
          <div className="media-left">
            <img src="/assets/img/user/user-1.jpg" className="media-object" alt="" />
            <i className="fab fa-facebook-messenger text-blue media-object-icon" />
          </div>
          <div className="media-body">
            <h6 className="media-heading">John Smith</h6>
            <p>Quisque pulvinar tellus sit amet sem scelerisque tincidunt.</p>
            <div className="text-muted fs-10px">25 minutes ago</div>
          </div>
        </a>
        <a href="#/" className="dropdown-item media">
          <div className="media-left">
            <img src="/assets/img/user/user-2.jpg" className="media-object" alt="" />
            <i className="fab fa-facebook-messenger text-blue media-object-icon" />
          </div>
          <div className="media-body">
            <h6 className="media-heading">Olivia</h6>
            <p>Quisque pulvinar tellus sit amet sem scelerisque tincidunt.</p>
            <div className="text-muted fs-10px">35 minutes ago</div>
          </div>
        </a>
        <a href="#/" className="dropdown-item media">
          <div className="media-left">
            <i className="fa fa-plus media-object bg-gray-500" />
          </div>
          <div className="media-body">
            <h6 className="media-heading"> New User Registered</h6>
            <div className="text-muted fs-10px">1 hour ago</div>
          </div>
        </a>
        <a href="#/" className="dropdown-item media">
          <div className="media-left">
            <i className="fa fa-envelope media-object bg-gray-500" />
            <i className="fab fa-google text-warning media-object-icon fs-14px" />
          </div>
          <div className="media-body">
            <h6 className="media-heading"> New Email From John</h6>
            <div className="text-muted fs-10px">2 hour ago</div>
          </div>
        </a>
        <div className="dropdown-footer text-center">
          <a href="#/" className="text-decoration-none">
            View more
          </a>
        </div>
      </div>
    </div>
  );
};

export default DropdownNotification;
