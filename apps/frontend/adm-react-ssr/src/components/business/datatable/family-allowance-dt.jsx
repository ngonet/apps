import { useState, useEffect, useRef, useCallback } from 'react';
import { getFamilyAllowances } from '@/api/family-allowance-api.js';
import { DataTableExport } from '@/components/ui/datatable/dt-export.jsx';

export const FamilyAllowanceDT = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);

  const loadData = useCallback(async () => {
    try {
      const res = await getFamilyAllowances();
      setTableData(res.data);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const columns = [
    { data: 'section', title: 'Sección' },
    { data: 'amount', title: 'Monto' },
    { data: 'rentSince', title: 'Renta desde' },
    { data: 'rentUntil', title: 'Renta hasta' },
    { data: 'dateUntil', title: 'Fecha hasta' },
  ];

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="container mt-4">
      <DataTableExport data={tableData} columns={columns} tableRef={tableRef} />
    </div>
  );
};
