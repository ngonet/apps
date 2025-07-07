import React from 'react';

const DropdownLanguage = () => {
  return (
    <div className="navbar-item dropdown">
      <a href="#/" className="navbar-link dropdown-toggle" data-bs-toggle="dropdown">
        <span className="fi fi-us" title="us" />
        <span className="d-none d-sm-inline ms-1">EN</span> <b className="caret" />
      </a>
      <div className="dropdown-menu dropdown-menu-end">
        <a href="#/" className="dropdown-item">
          <span className="fi fi-us me-2" title="us" /> English
        </a>
        <a href="#/" className="dropdown-item">
          <span className="fi fi-cn me-2" title="cn" /> Chinese
        </a>
        <a href="#/" className="dropdown-item">
          <span className="fi fi-jp me-2" title="jp" /> Japanese
        </a>
        <a href="#/" className="dropdown-item">
          <span className="fi fi-be me-2" title="be" /> Belgium
        </a>
        <div className="dropdown-divider" />
        <a href="#/" className="dropdown-item text-center">
          more options
        </a>
      </div>
    </div>
  );
};

export default DropdownLanguage;
