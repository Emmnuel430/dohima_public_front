// components/FloatingInputField.js
export default function FloatingInputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  max,
  min,
  required = false,
  disabled = false,
  className = "",
}) {
  return (
    <div className={`relative z-0 w-full group pb-3 ${className}`}>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        max={max}
        min={min}
        required={required}
        disabled={disabled}
        className={`
          peer block w-full appearance-none border border-gray-300
          rounded-md px-2.5 pt-2 pb-2 text-primary font-semibold
          bg-[#F5F9FC] focus:bg-[#F5F9FC] focus:outline-none focus:ring-2 focus:ring-yellowCustom transition
        `}
      />
      <label
        htmlFor={name}
        className={`
          absolute text-primary duration-300 transform
          scale-[0.85] -translate-y-7 top-1 z-10 origin-[0]
          left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0.5
          peer-focus:scale-[1] peer-focus:-translate-y-7 peer-focus:text-yellowCustom
        `}
      >
        {label} {required === true ? "*" : ""}
      </label>
    </div>
  );
}
