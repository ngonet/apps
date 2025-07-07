import { PersonDT } from '@/components/business/datatable/person-dt';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import PageHeader from '@/components/ui/header/page-header';
import { Panel, PanelHeader, PanelBody } from '@/components/ui/panel/panel';

const breadcrumbItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Funcionarios', to: '/person' },
];

const PersonPage = () => {
  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      <PageHeader title="Funcionarios" subtitle="Tabla de funcionarios" />
      <hr className="mb-4" />
      <Panel>
        <PanelHeader>Funcionarios</PanelHeader>
        <PanelBody>
          <PersonDT />
        </PanelBody>
      </Panel>
    </div>
  );
};

export default PersonPage;
