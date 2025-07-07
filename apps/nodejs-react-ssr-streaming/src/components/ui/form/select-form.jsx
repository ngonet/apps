export const SelectForm = ({ name, label, options, register, error, valueAsNumber = false }) => {
  return (
    <div className="mb-3">
      <div className="form-floating">
        <select
          id={name}
          className={`form-select ${error ? 'is-invalid' : ''}`}
          {...register(name, {
            setValueAs: (v) => {
              if (v === '') return undefined;
              return valueAsNumber ? Number(v) : v;
            },
          })}
        >
          <option value="">Seleccione una opción</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <label htmlFor={name} className="d-flex align-items-center text-secondary fs-14px">
          {label}
        </label>
        {error && <div className="invalid-feedback fs-13px">{error.message}</div>}
      </div>
    </div>
  );
};
