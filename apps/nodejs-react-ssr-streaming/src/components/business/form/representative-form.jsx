// External libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// API
import { patchRepresentative } from '@/api/representative-api';
// Components
import { InputForm } from '@/components/ui/form/input-form';
// Schemas
import { representativeSchema } from '@/schemas/representative';

export const RepresentativeForm = ({
  representative,
  loadRepresentative,
  show,
  setShow,
  title,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(representativeSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await patchRepresentative(representative.id, data);
    setShow(false);
    loadRepresentative();
  });

  useEffect(() => {
    if (representative && show) {
      reset({
        firstName: representative.firstName,
        firstSurname: representative.firstSurname,
        secondSurname: representative.secondSurname,
        rut: representative.rut,
        phone: representative.phone,
        cellphone: representative.cellphone,
        email: representative.email,
      });
    }
  }, [representative, show, reset]);

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
              name="firstName"
              label="Nombres"
              register={register}
              error={errors.firstName}
            />
            <InputForm
              type="text"
              name="firstSurname"
              label="Apellido Paterno"
              register={register}
              error={errors.firstSurname}
            />
            <InputForm
              type="text"
              name="secondSurname"
              label="Apellido Materno"
              register={register}
              error={errors.secondSurname}
            />
            <InputForm name="rut" label="RUT" register={register} error={errors.rut} />
            <InputForm
              type="tel"
              name="phone"
              label="Teléfono"
              register={register}
              error={errors.phone}
            />
            <InputForm
              type="tel"
              name="cellphone"
              label="Celular"
              register={register}
              error={errors.cellphone}
            />
            <InputForm
              type="email"
              name="email"
              label="Email"
              register={register}
              error={errors.email}
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
