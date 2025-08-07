import { useEffect, useRef, useCallback } from 'react';
import DT from 'datatables.net-dt';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-keytable-dt';
import 'datatables.net-buttons/js/buttons.html5.min.mjs';
import 'datatables.net-buttons/js/buttons.print.min.mjs';
import $ from 'jquery';
import jszip from 'jszip';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.vfs;

export const DataTableExport = ({ data, columns, tableRef }) => {
  DataTable.use(DT);
  DT.Buttons.jszip(jszip);
  DT.Buttons.pdfMake(pdfMake);

  const dataTableInstance = useRef(null);

  const configureDataTable = useCallback(() => {
    const table = $(tableRef.current).DataTable({
      retrieve: true,
      responsive: true,
      keys: { focus: true },
      select: true,
      data: data,
      columns: columns,
      layout: { topStart: 'buttons' },
      buttons: [
        {
          extend: 'excel',
          className: 'btn btn-success btn-xs',
          text: '<i class="fas fa-file-excel"></i> Excel',
          titleAttr: 'Exportar a Excel',
        },
        {
          extend: 'pdf',
          className: 'btn btn-danger btn-xs',
          text: '<i class="fas fa-file-pdf"></i> PDF',
          titleAttr: 'Exportar a PDF',
        },
        {
          extend: 'print',
          className: 'btn btn-default btn-xs',
          text: '<i class="fas fa-print"></i> Impr.',
          titleAttr: 'Imprimir tabla',
        },
      ],
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
