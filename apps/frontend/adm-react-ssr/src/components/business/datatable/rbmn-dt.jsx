import $ from 'jquery';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getRbmns, deleteRbmn } from '@/api/rbmn-api.js';
import { RbmnForm } from '@/components/business/form/rbmn-form.jsx';
import { ConfirmationModal } from '@/components/ui/confirmation/confirmation-modal.jsx';
import { DataTableMaintainer } from '@/components/ui/datatable/dt-maintainer.jsx';
import { showInfoNotification } from '@/composables/notification.js';

export const RbmnDT = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const tableRef = useRef(null);

  const loadRbmns = useCallback(async () => {
    try {
      const res = await getRbmns();
      setTableData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRbmns();
  }, [loadRbmns]);

  // Función para actualizar
  const updateTableData = (updatedRow) => {
    setTableData((prevData) =>
      prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
  };

  // Agregar una nueva fila a la tabla
  const addNewRow = (newRow) => {
    setTableData((prevData) => [...prevData, newRow]);
  };

  // Abrir el modal para agregar o editar
  const handleAddRow = () => {
    setSelectedRow({ id: 0, code: '', name: '' });
    setShowModal(true);
  };

  // Editar una fila seleccionada
  const handleEditRow = () => {
    const table = $(tableRef.current).DataTable();
    const selectedRows = table.rows({ selected: true }).data();

    if (selectedRows.length > 0) {
      const selectedData = selectedRows[0];
      setSelectedRow({
        id: selectedData.id || 0,
        year: selectedData.year || '',
        preschool: selectedData.preschool || '',
        highschool: selectedData.highschool || '',
      });
      setShowModal(true);
    } else {
      showInfoNotification('Selecciona una fila primero.');
    }
  };

  // Eliminar una fila seleccionada
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

  // Confirmar la eliminación
  const handleConfirmation = async (confirmed) => {
    if (confirmed && rowToDelete) {
      try {
        // 1. Eliminar el registro de la API
        const response = await deleteRbmn(rowToDelete.id);
        console.log('Delete response:', response);
        if (response.status === 200 || response.status === 204) {
          // 2. Actualizar el estado `tableData`
          setTableData((prevData) => prevData.filter((row) => row.id !== rowToDelete.id));
        }
      } catch (error) {
        console.error('Error al eliminar el registro:', error);
        alert('No se pudo eliminar el registro. Inténtalo de nuevo.');
      } finally {
        setShowConfirmationModal(false); // Cerrar el modal
        setRowToDelete(null); // Limpiar la fila a eliminar
      }
    }
  };

  const columns = [
    { data: 'id', title: 'Id', visible: false },
    { data: 'year', title: 'Año' },
    { data: 'preschool', title: 'Básica' },
    { data: 'highschool', title: 'Media' },
  ];

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="container mt-4">
      <DataTableMaintainer
        data={tableData}
        columns={columns}
        onEditRow={handleEditRow}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        tableRef={tableRef}
      />
      <RbmnForm
        rbmn={selectedRow}
        loadRbmns={loadRbmns}
        show={showModal}
        setShow={setShowModal}
        title={selectedRow?.id ? 'Editar' : 'Agregar'}
      />
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
