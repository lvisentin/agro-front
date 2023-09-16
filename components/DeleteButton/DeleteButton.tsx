import React from 'react';
import { DeleteButtonProps } from './DeleteButton.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

function DeleteButton(props: DeleteButtonProps) {
  return (
    <button
      disabled={props.disabled}
      {...props}
      className={`${props.className} btn bg-red-500 hover:bg-red-700 text-white rounded-md`}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

export default DeleteButton;
