import { useState, createContext, Children, cloneElement } from 'react';
import { slideToggle } from '@/composables/slideToggle.js';

const PanelStat = createContext();

const Panel = (props) => {
  const [expand, setExpand] = useState(false);
  const [reload, setReload] = useState(false);
  const [remove, setRemove] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const toggleRemove = () => {
    setRemove(!remove);
  };

  const toggleCollapse = (e) => {
    slideToggle(e.target.closest('.panel').querySelector('.panel-body'));
  };

  const toggleReload = () => {
    if (!reload) {
      setReload(true);

      setTimeout(() => {
        setReload(false);
      }, 2000);
    }
  };

  const panelState = {
    expand,
    reload,
    remove,
    toggleExpand,
    toggleReload,
    toggleRemove,
    toggleCollapse,
  };

  return (
    <PanelStat.Provider value={panelState}>
      {!remove && (
        <div
          className={`panel panel-${props.theme ? props.theme : 'inverse'} ${expand ? 'panel-expand' : ''} ${reload ? 'panel-loading' : ''} ${props.className ? props.className : ''}`}
        >
          {Children.map(props.children, (child) =>
            cloneElement(child, { key: reload ? Date.now() : child.key })
          )}
        </div>
      )}
    </PanelStat.Provider>
  );
};

const PanelHeader = (props) => {
  return (
    <div className={`panel-heading ${props.className}`}>
      <h4 className="panel-title">{props.children}</h4>
      {!props.noButton && (
        <PanelStat.Consumer>
          {({ toggleExpand, toggleRemove, toggleCollapse, toggleReload }) => (
            <div className="panel-heading-btn">
              <button className="btn btn-xs btn-icon btn-circle btn-default" onClick={toggleExpand}>
                <i className="fa fa-expand" />
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-xs btn-icon btn-circle btn-success" onClick={toggleReload}>
                <i className="fa fa-redo" />
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-xs btn-icon btn-circle btn-warning"
                onClick={toggleCollapse}
              >
                <i className="fa fa-minus" />
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-xs btn-icon btn-circle btn-danger" onClick={toggleRemove}>
                <i className="fa fa-times" />
              </button>
            </div>
          )}
        </PanelStat.Consumer>
      )}
    </div>
  );
};

const PanelBody = (props) => {
  return (
    <PanelStat.Consumer>
      {({ reload }) => (
        <div className={`panel-body ${props.className}`}>
          {props.children}

          {reload && (
            <div className="panel-loader">
              <span className="spinner spinner-sm" />
            </div>
          )}
        </div>
      )}
    </PanelStat.Consumer>
  );
};

const PanelFooter = (props) => {
  return <div className={`panel-footer ${props.className}`}>{props.children}</div>;
};

export { Panel, PanelHeader, PanelBody, PanelFooter };
