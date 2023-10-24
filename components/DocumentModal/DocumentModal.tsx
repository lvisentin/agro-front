import convertDateToGMT3 from '@/shared/utils/convertDateToGMT3';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { DocumentModalProps } from './DocumentModal.model';
import styles from './DocumentModal.module.scss';

function DocumentModal({ document }: DocumentModalProps) {
  function downloadURI(uri: string, name: string) {
    var link = window.document.createElement('a');
    link.download = name;
    link.href = uri;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  }

  return (
    <dialog id="document_details_modal" className="modal">
      {document && (
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Documento: <span className="font-medium">{document?.name}</span>
          </h3>
          <p className="font-bold">Cadastrado em: <span className="font-medium">{document?.createdAt ? convertDateToGMT3(document.createdAt) : 'N/A'}</span></p>
          
          <div className="modal-body">
            <Image
              src={document?.path}
              alt={document?.name}
              className={`${styles.documentImg} mb-2 mt-4 rounded-md`}
              width={150}
              height={150}
            />
          </div>

          <div className="flex items-center justify-center mt-4">
            <div className={`modal-action ${styles.action} mr-4`}>
              <form method="dialog">
                <button className="btn">Fechar</button>
              </form>
            </div>

            <PrimaryButton
              onClick={() => downloadURI(document?.path, document?.name)}
            >
              <FontAwesomeIcon icon={faDownload} />
              Fazer download
            </PrimaryButton>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default DocumentModal;
