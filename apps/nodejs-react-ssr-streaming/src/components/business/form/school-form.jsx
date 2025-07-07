// External libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// API
import { getCcafs } from '@/api/ccaf-api';
import { getCommunes } from '@/api/commune-api';
import { patchSchool } from '@/api/school-api';
// Components
import { InputForm } from '@/components/ui/form/input-form';
import { SelectForm } from '@/components/ui/form/select-form';
// Schemas
import { schoolSchema } from '@/schemas/school';
// Utils
import { formatDateForInput } from '@/utils/format-date';
import { establishmentTypes } from '@/utils/options-select';

export const SchoolForm = ({ school, loadSchool, show, setShow, title }) => {
  const [communes, setCommunes] = useState([]);
  const [ccafs, setCcafs] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      ...school,
      dateResolution: formatDateForInput(school?.dateResolution),
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await patchSchool(school.id, data);
    setShow(false);
    loadSchool();
  });

  useEffect(() => {
    const loadOptions = async () => {
      const [communesResponse, ccafsResponse] = await Promise.all([getCommunes(), getCcafs()]);
      setCommunes(communesResponse.data);
      setCcafs(ccafsResponse.data);
    };
    loadOptions();
  }, []);

  useEffect(() => {
    if (school) {
      setValue('name', school.name);
      setValue('address', school.address);
      setValue('communeId', school.communeId);
      setValue('phone', school.phone);
      setValue('email', school.email);
      setValue('establishmentType', school.establishmentType);
      setValue('rbd', school.rbd);
      setValue('resolution', school.resolution);
      setValue('dateResolution', formatDateForInput(school.dateResolution));
      setValue('ccafId', school.ccafId);
    }
  }, [school, setValue]);

  useEffect(() => {
    if (school && show) {
      reset({
        ...school,
        dateResolution: formatDateForInput(school.dateResolution),
      });
    }
  }, [school, show, reset]);

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
            <InputForm
              type="text"
              name="address"
              label="Dirección"
              register={register}
              error={errors.address}
            />
            <SelectForm
              name="communeId"
              label="Comuna"
              options={communes}
              register={register}
              error={errors.communeId}
              valueAsNumber
            />
            <InputForm
              type="tel"
              name="phone"
              label="Teléfono"
              register={register}
              error={errors.phone}
            />
            <InputForm
              type="email"
              name="email"
              label="Email"
              register={register}
              error={errors.email}
            />
            <SelectForm
              name="establishmentType"
              label="Tipo de Establecimiento"
              options={establishmentTypes}
              register={register}
              error={errors.establishmentType}
              valueAsNumber={false}
            />
            <InputForm name="rbd" label="RBD" register={register} error={errors.rbd} />
            <InputForm
              name="resolution"
              label="Resolución"
              type="number"
              register={register}
              error={errors.resolution}
            />
            <InputForm
              name="dateResolution"
              label="Fecha de resolución (MM/DD/YYYY)"
              type="date"
              register={register}
              error={errors.dateResolution}
            />
            <SelectForm
              name="ccafId"
              label="Caja de compensación"
              options={ccafs}
              register={register}
              error={errors.ccafId}
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
