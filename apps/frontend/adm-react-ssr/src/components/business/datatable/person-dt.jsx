import { useRef, useState, useEffect, useCallback } from 'react';
import { getPersons } from '@/api/person-api.js';
import { PersonForm } from '@/components/business/form/person/person-form';
import { DataTableView } from '@/components/ui/datatable/dt-view.jsx';

export const PersonDT = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: 0, code: '', name: '' });

  const handleAddRow = () => {
    //    setSelectedRow({ id: 0, code: '', name: '' });
    setShowModal(true);
  };

  const loadData = useCallback(async () => {
    try {
      const res = await getPersons();
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns = [
    { data: 'id', title: 'Id', visible: false },
    { data: 'firstName', title: 'Nombres' },
    { data: 'firstSurname', title: 'Apellido Pat.' },
    { data: 'secondSurname', title: 'Apellido Mat.' },
    { data: 'phone', title: 'Teléfono' },
    { data: 'cellphone', title: 'Celular' },
    { data: 'email', title: 'Email' },
    {
      data: 'active',
      title: 'Activo',
      render: function (data, type, row) {
        if (type === 'display') {
          return row.active
            ? '<span class="badge bg-success rounded-pill">Activo</span>'
            : '<span class="badge bg-danger rounded-pill">Inactivo</span>';
        }
        return row.active;
      },
    },
  ];

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="container mt-4">
      <DataTableView
        data={data}
        columns={columns}
        tableRef={tableRef}
        navigateTo="person"
        onAddRow={handleAddRow}
      />
      <PersonForm
        person={selectedRow}
        loadPersons={loadData}
        show={showModal}
        setShow={setShowModal}
        title="Agregar Persona"
      />
    </div>
  );
};
