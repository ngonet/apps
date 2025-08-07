import { useState, useEffect, useRef, useCallback } from 'react';
import { getDailyIndicators } from '@/api/daily-indicator-api.js';
import { DataTableExport } from '@/components/ui/datatable/dt-export.jsx';

export const DailyIndicatorDT = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);

  const loadData = useCallback(async () => {
    try {
      const res = await getDailyIndicators();
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
    { data: 'date', title: 'Fecha' },
    { data: 'uf', title: 'U.F.' },
    { data: 'utm', title: 'U.T.M.' },
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
