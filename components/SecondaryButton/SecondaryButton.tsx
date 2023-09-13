import { SecondaryButtonProps } from "./SecondaryButton.model";

function SecondaryButton(props: SecondaryButtonProps) {
  return (
    <button
      disabled={props.disabled}
      {...props}
      className={`btn bg-red-500 hover:bg-red-700 disabled:border-transparent text-white ${props.className}`}
    >
      {props.children}
    </button>
  );
}

export default SecondaryButton;
