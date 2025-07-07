import { RbmnDT } from '@/components/business/datatable/rbmn-dt';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import PageHeader from '@/components/ui/header/page-header';
import { Panel, PanelHeader, PanelBody } from '@/components/ui/panel/panel';

const CareerPage = () => {
  const breadcrumbItems = [{ label: 'Inicio', to: '/' }, { label: 'Carrera Docente' }];
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <PageHeader
        title="Carrera Docente"
        subtitle="Administración de información base de la carrera docente"
      />
      <hr className="mb-4" />
      <div className="row mb-3">
        <div className="col-xl-6 ui-sortable">
          <Panel>
            <PanelHeader>RBNM</PanelHeader>
            <PanelBody>
              <RbmnDT />
            </PanelBody>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
