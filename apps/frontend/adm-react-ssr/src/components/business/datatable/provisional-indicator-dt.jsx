import { useState, useEffect, useRef, useCallback } from 'react';
import { getProvisionalIndicators } from '@/api/provisional-indicator-api.js';
import { DataTableExport } from '@/components/ui/datatable/dt-export.jsx';

export const ProvisionalIndicatorDT = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);

  const loadData = useCallback(async () => {
    try {
      const res = await getProvisionalIndicators();
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
    { data: 'maxTaxIncomeAFP', title: 'Monto máximo de ingreso AFP' },
    { data: 'maxTaxIncomeINP', title: 'Monto máximo de ingreso INP' },
    { data: 'maxTaxIncomeAFC', title: 'Monto máximo de ingreso AFC' },
    { data: 'minTaxIncomeDepIndep', title: 'Monto mínimo de ingreso dependiente e independiente' },
    { data: 'minTaxIncomeSalaryGrade', title: 'Monto mínimo de ingreso por categoría salarial' },
    { data: 'minTaxIncome1865', title: 'Monto mínimo de ingreso 18/65' },
    { data: 'minTaxIncomeNoRem', title: 'Monto mínimo de ingreso no remunerado' },
    { data: 'minTaxIncomeDomesticWorker', title: 'Monto mínimo de ingreso doméstico' },
    { data: 'teachingCareerACPLow', title: 'teachingCareerACPLow' },
    { data: 'teachingCareerACPHigh', title: 'teachingCareerACPHigh' },
    { data: 'apvTopMonthly', title: 'APV Top Monthly' },
    { data: 'apvTopAnnual', title: 'APV Top Annual' },
    { data: 'depositAgreementTopAnnual', title: 'Deposit Agreement Top Annual' },
    { data: 'depositAgreementPrivateHome', title: 'Deposit Agreement Private Home' },
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
