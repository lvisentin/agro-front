import { PrimaryButtonProps } from './PrimaryButton.model';

function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <button
      disabled={props.disabled}
      {...props}
      className={`btn btn-primary disabled:border-transparent text-white ${props.className}`}
      type={props.type ? props.type : 'button'}
    >
      {props.children}
    </button>
  );
}

export default PrimaryButton;
