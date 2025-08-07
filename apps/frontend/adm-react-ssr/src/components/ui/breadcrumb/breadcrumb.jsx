import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <ol className="breadcrumb float-xl-end">
      {items.map((item, index) => (
        <li key={index} className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
        </li>
      ))}
    </ol>
  );
};

export default Breadcrumb;
