import React from 'react';

const SearchForm = () => {
  return (
    <div className="navbar-form">
      <form action="" method="POST" name="search_form">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Enter keyword" />
          <button type="submit" className="btn btn-search">
            <i className="fa fa-search" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
