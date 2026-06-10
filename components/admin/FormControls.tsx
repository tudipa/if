type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
};

export function FormInput({ label, name, defaultValue, required, type = "text" }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <input
        className="h-11 rounded-md border border-slate-200 px-3 text-sm font-normal outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
        defaultValue={defaultValue}
        name={name}
        required={required}
        type={type}
      />
    </label>
  );
}

export function FormDateInput(props: Omit<FieldProps, "type">) {
  return <FormInput {...props} type="date" />;
}

export function FormTextarea({ label, name, defaultValue, required }: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <textarea
        className="min-h-28 rounded-md border border-slate-200 px-3 py-3 text-sm font-normal outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
        defaultValue={defaultValue}
        name={name}
        required={required}
      />
    </label>
  );
}

export function FormSelect({
  label,
  name,
  defaultValue,
  options
}: FieldProps & { options: { label: string; value: string }[] }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <select
        className="h-11 rounded-md border border-slate-200 px-3 text-sm font-normal outline-none focus:border-ocean focus:ring-2 focus:ring-blue-100"
        defaultValue={defaultValue}
        name={name}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FormCheckbox({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 text-sm font-bold text-ink">
      <input className="h-4 w-4 accent-ocean" defaultChecked={defaultChecked} name={name} type="checkbox" />
      {label}
    </label>
  );
}
