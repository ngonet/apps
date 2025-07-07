// External libraries
import { useState, useEffect } from 'react';
// API
import { patchBurden, createBurden } from '@/api/burden-api';
// Components
import { InputForm } from '@/components/ui/form/input-form';
// Schemas
import { burdenSchema } from '@/schemas/burden';

export default function BurdenForm({ rowData, setShow, updateTableData }) {
  const [formData, setFormData] = useState({
    id: '',
    rut: '',
    firstName: '',
    firstSurname: '',
    secondSurname: '',
    birthdate: '',
    nationality: '',
    sex: '',
  });

  // Cargar datos de la fila seleccionada al abrir el modal
  useEffect(() => {
    if (rowData) {
      // Ensure the date is in yyyy-mm-dd format for the HTML date input
      const date = rowData.birthdate ? new Date(rowData.birthdate) : null;
      const formattedData = {
        ...rowData,
        birthdate: date ? date.toISOString().split('T')[0] : '',
      };
      setFormData(formattedData);
    }
  }, [rowData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.id === '') {
      // Crear un nuevo registro
      const newBurden = await createBurden(formData);
      updateTableData(newBurden); // Agregar el nuevo registro a la tabla
    } else {
      // Editar un registro existente
      const editBurden = await patchBurden(formData.id, formData);
      updateTableData(editBurden); // Actualizar el registro en la tabla
    }
    setShow(false); // Cerrar el modal
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">R.U.T.</label>
        <input
          type="text"
          className="form-control"
          name="rut"
          value={formData.rut}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Apellido Paterno</label>
        <input
          type="text"
          className="form-control"
          name="firstSurname"
          value={formData.firstSurname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Apellido Materno</label>
        <input
          type="text"
          className="form-control"
          name="secondSurname"
          value={formData.secondSurname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha Nacimiento</label>
        <input
          type="date"
          className="form-control"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nacionalidad</label>
        <select
          className="form-control"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          <option value="chilena">Chilena</option>
          <option value="extranjero">Extranjero</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Sexo</label>
        <select
          className="form-control"
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </div>

      {/* <ButtonModalForm setShow={setShow} /> */}
    </form>
  );
}
