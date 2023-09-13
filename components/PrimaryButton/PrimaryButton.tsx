import { PrimaryButtonProps } from "./PrimaryButton.model";

function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <button
      disabled={props.disabled}
      {...props}
      className={`btn btn-primary disabled:border-transparent text-white ${props.className}`}
    >
      {props.children}
    </button>
  );
}

export default PrimaryButton;
