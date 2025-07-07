import $ from 'jquery';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { deleteBurden } from '@/api/burden-api.js';
import BurdenForm from '@/components/business/form/burden-form.jsx';
import { ConfirmationModal } from '@/components/ui/confirmation/confirmation-modal.jsx';
import { DataTableMaintainer } from '@/components/ui/datatable/dt-maintainer.jsx';
// import { FormModal } from '../modal/form-modal.jsx';
// import DataError from '../notification/data-error.jsx';
import { showInfoNotification } from '@/composables/notification.js';
// import { formatDate } from '@/lib/format-date.js';

export const DTBurden = ({ dataTable, personId }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const tableRef = useRef(null);
  const [data, setData] = useState([]);

  const loadData = useCallback(async () => {
    try {
      setData(dataTable);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [dataTable]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns = [
    { data: 'id', title: 'Id', visible: false },
    { data: 'personId', title: 'PersonId', visible: false },
    { data: 'rut', title: 'R.U.T.' },
    { data: 'firstName', title: 'Nombres' },
    { data: 'firstSurname', title: 'Apellido Pat.' },
    { data: 'secondSurname', title: 'Apellido Mat.' },
    { data: 'birthdate', title: 'Fecha de nacimiento', render: (data) => data },
    { data: 'nationality', title: 'Nacionalidad' },
    { data: 'sex', title: 'Sexo' },
  ];

  // Función para actualizar
  const updateTableData = (updatedRow) => {
    setData((prevData) => prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
  };

  // Agregar una nueva fila a la tabla
  const addNewRow = (newRow) => {
    setData((prevData) => [...prevData, newRow]);
  };

  // Abrir el modal para agregar o editar
  const handleAddRow = () => {
    setSelectedRow({
      id: '',
      personId: personId, // Incluir el personId al crear
      rut: '',
      firstName: '',
      firstSurname: '',
      secondSurname: '',
      birthdate: '',
      nationality: '',
      sex: '',
    });
    setShowModal(true);
  };

  // Editar una fila seleccionada
  const handleEditRow = () => {
    const table = $(tableRef.current).DataTable();
    const selectedRows = table.rows({ selected: true }).data();

    if (selectedRows.length > 0) {
      const selectedData = selectedRows[0];
      setSelectedRow({
        id: selectedData.id || '',
        personId: selectedData.personId || '',
        rut: selectedData.rut || '',
        firstName: selectedData.firstName || '',
        firstSurname: selectedData.firstSurname || '',
        secondSurname: selectedData.secondSurname || '',
        birthdate: selectedData.birthdate || '',
        nationality: selectedData.nationality || '',
        sex: selectedData.sex || '',
      });
      setShowModal(true);
    } else {
      showInfoNotification('Selecciona una fila primero.');
    }
  };

  const handleDeleteRow = () => {
    const table = $(tableRef.current).DataTable();
    const selectedRows = table.rows({ selected: true }).data();

    if (selectedRows.length > 0) {
      const selectedData = selectedRows[0];
      setRowToDelete(selectedData); // Guarda la fila a eliminar
      setShowConfirmationModal(true); // Muestra el modal de confirmación
    } else {
      showInfoNotification('Selecciona una fila primero.');
    }
  };

  const handleConfirmation = async (confirmed) => {
    if (confirmed && rowToDelete) {
      try {
        // 1. Eliminar el registro de la API
        const response = await deleteBurden(rowToDelete.id);
        console.log('Delete response:', response);
        if (response.status === 200 || response.status === 204) {
          // 2. Actualizar el estado `tableData`
          setData((prevData) => prevData.filter((row) => row.id !== rowToDelete.id));
        }
      } catch (error) {
        console.error('Error al eliminar el registro:', error);
        alert('No se pudo eliminar el registro. Inténtalo de nuevo.');
      } finally {
        setShowConfirmationModal(false);
        setRowToDelete(null);
      }
    }
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="container mt-4">
      <DataTableMaintainer
        data={data}
        columns={columns}
        onEditRow={handleEditRow}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        tableRef={tableRef}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <BurdenForm
          setShow={setShowModal}
          rowData={selectedRow}
          updateTableData={selectedRow?.id ? updateTableData : addNewRow}
        />
      </Modal>
      {showConfirmationModal && (
        <ConfirmationModal
          show={showConfirmationModal}
          setShow={setShowConfirmationModal}
          title="Confirmar"
          onConfirm={handleConfirmation}
        />
      )}
    </div>
  );
};
