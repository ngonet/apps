export const TabPanel = ({ id, active, children }) => {
  return (
    <div className={`tab-pane fade ${active ? 'show active' : ''}`} id={id}>
      <div className="card">
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};
