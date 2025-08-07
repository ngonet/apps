import { DailyIndicatorDT } from '@/components/business/datatable/daily-indicator-dt';
import { FamilyAllowanceDT } from '@/components/business/datatable/family-allowance-dt';
import { ProvisionalIndicatorDT } from '@/components/business/datatable/provisional-indicator-dt';
import { SingleTaxDT } from '@/components/business/datatable/single-tax-dt';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import PageHeader from '@/components/ui/header/page-header';
import { Panel, PanelHeader, PanelBody } from '@/components/ui/panel/panel';

const IndicatorPage = () => {
  const breadcrumbItems = [{ label: 'Inicio', to: '/' }, { label: 'Indicadores' }];
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <PageHeader title="Indicadores" subtitle="Indicadores económicos" />
      <hr className="mb-4" />
      <div className="row mb-3">
        <div className="col-xl-6 ui-sortable">
          <Panel>
            <PanelHeader>Indicadores Diarios</PanelHeader>
            <PanelBody>
              <DailyIndicatorDT />
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader>Asignación Familiar</PanelHeader>
            <PanelBody>
              <FamilyAllowanceDT />
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-6 ui-sortable">
          <Panel>
            <PanelHeader>Impuesto Unico</PanelHeader>
            <PanelBody>
              <SingleTaxDT />
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader>Indicadores Provisionales</PanelHeader>
            <PanelBody>
              <ProvisionalIndicatorDT />
            </PanelBody>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default IndicatorPage;
