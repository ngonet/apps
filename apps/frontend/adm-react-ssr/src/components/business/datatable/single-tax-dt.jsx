import { useState, useEffect, useRef, useCallback } from 'react';
import { getSingleTax } from '@/api/single-tax-api.js';
import { DataTableExport } from '@/components/ui/datatable/dt-export.jsx';

export const SingleTaxDT = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);

  const loadData = useCallback(async () => {
    try {
      const res = await getSingleTax();
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
    { data: 'rentSince', title: 'Renta desde' },
    { data: 'rentUntil', title: 'Renta hasta' },
    { data: 'factor', title: 'Factor' },
    { data: 'discount', title: 'Descuento' },
    { data: 'rate', title: 'Tasa' },
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
