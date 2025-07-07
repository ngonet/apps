export const CheckboxForm = ({ name, label, register, error }) => {
  return (
    <div className="mb-3">
      <div className="form-check form-switch">
        <input
          type="checkbox"
          id={name}
          className={`form-check-input ${error ? 'is-invalid' : ''}`}
          {...register(name)}
        />
        <label htmlFor={name} className="form-check-label text-secondary fs-14px">
          {label}
        </label>
        {error && <div className="invalid-feedback fs-13px">{error.message}</div>}
      </div>
    </div>
  );
};
