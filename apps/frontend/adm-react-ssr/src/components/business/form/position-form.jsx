// External libraries
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

// Components
import { patchPosition, getPositionsParent, createPosition } from '@/api/position-api.js';
import { InputForm } from '@/components/ui/form/input-form';
import { SelectForm } from '@/components/ui/form/select-form';

// API

// Schemas
import { positionSchema } from '@/schemas/position';

export const PositionForm = ({ position, loadPositions, show, setShow, title }) => {
  const [parent, setParent] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(positionSchema),
    //    resolver: async (data, context, options) => {
    //      // you can debug your validation schema here
    //      console.log('formData', data);
    //      console.log('validation result', await zodResolver(positionSchema)(data, context, options));
    //      return zodResolver(positionSchema)(data, context, options);
    //    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (position.id) {
      const parentCode = parent.find((p) => p.id === data.parentId)?.code;
      const code = data.code.split('-');
      if (code.length > 1) {
        data.code = `${parentCode ? `${parentCode}-` : ''}${code[1].toUpperCase().replace(/\s/g, '')}`;
      } else {
        data.code = `${parentCode ? `${parentCode}-` : ''}${data.code.toUpperCase().replace(/\s/g, '')}`;
      }
      await patchPosition(position.id, data);
    } else {
      const parentCode = parent.find((p) => p.id === data.parentId)?.code;
      data.code = `${parentCode ? `${parentCode}-` : ''}${data.code.toUpperCase().replace(/\s/g, '')}`;
      await createPosition(data);
    }
    setShow(false);
    loadPositions();
  });

  useEffect(() => {
    const loadParent = async () => {
      const response = await getPositionsParent();
      setParent(response.data);
    };
    loadParent();
  }, []);

  useEffect(() => {
    if (position) {
      reset(position);
    }
  }, [position, reset]);

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectForm
            options={parent}
            name="parentId"
            label="Cargo padre"
            register={register}
            error={errors.parentId}
            valueAsNumber
          />
          <InputForm label="Código" name="code" register={register} error={errors.code} />
          <InputForm label="Nombre" name="name" register={register} error={errors.name} />
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
