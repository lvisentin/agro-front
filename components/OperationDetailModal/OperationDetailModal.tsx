import { Operation } from '@/shared/models/operations/Operations.model';
import { useState } from 'react';
import OperationForm from '../OperationForm/OperationForm';

interface OperationDetailModalProps {
  operation?: Operation;
}

function OperationDetailModal({ operation }: OperationDetailModalProps) {
  const [error] = useState<boolean>(false);

  function closeModal() {
    (
      document.getElementById('operation_details_modal') as HTMLFormElement
    ).close();
  }

  return (
    <dialog id="operation_details_modal" className="modal">
      <div className="modal-box w-9/10 max-w-5xl pb-0">
        <h3 className="font-bold text-lg">Detalhes da operação</h3>
        <div className="modal-body">
          {error ? (
            <p className="text-red-500 error mt-4 text-center">
              Algo errado aconteceu, tente novamente
            </p>
          ) : (
            ''
          )}
          <div className="card w-full bg-base-100 shadow-xl rounded-md">
            <div className="card-body pt-2 pb-4 px-0">
              <OperationForm
                operation={operation}
                cancelFunction={closeModal}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default OperationDetailModal;
