import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DetailsButtonProps } from './DetailsButton.model';

function DetailsButton(props: DetailsButtonProps) {
  return (
    <button
      disabled={props.disabled}
      {...props}
      className={`btn bg-blue-500 hover:bg-blue-700 text-white rounded-md ${props.className}`}
    >
      <FontAwesomeIcon icon={faEye} />
    </button>
  );
}

export default DetailsButton;
