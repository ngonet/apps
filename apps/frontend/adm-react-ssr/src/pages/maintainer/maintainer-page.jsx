import { PositionDT } from '@/components/business/datatable/position-dt';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import PageHeader from '@/components/ui/header/page-header';
import { Panel, PanelHeader, PanelBody } from '@/components/ui/panel/panel';

const MaintainerPage = () => {
  const breadcrumbItems = [{ label: 'Inicio', to: '/' }, { label: 'Mantenedor' }];
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <PageHeader title="Mantenedor" subtitle="Administración de información base del sistema" />
      <hr className="mb-4" />
      <div className="row mb-3">
        <div className="col-xl-6 ui-sortable">
          <Panel>
            <PanelHeader>Cargos</PanelHeader>
            <PanelBody>
              <PositionDT />
            </PanelBody>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default MaintainerPage;
