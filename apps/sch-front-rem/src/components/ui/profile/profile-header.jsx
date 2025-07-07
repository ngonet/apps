import { useState } from 'react';
import { PersonActiveForm } from '@/components/business/form/person/person-active-form';

export const ProfileHeader = ({ image, name, rut, status, tabs, person, loadPersons }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  return (
    <div className="profile-header">
      <div className="profile-header-cover" />
      <div className="profile-header-content">
        <div className="profile-header-img">
          <img src={image} alt="" />
        </div>
        <div className="profile-header-info">
          <h4 className="mt-0 mb-1">{name}</h4>
          <p className="mb-2">{rut}</p>
          <span className={`btn btn-xs btn-${status ? 'green' : 'red'}`}>
            {status ? 'Activo' : 'Inactivo'}
          </span>
          <button type="button" className="btn btn-xs btn-primary ms-2" onClick={handleEditClick}>
            <i className="fas fa-pen" />
          </button>
        </div>
      </div>
      <ul className="profile-header-tab nav nav-tabs">
        {tabs.map((tab, index) => (
          <li key={tab.id} className="nav-item">
            <a
              href={`#${tab.id}`}
              className={`nav-link ${index === 0 ? 'active' : ''}`}
              data-bs-toggle="tab"
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>

      <PersonActiveForm
        person={person}
        loadPersons={loadPersons}
        show={showModal}
        setShow={setShowModal}
        title="Editar Persona"
      />
    </div>
  );
};
