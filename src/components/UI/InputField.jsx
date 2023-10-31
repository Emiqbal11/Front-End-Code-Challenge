import { MdErrorOutline } from "react-icons/md";

const InputField = ({
  label,
  name,
  type,
  placeholder = "",
  icon: Icon,
  defaultValue,
  autoComplete = "on",
  keyHint = "next",
  disabled,
  register,
  errors,
  validationSchema,
  onChange = () => {},
  isOptional,
  min,
  max,
  errMsg = undefined,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="font-weight-bold">
        <span className="text-dark">{label}</span>
        {isOptional ? "" : <span className="text-danger"> *</span>}
      </label>
      <div className="position-relative">
        {Icon && (
          <span className="position-absolute left-0 top-50 translate-middle-y">
            <Icon className="w-4 h-4 text-muted" />
          </span>
        )}
        <input
          type={type}
          name={name}
          id={name}
          min={min}
          max={max}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name, {
            ...validationSchema,
          })}
          onChange={onChange}
          className={`form-control ${
            errors[name]?.message ? "is-invalid" : ""
          } ${disabled ? "bg-light" : ""}`}
        />
      </div>
      {errors && errMsg && (
        <p className="mt-1 d-flex align-items-center text-danger" role="alert">
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errMsg}</span>
        </p>
      )}
      {errors && errors[name]?.type === "required" && (
        <p className="mt-1 d-flex align-items-center text-danger" role="alert">
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errors[name]?.message}</span>
        </p>
      )}
      {errors && errors[name]?.type === "pattern" && (
        <p className="mt-1 d-flex align-items-center text-danger" role="alert">
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errors[name]?.message}</span>
        </p>
      )}
      {errors && errors[name]?.type === "minLength" && (
        <p className="mt-1 text-danger" role="alert">
          {errors[name]?.message}
        </p>
      )}
      {errors && errors[name]?.type === "maxLength" && (
        <p className="mt-1 d-flex align-items-center text-danger" role="alert">
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errors[name]?.message}</span>
        </p>
      )}
    </div>
  );
};
export default InputField;
