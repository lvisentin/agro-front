import { useState } from 'react';
import OperationForm from '../OperationForm/OperarionForm';

function OperarionFormModal() {
  const [error] = useState<boolean>(false);

  function goToEdit() {
    console.log('goToEdit');
  }

  function closeModal() {
    (
      document.getElementById('operation_details_modal') as HTMLFormElement
    ).close();
  }

  return (
    <dialog id="operation_details_modal" className="modal">
      <div className="modal-box w-9/10 max-w-5xl">
        <h3 className="font-bold text-lg">Detalhes da operação</h3>
        <div className='modal-body'>
          {error ? (
            <p className="text-red-500 error mt-4 text-center">
              Algo errado aconteceu, tente novamente
            </p>
          ) : (
            ''
          )}
          <OperationForm
            submitFunction={goToEdit}
            cancelFunction={closeModal}
            disabled={true}
            confirmBtn='Editar'
          />
        </div>
      </div>
    </dialog>
  );}

export default OperarionFormModal;
