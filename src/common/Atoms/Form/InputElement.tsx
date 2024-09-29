import clsx from "clsx";
import { inputStyle } from "../atomStyle";
import {
  CheckboxCheckedIcon,
  CheckobUncheckedIcon,
  RadioCheckedIcon,
  RadioUncheckedIcon,
} from "../Image/Icon";

type TInputElementProps = React.ComponentProps<"input">;
function InputElement({ className, ...restProps }: TInputElementProps) {
  return <input className={clsx(inputStyle, className)} {...restProps} />;
}

export function Text(props: TInputElementProps) {
  return (
    <>
      <InputElement type="text" {...props} />
    </>
  );
}

export function Number(props: TInputElementProps) {
  return (
    <>
      <InputElement type="number" {...props} />
    </>
  );
}

export function Email(props: TInputElementProps) {
  return (
    <>
      <InputElement type="email" {...props} />
    </>
  );
}

export function Password(props: TInputElementProps) {
  return (
    <>
      <InputElement type="password" {...props} />
    </>
  );
}

export function Textarea(props: React.ComponentProps<"textarea">) {
  const { className, ...restProps } = props;
  return (
    <>
      <textarea
        className={clsx(
          "min-h-[60px] w-full resize-none h-fit",
          inputStyle,
          className
        )}
        {...restProps}
      />
    </>
  );
}

export function Checkbox({
  className,
  checked,
  onChange,
  ...restProps
}: Omit<TInputElementProps, "hidden"> & {
  checked?: boolean;
  onChange?: () => void;
}) {
  return (
    <div className={className}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...restProps}
        className="[&+.icon>.unchecked]:block [&:checked+.icon>.unchecked]:hidden [&+.icon>.checked]:hidden [&:checked+.icon>.checked]:block hidden"
      />
      <div className="icon cursor-pointer" onClick={onChange}>
        <span className={`checked ${checked ? "block" : "hidden"}`}>
          <CheckboxCheckedIcon />
        </span>
        <span className={`unchecked ${checked ? "hidden" : "block"}`}>
          <CheckobUncheckedIcon />
        </span>
      </div>
    </div>
  );
}

export function Radio({
  className,
  ...restProps
}: Omit<TInputElementProps, "hidden">) {
  return (
    <div className={className}>
      <input
        type="radio"
        hidden
        {...restProps}
        className="[&+.icon>.unchecked]:block [&:checked+.icon>.unchecked]:hidden [&+.icon>.checked]:hidden [&:checked+.icon>.checked]:block"
      />
      <div className="icon">
        <span className="checked">
          <RadioCheckedIcon />
        </span>
        <span className="unchecked">
          <RadioUncheckedIcon />
        </span>
      </div>
    </div>
  );
}

/**
 * @props type {
 *  input-origin: [text, number, password, email, textarea, checkbox, radio],
 *  from libs: [select, date-range]
 * }
 */
