// External libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Components
import { getCommunes } from '@/api/commune-api.js';
import { patchPerson, createPerson } from '@/api/person-api.js';
import { InputForm } from '@/components/ui/form/input-form';
import { SelectForm } from '@/components/ui/form/select-form';

// API

// Schemas
import { personSchema } from '@/schemas/person';

// Utils
import { nationality, sex, civilStatus } from '@/utils/options-select';

export const PersonForm = ({ person, loadPersons, show, setShow, title }) => {
  const navigate = useNavigate();
  const [communes, setCommunes] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(personSchema),
    //    resolver: async (data, context, options) => {
    //      // you can debug your validation schema here
    //      console.log('formData', data);
    //      console.log('validation result', await zodResolver(personSchema)(data, context, options));
    //      return zodResolver(personSchema)(data, context, options);
    //    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (person.id) {
        await patchPerson(person.id, data);
        setShow(false);
        loadPersons();
      } else {
        const response = await createPerson(data);
        setShow(false);
        loadPersons();
        console.log('Response: ', response);
        navigate(`/person/${response.id}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  useEffect(() => {
    if (person) {
      reset(person);
    }
  }, [person, reset]);

  useEffect(() => {
    const loadCommunes = async () => {
      const response = await getCommunes();
      setCommunes(response.data);
    };
    loadCommunes();
  }, []);

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
          <InputForm label="Dirección" name="address" register={register} error={errors.address} />
          <SelectForm
            label="Comuna"
            name="communeId"
            register={register}
            error={errors.communeId}
            options={communes}
            valueAsNumber
          />
          <InputForm label="Teléfono" name="phone" register={register} error={errors.phone} />
          <InputForm
            label="Celular"
            name="cellphone"
            register={register}
            error={errors.cellphone}
          />
          <InputForm
            label="Email"
            name="email"
            register={register}
            error={errors.email}
            type="email"
          />
          <InputForm
            type="date"
            label="Fecha de nacimiento (MM/DD/YYYY)"
            name="birthdate"
            register={register}
            error={errors.birthdate}
          />
          <SelectForm
            label="Nacionalidad"
            name="nationality"
            register={register}
            error={errors.nationality}
            options={nationality}
          />
          <SelectForm
            label="Sexo"
            name="sex"
            register={register}
            error={errors.sex}
            options={sex}
          />
          <SelectForm
            label="Estado civil"
            name="civilStatus"
            register={register}
            error={errors.civilStatus}
            options={civilStatus}
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
