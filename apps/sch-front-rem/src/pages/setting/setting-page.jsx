import { useEffect } from 'react';
import { CompanyCard } from '@/components/business/card/company-card';
import { RepresentativeCard } from '@/components/business/card/representative-card';
import { SchoolCard } from '@/components/business/card/school-card';
import Breadcrumb from '@/components/ui/breadcrumb/breadcrumb';
import PageHeader from '@/components/ui/header/page-header';

const SettingPage = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('#bsSpyContent > div');
    const navLinks = document.querySelectorAll('#bsSpyTarget > a');

    function activateNavLink(id) {
      navLinks.forEach((link) => {
        if (link && link.classList) {
          link.classList.remove('active');
        }
      });
      const target = document.querySelector(`nav a[href*='${id}']`);
      if (target) {
        target.classList.add('active');
      }
    }

    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
    }

    function handleViewport() {
      let activeSection = null;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (isElementInViewport(sections[i])) {
          activeSection = sections[i].getAttribute('id');
          activateNavLink(activeSection);
          break;
        }
      }

      let combinedHeight = 0;
      const sectionIndex = Array.from(sections).findIndex(
        (section) => section.getAttribute('id') === activeSection
      );
      for (let i = sectionIndex; i < sections.length; i++) {
        combinedHeight += sections[i].offsetHeight;
      }
      if (combinedHeight <= window.innerHeight) {
        activateNavLink(activeSection);
      }
    }
    window.onscroll = handleViewport;
  }, []);

  const breadcrumbItems = [{ label: 'Inicio', to: '/' }, { label: 'Configuración' }];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <PageHeader title="Configuración" subtitle="Información y opciones del sistema" />
      <hr className="mb-4" />
      <div className="row">
        <div style={{ width: '230px' }}>
          <nav className="navbar navbar-sticky d-none d-xl-block my-n4 py-4 h-100 text-end">
            <nav className="nav" id="bsSpyTarget">
              <a className="nav-link active" href="#company" data-toggle="scroll-to">
                Organización
              </a>
              <a className="nav-link" href="#representative" data-toggle="scroll-to">
                Representante
              </a>
              <a className="nav-link" href="#schools" data-toggle="scroll-to">
                Colegio
              </a>
            </nav>
          </nav>
        </div>
        <div className="col-xl-8" id="bsSpyContent">
          <CompanyCard />
          <RepresentativeCard />
          <SchoolCard />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
