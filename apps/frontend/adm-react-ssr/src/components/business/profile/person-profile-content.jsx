/* eslint-disable import/extensions */
import { DTBurden } from '../datatable/burden-dt';
import { DTDocument } from '../datatable/document-dt';
import { TabPanel } from '@/components/ui/profile/tab-panel';

export const PersonProfileContent = ({ person }) => {
  const renderAfpInfo = (afpPerson) => {
    if (!afpPerson) return null;

    if (Array.isArray(afpPerson)) {
      return afpPerson.map((afp) => (
        <div key={afp.id} className="key-value-container">
          <div className="key-value-pair">
            <div className="key">AFP</div>
            <div className="value">{afp.afp?.name}</div>
          </div>
          <div className="key-value-pair">
            <div className="key">R.U.T.</div>
            <div className="value">{afp.afp?.rut}</div>
          </div>
        </div>
      ));
    }

    return (
      <div className="key-value-container">
        <div className="key-value-pair">
          <div className="key">AFP</div>
          <div className="value">{JSON.stringify(afpPerson)}</div>
        </div>
      </div>
    );
  };

  const renderHealthInfo = (healthPerson) => {
    if (!healthPerson) return null;

    if (Array.isArray(healthPerson)) {
      return healthPerson.map((health) => (
        <div key={health.id} className="key-value-container">
          <div className="key-value-pair">
            <div className="key">Salud</div>
            <div className="value">{health.health?.name}</div>
          </div>
          <div className="key-value-pair">
            <div className="key">R.U.T.</div>
            <div className="value">{health.health?.rut}</div>
          </div>
          <div className="key-value-pair">
            <div className="key">Valor Plan</div>
            <div className="value">{health.planValue}</div>
          </div>
          <div className="key-value-pair">
            <div className="key">Última Actualización</div>
            <div className="value">{health.updateAt}</div>
          </div>
        </div>
      ));
    }

    return (
      <div className="key-value-container">
        <div className="key-value-pair">
          <div className="key">Salud</div>
          <div className="value">{JSON.stringify(healthPerson)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="profile-content">
      <div className="tab-content p-0">
        <TabPanel id="profile" active>
          <h5 className="card-title mb-4">Información Personal</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="key-value-container">
                <div className="key-value-pair">
                  <div className="key">Dirección</div>
                  <div className="value">{person.address}</div>
                </div>
                <div className="key-value-pair">
                  <div className="key">Email</div>
                  <div className="value">{person.email}</div>
                </div>
                <div className="key-value-pair">
                  <div className="key">Teléfono</div>
                  <div className="value">{person.phone}</div>
                </div>
                <div className="key-value-pair">
                  <div className="key">Celular</div>
                  <div className="value">{person.cellphone}</div>
                </div>
                <div className="key-value-pair">
                  <div className="key">Fecha de Nacimiento</div>
                  <div className="value">{person.birthdate}</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="key-value-container">
                <div className="key-value-pair">
                  <div className="key">Comuna</div>
                  <div className="value">{person.commune?.name}</div>
                </div>
                <div className="key-value-pair">
                  <div className="key">Sexo</div>
                  <div className="value">{person.sex}</div>
                </div>
                <div className="key-value-pair">
                  <div className="key">Estado Civil</div>
                  <div className="value">{person.civilStatus}</div>
                </div>
                <div className="key-value-pair">
                  <div className="key">Nacionalidad</div>
                  <div className="value">{person.nationality}</div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel id="profile-burden">
          <h5 className="card-title">Cargas Familiares</h5>
          <DTBurden dataTable={person.burden} personId={person.id} />
        </TabPanel>
        <TabPanel id="profile-career">
          <h5 className="card-title mb-4">Carrera Docente</h5>
          {person.career ? (
            <div className="key-value-container">
              <div className="key-value-pair">
                <div className="key">Estado</div>
                <div className="value">{person.career}</div>
              </div>
            </div>
          ) : (
            <div className="key-value-container">
              <div className="key-value-pair">
                <div className="key">Estado</div>
                <div className="value">Información de carrera no disponible</div>
              </div>
            </div>
          )}
        </TabPanel>
        <TabPanel id="profile-afpPerson">
          <h5 className="card-title mb-4">Información AFP</h5>
          {renderAfpInfo(person.afpPerson) || (
            <div className="key-value-container">
              <div className="key-value-pair">
                <div className="key">Estado</div>
                <div className="value">No hay información de AFP registrada</div>
              </div>
            </div>
          )}
        </TabPanel>
        <TabPanel id="profile-healthPerson">
          <h5 className="card-title mb-4">Información de Salud</h5>
          {renderHealthInfo(person.healthPerson) || (
            <div className="key-value-container">
              <div className="key-value-pair">
                <div className="key">Estado</div>
                <div className="value">No hay información de salud registrada</div>
              </div>
            </div>
          )}
        </TabPanel>
        <TabPanel id="profile-document">
          <h5 className="card-title">Documentos</h5>
          <DTDocument personId={person.id} />
        </TabPanel>
        <TabPanel id="profile-remuneration">
          <h5 className="card-title">Remuneraciones</h5>
          <DTDocument personId={person.id} />
        </TabPanel>
      </div>
    </div>
  );
};
