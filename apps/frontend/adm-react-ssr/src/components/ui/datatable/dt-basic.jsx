import { useEffect, useRef, useCallback } from 'react';
import DT from 'datatables.net-dt';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import 'datatables.net-keytable-dt';
import $ from 'jquery';

export const DataTableBasic = ({ data, columns, tableRef }) => {
  DataTable.use(DT);

  const dataTableInstance = useRef(null);

  const configureDataTable = useCallback(() => {
    const table = $(tableRef.current).DataTable({
      retrieve: true,
      responsive: true,
      keys: { focus: true },
      data: data,
      columns: columns,
    });
    dataTableInstance.current = table;
  }, [data, columns, tableRef]);

  useEffect(() => {
    if (!tableRef.current) return;
    configureDataTable();
  }, [data, configureDataTable, tableRef]);

  return (
    <div>
      <table
        ref={tableRef}
        className="display table table-striped table-bordered align-middle text-nowrap"
        style={{ width: '100%' }}
      >
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody />
      </table>
    </div>
  );
};
