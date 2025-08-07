import { BtnCard } from '@/components/ui/button/btn-card';

export const CardItemBtn = ({ label, value, defaultValue, setShowModal }) => {
  return (
    <div className="d-flex align-items-center mb-3">
      <div className="flex-fill">
        <div className="h6 mb-1">{label}</div>
        <div className="text-body text-opacity-50">{value || defaultValue}</div>
      </div>
      <BtnCard onClick={() => setShowModal(true)} label="Editar" />
    </div>
  );
};

export const CardItem = ({ label, value, defaultValue }) => {
  return (
    <div className="d-flex align-items-center mb-3">
      <div className="flex-fill">
        <div className="h6 mb-1">{label}</div>
        <div className="text-body text-opacity-50">{value || defaultValue}</div>
      </div>
    </div>
  );
};
