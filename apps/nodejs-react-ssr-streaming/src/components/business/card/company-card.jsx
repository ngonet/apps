// External libraries
import { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';

// Components
import { getCompany } from '@/api/company-api';
import { CompanyForm } from '@/components/business/form/company-form';
import { CardItem, CardItemBtn } from '@/components/ui/card/card-item';

// API

// Utils
import { useAppContext } from '@/providers/use-app-context';

export const CompanyCard = () => {
  const [company, setCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { companyId } = useAppContext();

  const loadCompany = useCallback(async () => {
    if (companyId) {
      const response = await getCompany(companyId);
      setCompany(response.data);
    }
  }, [companyId]);

  useEffect(() => {
    loadCompany();
  }, [loadCompany]);

  const getFullAddress = (company) => {
    if (!company) return '';
    const commune = company.commune?.name || '';
    return company.address && commune
      ? `${company.address}, ${commune}`
      : company.address || commune;
  };

  return (
    <div id="company" className="pb-5">
      <h4>Organización</h4>
      <div className="row">
        <Card>
          <Card.Body>
            <CardItemBtn
              label="Nombre"
              value={company ? company.name : 'Nombre de la empresa'}
              defaultValue="Nombre de la empresa"
              setShowModal={setShowModal}
            />
            <CardItem label="RUT" value={company?.rut} defaultValue="RUT de la empresa" />
            <CardItem label="Teléfono" value={company?.phone} defaultValue="+56 9 1234 5678" />
            <CardItem label="Email" value={company?.email} defaultValue="email@empresa.com" />
            <CardItem
              label="Dirección"
              value={getFullAddress(company)}
              defaultValue="Dirección de la empresa"
            />
          </Card.Body>
        </Card>
      </div>
      <CompanyForm
        company={company}
        loadCompany={loadCompany}
        show={showModal}
        setShow={setShowModal}
        title="Editar Información de la Compañía"
      />
    </div>
  );
};
