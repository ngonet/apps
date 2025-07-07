const PageHeader = ({ title, subtitle }) => {
  return (
    <h1 className="page-header">
      {title} <small>{subtitle}</small>
    </h1>
  );
};

export default PageHeader;
