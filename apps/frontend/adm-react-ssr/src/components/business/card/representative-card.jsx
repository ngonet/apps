// External libraries
import { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';

// Components
import { getRepresentative } from '@/api/representative-api';
import { RepresentativeForm } from '@/components/business/form/representative-form';
import { CardItem, CardItemBtn } from '@/components/ui/card/card-item';

// API

// Utils
import { useAppContext } from '@/providers/use-app-context';

export const RepresentativeCard = () => {
  const [representative, setRepresentative] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { companyId } = useAppContext();

  const loadRepresentative = useCallback(async () => {
    if (companyId) {
      const response = await getRepresentative(companyId);
      setRepresentative(response.data);
    }
  }, [companyId]);

  useEffect(() => {
    loadRepresentative();
  }, [loadRepresentative]);

  return (
    <div id="representative" className="pb-5">
      <h4>Representante Legal</h4>
      <div className="row">
        <Card>
          <Card.Body>
            <CardItemBtn
              label="Nombre"
              value={
                representative
                  ? `${representative.firstName} ${representative.firstSurname} ${representative.secondSurname}`
                  : 'Nombre del representante'
              }
              defaultValue="Nombre del representante"
              setShowModal={setShowModal}
            />
            <CardItem
              label="RUT"
              value={representative?.rut}
              defaultValue="RUT del representante"
            />
            <CardItem
              label="Teléfono"
              value={representative?.phone}
              defaultValue="+56 51 1234 5678"
            />
            <CardItem
              label="Celular"
              value={representative?.cellphone}
              defaultValue="+56 9 1234 5678"
            />
            <CardItem
              label="Email"
              value={representative?.email}
              defaultValue="email@representante.com"
            />
          </Card.Body>
        </Card>
      </div>
      <RepresentativeForm
        representative={representative}
        loadRepresentative={loadRepresentative}
        show={showModal}
        setShow={setShowModal}
        title="Editar Representante Legal"
      />
    </div>
  );
};
