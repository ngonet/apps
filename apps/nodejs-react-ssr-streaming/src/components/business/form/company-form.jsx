// External libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// API
import { getCommunes } from '@/api/commune-api';
import { patchCompany } from '@/api/company-api';
// Components
import { InputForm } from '@/components/ui/form/input-form';
import { SelectForm } from '@/components/ui/form/select-form';
// Schemas
import { companySchema } from '@/schemas/company';

export const CompanyForm = ({ company, loadCompany, show, setShow, title }) => {
  const [communes, setCommunes] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: company,
  });

  const onSubmit = handleSubmit(async (data) => {
    await patchCompany(company.id, data);
    setShow(false);
    loadCompany();
  });

  useEffect(() => {
    const loadCommunes = async () => {
      const response = await getCommunes();
      setCommunes(response.data);
    };
    loadCommunes();
  }, []);

  useEffect(() => {
    if (company && show) {
      reset({
        name: company.name,
        rut: company.rut,
        email: company.email,
        phone: company.phone,
        address: company.address,
        communeId: company.communeId,
      });
    }
  }, [company, show, reset]);

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <InputForm
              type="text"
              name="name"
              label="Nombre"
              register={register}
              error={errors.name}
            />
            <InputForm type="text" name="rut" label="RUT" register={register} error={errors.rut} />
            <InputForm
              type="email"
              name="email"
              label="Email"
              register={register}
              error={errors.email}
            />
            <InputForm
              type="tel"
              name="phone"
              label="Teléfono"
              register={register}
              error={errors.phone}
            />
            <InputForm
              type="text"
              name="address"
              label="Dirección"
              register={register}
              error={errors.address}
            />
            <SelectForm
              options={communes}
              name="communeId"
              label="Comuna"
              register={register}
              error={errors.communeId}
              valueAsNumber
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-theme">
            Guardar
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
