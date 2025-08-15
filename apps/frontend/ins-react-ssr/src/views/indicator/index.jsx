import { Container, Col, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import ComponentCard from '@/components/cards/ComponentCard';
import CustomApexChart from '@/components/CustomApexChart';
import { getDailyIndicators } from '@/api/daily-indicator-api';
import useFetch from '@/hooks/useFetch';

const Indicator = () => {
  const { data: indicators, error, refetch } = useFetch(getDailyIndicators);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container fluid>
      <PageBreadcrumb title="Indicator" />
      <ComponentCard
        title="Indicator Test"
        isCloseable
        isCollapsible
        isRefreshable
        onRefresh={refetch}
      >
        <Row>
          <Col xs={6}>
            <CustomApexChart
              type="line"
              height={350}
              series={[
                {
                  name: 'UF',
                  data: indicators.map((item) => item.uf)
                }
              ]}
            />
          </Col>
          <Col xs={6}>
            <CustomApexChart
              type="line"
              height={350}
              series={[
                {
                  name: 'UTM',
                  data: indicators.map((item) => item.utm)
                }
              ]}
            />
          </Col>
        </Row>
        {indicators.length > 0 ? (
          indicators.map((item, index) => (
            <Col key={index} xs={6}>
              <h5>{item.date}</h5>
              <p>{item.uf}</p>
              <p>{item.utm}</p>
            </Col>
          ))
        ) : (
          <div>No hay indicadores para mostrar.</div>
        )}
      </ComponentCard>
    </Container>
  );
};

export default Indicator;
