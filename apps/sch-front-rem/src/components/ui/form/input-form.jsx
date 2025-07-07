import InputMask from '@mona-health/react-input-mask';

const getMask = (name) => {
  const lowercaseName = name.toLowerCase();
  if (lowercaseName.includes('rut')) return '99.999.999-*';
  if (lowercaseName.includes('cellphone')) return '+56 9 9999 9999';
  if (lowercaseName.includes('phone')) return '+56 9 9999 9999';
  return null;
};

export const InputForm = ({ name, label, type, register, error }) => {
  const mask = getMask(name);
  const InputComponent = mask ? InputMask : 'input';

  return (
    <div className="mb-3">
      <div className="form-floating">
        <InputComponent
          id={name}
          type={type}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder={label}
          mask={mask}
          {...register(name, {
            setValueAs: (v) => (v === '' ? undefined : v),
          })}
        />
        <label htmlFor={name} className="d-flex align-items-center text-secondary fs-14px">
          {label}
        </label>
        {error && <div className="invalid-feedback fs-13px">{error.message}</div>}
      </div>
    </div>
  );
};
