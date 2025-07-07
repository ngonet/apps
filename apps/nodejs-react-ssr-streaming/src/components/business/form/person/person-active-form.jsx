// External libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

// Components
import { patchPerson } from '@/api/person-api.js';
import { CheckboxForm } from '@/components/ui/form/checkbox-form';
import { InputForm } from '@/components/ui/form/input-form';

// API

// Schemas
import { personActiveSchema } from '@/schemas/person';

export const PersonActiveForm = ({ person, loadPersons, show, setShow, title }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(personActiveSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await patchPerson(person.id, data);
      setShow(false);
      loadPersons();
    } catch (error) {
      console.error('Error:', error);
    }
  });

  useEffect(() => {
    if (person) {
      reset(person);
    }
  }, [person, reset]);

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputForm label="RUT" name="rut" register={register} error={errors.rut} />
          <InputForm
            label="Nombres"
            name="firstName"
            register={register}
            error={errors.firstName}
          />
          <InputForm
            label="Apellido paterno"
            name="firstSurname"
            register={register}
            error={errors.firstSurname}
          />
          <InputForm
            label="Apellido materno"
            name="secondSurname"
            register={register}
            error={errors.secondSurname}
          />
          <CheckboxForm label="Activo" name="active" register={register} error={errors.active} />
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
