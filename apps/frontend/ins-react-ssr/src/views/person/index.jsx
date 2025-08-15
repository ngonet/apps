import { Container } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import ComponentCard from '@/components/cards/ComponentCard';
import { getPersons } from '@/api/person-api';
import useFetch from '@/hooks/useFetch';

const Person = () => {
  const { data: persons, error, refetch } = useFetch(getPersons);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container fluid>
      <PageBreadcrumb title="Person" />
      <ComponentCard
        title="Person Test"
        isCloseable
        isCollapsible
        isRefreshable
        onRefresh={refetch}
      >
        {persons.length > 0 ? (
          persons.map((item, index) => (
            <div key={index}>
              <h5>{item.rut}</h5>
              <p>{item.firstName}</p>
              <p>{item.firstSurname}</p>
              <p>{item.secondSurname}</p>
              <p>{item.phone}</p>
              <p>{item.cellphone}</p>
              <p>{item.email}</p>
              <p>{item.address}</p>
              <p>{item.communeId}</p>
              <p>{item.birthdate}</p>
              <p>{item.sex}</p>
              <p>{item.nationality}</p>
              <p>{item.active}</p>
              <p>{item.createdAt}</p>
              <p>{item.updatedAt}</p>
            </div>
          ))
        ) : (
          <div>No hay personas para mostrar.</div>
        )}
      </ComponentCard>
    </Container>
  );
};

export default Person;
