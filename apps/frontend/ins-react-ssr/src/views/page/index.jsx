import { Container } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import ComponentCard from '@/components/cards/ComponentCard';
import { getCompanies } from '@/api/company-api';
import useFetch from '@/hooks/useFetch';

const Page = () => {
  const { data: companies, error, refetch } = useFetch(getCompanies);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container fluid>
      <PageBreadcrumb title="Page" />
      <ComponentCard
        title="Page Test"
        isCloseable
        isCollapsible
        isRefreshable
        onRefresh={refetch}
      >
        {companies.length > 0 ? (
          companies.map((item, index) => (
            <div key={index}>
              <h5>{item.name}</h5>
              <p>{item.rut}</p>
              <p>{item.phone}</p>
              <p>{item.email}</p>
              <p>{item.address}</p>
            </div>
          ))
        ) : (
          <div>No hay compañías para mostrar.</div>
        )}
      </ComponentCard>
    </Container>
  );
};

export default Page;