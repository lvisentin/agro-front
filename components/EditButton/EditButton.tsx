import React from "react";
import { EditButtonProps } from "./EditButton.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

function EditButton(props: EditButtonProps) {
  return (
    <button
      disabled={props.disabled}
      {...props}
      className={`btn bg-green-500 hover:bg-green-700 text-white rounded-md ${props.className}`}
    >
      <FontAwesomeIcon icon={faPencil} />
    </button>
  );
}

export default EditButton;
