import { useRef, useState, useEffect, useCallback } from 'react';
import { getDocuments, getDocumentsByPersonId } from '@/api/document-api.js';
import { DataTableView } from '@/components/ui/datatable/dt-view.jsx';
// import { formatDate } from '@/lib/format-date.js';

export const DTDocument = ({ personId }) => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const loadData = useCallback(async () => {
    try {
      if (personId) {
        const res = await getDocumentsByPersonId(personId);
        setData(res.data);
      } else {
        const res = await getDocuments();
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [personId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns = [
    { data: 'id', title: 'Id', visible: false },
    { data: 'person.rut', title: 'R.U.T. Funcionario' },
    {
      data: 'status',
      title: 'Estado',
      render: (data, type, row) => {
        return data ? 'Activo' : 'Cerrado';
      },
    },
    { data: 'documentType.name', title: 'Tipo de documento' },
    {
      data: 'date',
      title: 'Fecha',
      render: (data) => data,
    },
  ];

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="container mt-4">
      <DataTableView data={data} columns={columns} tableRef={tableRef} navigateTo="document" />
    </div>
  );
};
