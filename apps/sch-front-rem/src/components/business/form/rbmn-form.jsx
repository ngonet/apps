/* eslint-disable import/extensions */
// External libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// API
import { patchRbmn, createRbmn } from '@/api/rbmn-api.js';
// Components
import { InputForm } from '@/components/ui/form/input-form';
import { SelectForm } from '@/components/ui/form/select-form';
// Schemas
import { rbmnSchema } from '@/schemas/rbmn';

export const RbmnForm = ({ rbmn, loadRbmns, show, setShow, title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(rbmnSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (rbmn.id) {
      await patchRbmn(rbmn.id, data);
    } else {
      await createRbmn(data);
    }
    setShow(false);
    loadRbmns();
  });

  useEffect(() => {
    if (rbmn) {
      reset(rbmn);
    }
  }, [rbmn, reset]);

  const years = Array.from({ length: 10 }, (_, i) => ({
    id: new Date().getFullYear() - i,
    name: new Date().getFullYear() - i,
  }));

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectForm
            options={years}
            label="Año"
            name="year"
            register={register}
            error={errors.year}
            valueAsNumber
          />
          <InputForm label="Básica" name="preschool" register={register} error={errors.preschool} />
          <InputForm
            label="Media"
            name="highschool"
            register={register}
            error={errors.highschool}
          />
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
