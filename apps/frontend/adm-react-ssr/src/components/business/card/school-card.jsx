// External libraries
import { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';

// Components
import { getSchoolsByCompanyId } from '@/api/school-api';
import { SchoolForm } from '@/components/business/form/school-form';
import { CardItem, CardItemBtn } from '@/components/ui/card/card-item';

// API

// Context
import { useAppContext } from '@/providers/use-app-context';

export const SchoolCard = () => {
  const [schools, setSchools] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { companyId } = useAppContext();

  const loadSchool = useCallback(async () => {
    if (companyId) {
      const response = await getSchoolsByCompanyId(companyId);
      setSchools(response.data);
    }
  }, [companyId]);

  useEffect(() => {
    loadSchool();
  }, [loadSchool]);

  const getFullAddress = (school) => {
    if (!school) return '';
    const commune = school.commune?.name || '';
    return school.address && commune ? `${school.address}, ${commune}` : school.address || commune;
  };

  return (
    <div id="schools" className="pb-5">
      {schools?.map((school) => (
        <div key={school.id}>
          <h4>Colegio</h4>
          <div className="row">
            <Card>
              <Card.Body>
                <CardItemBtn
                  label="Nombre"
                  value={school?.name}
                  defaultValue="Nombre del colegio"
                  setShowModal={setShowModal}
                />
                <CardItem
                  label="RBD"
                  value={school?.rbd}
                  defaultValue="RBD del colegio"
                  action="Acción"
                />
                <CardItem
                  label="Dirección"
                  value={getFullAddress(school)}
                  defaultValue="Dirección del colegio"
                />
                <CardItem label="Teléfono" value={school?.phone} defaultValue="+56 9 1234 5678" />
                <CardItem label="Email" value={school?.email} defaultValue="email@colegio.com" />

                <CardItem
                  label="Tipo de Establecimiento"
                  value={school?.establishmentType}
                  defaultValue="Tipo de establecimiento"
                />
                <CardItem
                  label="Resolución"
                  value={school?.resolution}
                  defaultValue="Número de resolución"
                />
                <CardItem
                  label="Fecha de Resolución"
                  value={school?.dateResolution}
                  defaultValue="Fecha de resolución"
                />
                <CardItem
                  label="Caja de Compensación"
                  value={school?.ccaf?.name}
                  defaultValue="Caja de compensación"
                />
              </Card.Body>
            </Card>
          </div>
          <SchoolForm
            school={school}
            loadSchool={loadSchool}
            show={showModal}
            setShow={setShowModal}
            title="Editar Colegio"
          />
        </div>
      ))}
    </div>
  );
};
