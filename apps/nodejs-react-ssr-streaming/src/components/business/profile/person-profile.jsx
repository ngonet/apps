/* eslint-disable import/extensions */
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PersonProfileContent } from './person-profile-content';
import { getPerson } from '@/api/person-api';
import { ProfileHeader } from '@/components/ui/profile/profile-header';
import { AppSettings } from '@/config/app-settings';

const PROFILE_TABS = [
  { id: 'profile', label: 'DATOS PERSONALES' },
  { id: 'profile-burden', label: 'CARGAS' },
  { id: 'profile-career', label: 'CARRERA DOCENTE' },
  { id: 'profile-afpPerson', label: 'AFP' },
  { id: 'profile-healthPerson', label: 'SALUD' },
  { id: 'profile-document', label: 'DOCUMENTOS' },
  { id: 'profile-remuneration', label: 'REMUNERACIONES' },
];

export const PersonProfile = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const context = useContext(AppSettings);

  useEffect(() => {
    const loadPerson = async () => {
      try {
        const response = await getPerson(id);
        setPerson(response.data);
      } catch (error) {
        console.error('Error loading person:', error);
      } finally {
        setLoading(false);
      }
    };

    context.handleSetAppContentClass('p-0');
    loadPerson();
    return () => {
      context.handleSetAppContentClass('');
    };
  }, [context, id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const name = `${person.firstName} ${person.firstSurname} ${person.secondSurname}`;
  const { rut } = person;
  const status = person.active;
  const image = person.sex === 'M' ? '/images/male-profile.png' : '/images/female-profile.png';

  return (
    <div>
      <div className="profile">
        <ProfileHeader
          image={image}
          name={name}
          rut={rut}
          status={status}
          tabs={PROFILE_TABS}
          person={person}
        />
        <PersonProfileContent person={person} />
      </div>
    </div>
  );
};
